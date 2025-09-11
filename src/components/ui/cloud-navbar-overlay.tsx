"use client";
import React from "react";
import { motion } from "framer-motion";

interface CloudNavbarOverlayProps {
  isVisible: boolean;
}

const CloudNavbarOverlay: React.FC<CloudNavbarOverlayProps> = ({ isVisible }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full h-22 absolute top-0 left-0 right-0 z-40"
    >
      {/* Simple Static Greenish Fade */}
      <div className="w-full h-full bg-gradient-to-b from-emerald-700/85 to-transparent" />
    </motion.div>
  );
};

export default CloudNavbarOverlay;
