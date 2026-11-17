"use client";

import { MotionConfig, motion } from "motion/react";
import { EASE } from "@/components/motion";

// Wraps every page: a short fade and rise each time a route is opened.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    // reducedMotion="user": visitors who ask their device for less motion get
    // fades without movement.
    <MotionConfig reducedMotion="user">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: EASE }}>
        {children}
      </motion.div>
    </MotionConfig>
  );
}
