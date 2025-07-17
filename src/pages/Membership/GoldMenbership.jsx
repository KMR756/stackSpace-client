import { FaCrown, FaCheckCircle } from "react-icons/fa";

const GoldMembership = () => {
  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-gradient-to-br from-yellow-100 to-yellow-50 border border-yellow-300 rounded-2xl shadow-lg">
      <div className="flex items-center gap-4 mb-6">
        <FaCrown className="text-yellow-500 text-4xl" />
        <h2 className="text-3xl font-bold text-yellow-700">Gold Membership</h2>
      </div>

      <p className="text-lg text-gray-700 mb-6">
        Upgrade to{" "}
        <span className="font-semibold text-yellow-700">Gold Member</span> for
        just
        <span className="text-yellow-800 font-bold"> $100 </span> and enjoy
        exclusive community benefits.
      </p>

      <ul className="space-y-4 mb-8">
        <li className="flex items-center text-gray-800">
          <FaCheckCircle className="text-green-500 mr-3" />
          <strong> Post up to 5 item sat once </strong>
        </li>
        <li className="flex items-center text-gray-800">
          <FaCheckCircle className="text-green-500 mr-3" />
          <strong> Get extra priority on featured posts</strong>
        </li>
        <li className="flex items-center text-gray-800">
          <FaCheckCircle className="text-green-500 mr-3" />
          <strong> Earn a Gold Badge on your profile</strong>
        </li>
      </ul>
    </div>
  );
};

export default GoldMembership;
