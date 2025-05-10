import { useLayoutEffect, useMemo, useState } from "react";
import Container from "./components/Container";
import Tuinui from "./components/Tuinui";
import { random } from "lodash";
import { useGame } from "./stores/score";
import { AnimatePresence, motion } from "motion/react";
import { transition } from "./utils/motion";
import image from "./assets/AS000620_01.gif";

const App = () => {
  const { wrong, correct } = useGame();
  const [count, setCount] = useState<{ xCount: number; yCount: number }>({
    xCount: Math.ceil(window.innerWidth / 128),
    yCount: Math.ceil(window.innerHeight / 64) - 5,
  });

  useLayoutEffect(() => {
    const resize = () => {
      setCount({
        xCount: Math.ceil(window.innerWidth / 128),
        yCount: Math.ceil(window.innerHeight / 64) - 5,
      });
    };
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const tuinuiPosition = useMemo(
    () =>
      random(
        1,
        count.xCount * count.yCount - Math.floor(count.yCount / 2),
        false
      ),
    [count.xCount, count.yCount]
  );

  return (
    <Container>
      <motion.div
        layout
        className="fixed size-full flex flex-col justify-end items-center bg-amber-700"
      >
        <AnimatePresence mode="popLayout">
          {correct ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={transition}
              className="absolute size-full bg-black/25 backdrop-blur flex justify-center items-center z-5"
            >
              <motion.div
                initial={{ opacity: 0, top: 128 }}
                animate={{ opacity: 1, top: 0 }}
                transition={transition}
                className="relative flex flex-col items-center text-4xl text-white font-bold uppercase"
              >
                You found me!
                <div className="text-[64px] text-center">
                  Happy 1 year anniversary!
                </div>
                <div className="flex text-[64px] text-center">
                  na kub Tuinui <img src={image} className="h-16" />
                </div>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>
        <motion.div
          layout
          transition={transition}
          className="flex flex-col gap-2 justify-center items-center bg-gradient-to-t from-amber-700 to-amber-800 w-full flex-1"
        >
          <div className="flex flex-col items-center text-white">
            <div className="uppercase font-bold text-4xl">Find me</div>
            <div className="uppercase font-bold text-8xl">Tuinui</div>
          </div>
          <div className="flex flex-row p-2 px-4 bg-amber-500 rounded-lg">
            <div className="uppercase text-amber-700 font-bold">
              Wrong {wrong}
            </div>
          </div>
        </motion.div>
        <AnimatePresence mode="popLayout">
          {!correct ? (
            <motion.div
              exit={{
                y: 128,
                opacity: 0,
              }}
              transition={transition}
              className="flex flex-col justify-end items-center"
            >
              {Array.from({ length: count.yCount }).map((_, yIndex) => (
                <div key={yIndex} className="flex flex-row -mb-16">
                  {Array.from({ length: count.xCount - (yIndex % 2) }).map(
                    (_, xIndex) => (
                      <div key={xIndex} className="relative size-32">
                        <Tuinui
                          isTuinui={
                            xIndex * count.yCount +
                              yIndex +
                              1 +
                              (xIndex === count.xCount - 1
                                ? -yIndex / 2
                                : 0) ===
                            tuinuiPosition
                          }
                        />
                      </div>
                    )
                  )}
                </div>
              ))}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </Container>
  );
};

export default App;
