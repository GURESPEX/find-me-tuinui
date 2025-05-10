import { DOMAttributes, memo, useState } from "react";
import { motion } from "motion/react";
import { useGame } from "../stores/score";
import { transition } from "../utils/motion";

type TuinuiProps = {
  isTuinui?: boolean;
};

const Tuinui = memo(({ isTuinui = false }: TuinuiProps) => {
  const { click } = useGame();

  const [hovered, setHovered] = useState<boolean>(false);
  const [clicked, setClicked] = useState<boolean>(false);

  const handleClick: DOMAttributes<HTMLDivElement>["onClick"] = () => {
    if (!clicked) click(isTuinui);
    setClicked(true);
  };

  return (
    <motion.div
      onClick={handleClick}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      initial={{
        left: "50%",
      }}
      animate={{
        left:
          clicked && !isTuinui ? ["55%", "45%", "55%", "45%", "50%"] : "50%",
      }}
      transition={{
        ease: [0, 0, 0, 0],
        duration: 0.25,
      }}
      className="absolute -translate-1/2 top-1/2 left-1/2 hover:cursor-pointer"
    >
      <motion.div
        initial={{
          top: 0,
        }}
        animate={{
          top: (!clicked && hovered) || (clicked && isTuinui) ? "-72px" : 0,
        }}
        transition={transition}
        className="absolute -translate-1/2 top-1/2 left-1/2 size-24 flex flex-row justify-center pt-6 gap-4 bg-amber-500 outline-8 -outline-offset-4 outline-amber-700 rounded-full"
      >
        {isTuinui ? (
          <div className="flex flex-row items-center h-fit">
            <div className="size-6 bg-amber-500 outline-4 outline-amber-600 rounded-full" />
            <div className="w-4 h-1 bg-amber-600" />
            <div className="size-6 bg-amber-500 outline-4 outline-amber-600 rounded-full" />
          </div>
        ) : (
          Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className="size-4 bg-amber-600 rounded-full" />
          ))
        )}
      </motion.div>
      <motion.div className="absolute -translate-1/2 size-32 rounded-full bg-amber-500 overflow-hidden outline-8 -outline-offset-4 outline-amber-700">
        <motion.div
          initial={{ top: 0 }}
          animate={{
            top: (!clicked && hovered) || (clicked && isTuinui) ? "50%" : 0,
          }}
          transition={transition}
          className="absolute -translate-1/2 left-1/2 top-0"
        >
          {Array.from({ length: 2 }).map((_, index) => (
            <motion.div
              key={index}
              style={{ rotate: ((index % 2) * 2 - 1) * 45 }}
              className="absolute -translate-1/2 top-1/2 left-1/2 bg-amber-600 w-2 h-8 rounded-full"
            />
          ))}
        </motion.div>
        <motion.div
          style={{
            borderRadius: "100%",
          }}
          initial={{
            width: "100%",
            height: "100%",
            top: "50%",
            backgroundColor: "oklch(66.6% 0.179 58.318)",
          }}
          animate={{
            width:
              (!clicked && hovered) || (clicked && isTuinui) ? "250%" : "100%",
            height:
              (!clicked && hovered) || (clicked && isTuinui) ? "150%" : "100%",
            top:
              (!clicked && hovered) || (clicked && isTuinui) ? "135%" : "50%",
            backgroundColor: clicked
              ? "oklch(55.5% 0.163 48.998)"
              : "oklch(66.6% 0.179 58.318)",
          }}
          transition={transition}
          className="absolute -translate-1/2 left-1/2 bg-amber-600 outline-8 -outline-offset-4 outline-amber-700"
        />
      </motion.div>
      <div className="absolute -translate-1/2 top-1/2 left-1/2 outline-8 -outline-offset-4 outline-amber-700 size-32 rounded-full"></div>
    </motion.div>
  );
});

export default Tuinui;
