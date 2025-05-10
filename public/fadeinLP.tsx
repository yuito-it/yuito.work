"use client";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import localFont from "next/font/local";

const AinslieSans = localFont({
  src: "@/fonts/AinslieSans-NorThiIt.otf",
});

export default function LPMotionWrapper({ children }: { children: React.ReactNode }) {
  const [showBody, setShowBody] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBody(true);
    }, 1000); // 1秒後にbodyを表示
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {!showBody ? (
        <motion.div
          key="text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="flex flex-row items-center justify-center h-screen">
            {"yuitopia".split("").map((char, index) => (
              <motion.h1
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`text-6xl sm:text-8xl text-center text-foreground ${AinslieSans.className}`}
              >
                {char}
              </motion.h1>
            ))}
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
