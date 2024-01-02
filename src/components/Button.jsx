import React from "react";
import { useGlobalContext } from "../context";

const Button = () => {
  const { setMode } = useGlobalContext();

  const changeModeToTech = () => {
    setMode("tech-quiz");
  };

  const changeModeToGk = () => {
    setMode("gk-quiz");
  };

  const maxScore = localStorage.getItem("score") || 0;

  return (
    <>
      <div className="flex justify-center flex-col gap-4 items-center">
        <div className="flex">
          <button
            onClick={changeModeToTech}
            id="btn-bg"
            className="rounded-l-lg bg-green-500 px-5 py-2 font-semibold text-white duration-100 text-lg sm:px-20 sm:py-8 hover:opacity-75 border-r-2 border-black w-6/12"
            >
            Technical
          </button>
          <button
            onClick={changeModeToGk}
            id="btn-bg"
            className="rounded-r-lg bg-green-500 px-5 py-2 font-semibold text-white duration-100 text-lg sm:px-20 sm:py-8 hover:opacity-75 w-6/12"
            >
            General Knowledge
          </button>
            </div>
        <div className="text-white text-sm sm:text-base">
          Highest Score: {maxScore}
        </div>
      </div>
    </>
  );
};

export default Button;
