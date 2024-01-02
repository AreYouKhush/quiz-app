import React from "react";
import { useGlobalContext } from "../context";
import axios from "axios";

const Button = () => {
  const { mode, setMode } = useGlobalContext();

  const changeMode = async () => {
    setMode(true);
  };

  const maxScore = localStorage.getItem('score') || 0;

  return (
    <>
      <div className="flex justify-center flex-col gap-4 items-center">
        <button
          onClick={changeMode}
          id="btn-bg"
          className="rounded-lg bg-green-500 px-10 py-4 font-semibold text-white shadow-xl hover:shadow-2xl duration-100 text-xl sm:text-4xl sm:px-20 sm:py-8"
        >
          Take Quiz
        </button>
      <div className="text-white text-sm sm:text-base">
        Highest Score: {maxScore}
      </div>
      </div>
    </>
  );
};

export default Button;
