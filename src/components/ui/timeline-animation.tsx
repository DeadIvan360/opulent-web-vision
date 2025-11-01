import { motion, Variants } from "framer-motion";
import { useInView } from "framer-motion";
import { ReactNode, RefObject } from "react";

interface TimelineContentProps {
  children: ReactNode;
  animationNum: number;
  timelineRef: RefObject<HTMLElement>;
  customVariants?: Variants;
  className?: string;
  as?: "div" | "p" | "article" | "section";
}

export function TimelineContent({
  children,
  animationNum,
  timelineRef,
  customVariants,
  className = "",
  as = "div",
}: TimelineContentProps) {
  const isInView = useInView(timelineRef, { once: true, margin: "-100px" });

  const defaultVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(10px)",
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  const variants = customVariants || defaultVariants;

  const MotionComponent = {
    div: motion.div,
    p: motion.p,
    article: motion.article,
    section: motion.section,
  }[as];

  return (
    <MotionComponent
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={animationNum}
      variants={variants}
      className={className}
    >
      {children}
    </MotionComponent>
  );
}
