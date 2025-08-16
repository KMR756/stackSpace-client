import React from "react";
import { motion } from "framer-motion";
import { Users, Target, Award } from "lucide-react"; // beautiful icons

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="relative bg-[#c63c51] text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h1
            className="text-4xl lg:text-6xl font-extrabold mb-6"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            About <span className="text-Primary">Stack Space</span>
          </motion.h1>
          <p className="max-w-2xl mx-auto text-lg lg:text-xl opacity-90">
            We are a community-driven platform where developers connect, share
            knowledge, and grow together.
          </p>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Mission</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            At <strong>Stack Space</strong>, our mission is to create a hub for
            developers worldwide — a place to collaborate, exchange ideas, and
            stay inspired. We believe in open knowledge, creativity, and
            building a supportive tech community.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Whether you’re a beginner learning your first lines of code or a
            seasoned engineer sharing advanced insights, Stack Space is built
            for you.
          </p>
        </motion.div>

        <motion.img
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80"
          alt="Team collaboration"
          className="rounded-2xl shadow-lg"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        />
      </section>

      {/* Values / Highlights */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12 text-gray-900">
            What We Stand For
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl shadow hover:shadow-lg transition">
              <Users className="w-12 h-12 mx-auto text-cyan-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Community First</h3>
              <p className="text-gray-600">
                Our strength is our people. We foster a culture of respect,
                collaboration, and inclusivity.
              </p>
            </div>
            <div className="p-6 rounded-2xl shadow hover:shadow-lg transition">
              <Target className="w-12 h-12 mx-auto text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Knowledge Sharing</h3>
              <p className="text-gray-600">
                We empower developers by making knowledge accessible, open, and
                engaging.
              </p>
            </div>
            <div className="p-6 rounded-2xl shadow hover:shadow-lg transition">
              <Award className="w-12 h-12 mx-auto text-yellow-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Excellence</h3>
              <p className="text-gray-600">
                From discussions to projects, we aim for quality, innovation,
                and impact in everything we do.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
