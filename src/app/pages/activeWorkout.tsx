"use client";
import clsx from "clsx";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { AiFillHome, AiFillLock, AiFillUnlock } from "react-icons/ai";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { FaStepBackward, FaStepForward } from "react-icons/fa";
import generateArray from "../helpers/generateArray";
import { Workout } from "../types/Workout";

type Props = {
  setView: React.Dispatch<SetStateAction<string>>;
  activeWorkout: Workout | undefined;
};

const getIntervalDetails = (interval: {
  prepare?: number;
  work?: number;
  rest?: number;
  cooldown?: number;
}) => {
  const key = Object.keys(interval)[0];
  return { time: interval[key as keyof typeof interval], intervalType: key };
};

const ActiveWorkout = ({ setView, activeWorkout }: Props) => {
  const intervalArray = activeWorkout
    ? generateArray(
        activeWorkout.prepare,
        activeWorkout.work,
        activeWorkout.rest,
        activeWorkout.cycles,
        activeWorkout.sets,
        activeWorkout.restBetweenSets,
        activeWorkout.cooldown
      )
    : null;
  if (!intervalArray) return null;
  const whistleRef = useRef<any>(null);

  const [locked, setLocked] = useState(false);
  const [running, setRunning] = useState(false);
  const [intervalPosition, setIntervalPosition] = useState(0);
  const [currentInterval, setCurrentInterval] = useState(
    getIntervalDetails(intervalArray[intervalPosition])
  );

  const stopTimer = () => {
    setRunning(false);
  };

  const playWhistle = () => {
    whistleRef?.current?.play();
  };

  const decrementIntervalTime = () => {
    let { time, intervalType } = currentInterval;
    time!--;
    if (time != 0) {
      return setCurrentInterval({ intervalType, time });
    }

    if (intervalPosition + 1 == intervalArray.length) {
      setCurrentInterval({ intervalType, time });
      return stopTimer();
    }

    let newPosition = intervalPosition + 1;
    setCurrentInterval(getIntervalDetails(intervalArray[newPosition]));
    setIntervalPosition(newPosition);
  };

  const handleChangeInterval = (position: number) => {
    setCurrentInterval(getIntervalDetails(intervalArray[position]));
    setIntervalPosition(position);
  };

  const getBackgroundColor = () => {
    switch (currentInterval.intervalType) {
      case "prepare":
        return "green";
      case "work":
        return "red";
      case "rest":
        return "#4dc0e3";
      case "cooldown":
        return "#4de3de";
    }
  };

  useEffect(() => {
    running && setTimeout(decrementIntervalTime, 1000);
  }, [running, currentInterval]);

  return (
    <div
      className="relative h-screen p-4 text-white pt-4 space-y-4"
      style={{ backgroundColor: `${getBackgroundColor()}` }}
    >
      <div className="space-y-10">
        <div className="flex justify-center items-center gap-8 text-6xl font-bold">
          <button onClick={() => setLocked((prev) => !prev)}>
            {locked ? <AiFillLock /> : <AiFillUnlock />}
          </button>
          <h1>{currentInterval.intervalType}</h1>
          <button onClick={() => setRunning((prev) => !prev)}>
            {running ? <BsFillPauseFill /> : <BsFillPlayFill />}
          </button>
        </div>
        <div className="text-center text-[20rem] leading-none">
          {currentInterval.time}
        </div>
      </div>
      <div className="h-[280px] md:h-[400px] overflow-scroll">
        {intervalArray.map((d, i) => {
          const { intervalType, time } = getIntervalDetails(d);
          return (
            <div
              className={clsx(
                "border-b-[1px] border-white text-center text-4xl",
                i == intervalPosition && "bg-black/30 rounded"
              )}
            >
              <button
                className="py-2 w-full rounded hover:bg-black/30"
                onClick={() => handleChangeInterval(i)}
              >
                {i + 1}. {intervalType}: {time}
              </button>
            </div>
          );
        })}
      </div>
      <audio src="/startWhistle.wav" ref={whistleRef} />

      <div
        className="absolute bottom-0 left-0 w-full flex justify-center gap-4 py-4 text-white text-4xl hover:bg-gray-200"
        style={{ backgroundColor: `${getBackgroundColor()}` }}
      >
        <button>
          <FaStepBackward />
        </button>
        <button onClick={() => setView("home")}>
          <AiFillHome />
        </button>
        <button>
          <FaStepForward />
        </button>
      </div>
    </div>
  );
};

export default ActiveWorkout;
