import { motion, Transition } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface VerticalCutRevealProps {
  children: string;
  splitBy?: "words" | "chars";
  staggerDuration?: number;
  staggerFrom?: "first" | "last" | "center";
  reverse?: boolean;
  containerClassName?: string;
  transition?: Transition;
}

export function VerticalCutReveal({
  children,
  splitBy = "words",
  staggerDuration = 0.1,
  staggerFrom = "first",
  reverse = false,
  containerClassName,
  transition = {
    type: "spring",
    stiffness: 250,
    damping: 40,
  },
}: VerticalCutRevealProps) {
  const elements = splitBy === "words" ? children.split(" ") : children.split("");
  
  const getDelay = (index: number) => {
    if (staggerFrom === "first") return index * staggerDuration;
    if (staggerFrom === "last") return (elements.length - 1 - index) * staggerDuration;
    return Math.abs(Math.floor(elements.length / 2) - index) * staggerDuration;
  };

  const variants = {
    hidden: {
      y: reverse ? -20 : 20,
      opacity: 0,
      filter: "blur(4px)",
    },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        ...transition,
        delay: getDelay(i),
      },
    }),
  };

  return (
    <span className={cn("inline-flex flex-wrap", containerClassName)}>
      {elements.map((element, index) => (
        <motion.span
          key={index}
          custom={index}
          initial="hidden"
          animate="visible"
          variants={variants}
          className="inline-block"
          style={{ marginRight: splitBy === "words" ? "0.25em" : "0" }}
        >
          {element}
        </motion.span>
      ))}
    </span>
  );
}
