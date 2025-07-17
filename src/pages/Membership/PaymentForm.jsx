import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../shared/Loading/Loading";
import GoldMembership from "./GoldMenbership";
import Swal from "sweetalert2";
import { useNavigate } from "react-router"; // for redirection
import GoldMemberCard from "./GoldMemberCard";

const PaymentForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const amount = 100 * 100; // Stripe amount in cents

  // ✅ Fetch user data using React Query
  const { isPending, data: userData = {} } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isPending || !stripe || !elements) {
    return <Loading />;
  }
  console.log(userData);

  // ✅ Stripe payment handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsProcessing(true);

    const card = elements.getElement(CardElement);
    if (!card) return;

    try {
      // 1. Create payment intent
      const { data } = await axiosSecure.post("/create-payment-intent", {
        amount,
        userEmail: user.email,
      });

      const clientSecret = data.clientSecret;

      // 2. Confirm payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: user.displayName || "Anonymous",
            email: user.email,
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        const transactionId = result.paymentIntent.id;

        // 3. Upgrade user to gold
        await axiosSecure.patch(`/users/upgrade/${user.email}`, {
          membership: "gold",
        });

        // 4. Save payment
        await axiosSecure.post("/payments", {
          email: user.email,
          amount,
          paymentMethod: "card",
          transactionId,
        });

        // 5. SweetAlert + Redirect
        Swal.fire({
          title: "Gold Membership Activated!",
          html: `<p>Your payment was successful.</p><p><strong>Transaction ID:</strong><br>${transactionId}</p>`,
          icon: "success",
          confirmButtonText: "Go to Add Post",
        }).then(() => {
          navigate("/dashboard/add-post");
        });
      }
    } catch (err) {
      console.error("Payment error:", err);
      setError("An unexpected error occurred.");
    } finally {
      setIsProcessing(false);
    }
  };
  if (userData.membership === true) {
    return <GoldMemberCard />;
  }
  return (
    <div>
      {/* User Card */}
      <div className="w-full lg:w-2/3 flex justify-center items-center flex-col border-transparent p-10 rounded-3xl bg-amber-100 mx-auto">
        <img
          className="w-20 h-20 object-cover rounded-full"
          src={user.photoURL}
          alt={user.displayName}
        />
        <h1 className="font-bold mt-3 text-xl">{user.displayName}</h1>
        <h1 className="mt-2 text-gray-700">{user.email}</h1>
        <p className="bg-blue-500 text-white font-semibold px-3 py-1 rounded-2xl mt-2">
          {userData?.membership ? "Gold Member" : "Bronze Member"}
        </p>
      </div>

      {/* Payment Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-6 my-10 bg-white p-6 rounded-xl shadow-md w-full lg:w-2/3 mx-auto"
      >
        <GoldMembership />

        <div className="flex justify-center">
          <CardElement className="p-2 border w-full max-w-md rounded" />
        </div>

        <button
          className="btn bg-yellow-500 hover:bg-yellow-600 w-full text-white font-bold py-2 px-4 rounded-xl transition duration-300"
          type="submit"
          disabled={!stripe || isProcessing}
        >
          {isProcessing ? "Processing..." : "Become a Gold Member ($100)"}
        </button>

        {error && <p className="text-red-500 text-center">{error}</p>}
      </form>
    </div>
  );
};

export default PaymentForm;
