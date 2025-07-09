import React from "react";
import { FaCuttlefish, FaJava, FaJsSquare, FaReact } from "react-icons/fa";
import { SiCplusplus } from "react-icons/si";
import { motion } from "framer-motion";

const FloatingIcons = () => {
  const icons = [
    // React
    {
      id: 1,
      icon: <FaReact className="text-blue-400" />,
      top: "10%",
      left: "15%",
    },
    {
      id: 2,
      icon: <FaReact className="text-blue-400" />,
      top: "30%",
      left: "25%",
    },

    // Java
    {
      id: 3,
      icon: <FaJava className="text-red-600" />,
      top: "20%",
      left: "70%",
    },
    {
      id: 4,
      icon: <FaJava className="text-red-600" />,
      top: "55%",
      left: "65%",
    },

    // JavaScript
    // {
    //   id: 5,
    //   icon: <FaJsSquare className="text-yellow-400" />,
    //   top: "60%",
    //   left: "30%",
    // },
    {
      id: 6,
      icon: <FaJsSquare className="text-yellow-400" />,
      top: "75%",
      left: "20%",
    },

    // C
    {
      id: 7,
      icon: <FaCuttlefish className="text-gray-300" />,
      top: "75%",
      left: "55%",
    },
    {
      id: 8,
      icon: <FaCuttlefish className="text-gray-300" />,
      top: "50%",
      left: "10%",
    },

    // C++
    {
      id: 9,
      icon: <SiCplusplus className="text-blue-600" />,
      top: "35%",
      left: "80%",
    },
    // {
    //   id: 10,
    //   icon: <SiCplusplus className="text-blue-600" />,
    //   top: "15%",
    //   left: "90%",
    // },
  ];

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      {icons.map(({ id, icon, top, left }) => (
        <motion.div
          key={id}
          className="absolute text-4xl md:text-5xl lg:text-6xl "
          style={{ top, left }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 2, -2, 0], // Horizontal float (±2px)
            y: [0, -2, 2, 0], // Vertical float (±2px)
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        >
          {icon}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingIcons;
