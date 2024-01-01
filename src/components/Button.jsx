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
          className="text-4xl rounded-lg bg-green-500 px-20 py-8 font-semibold text-white shadow-xl hover:shadow-2xl duration-100"
        >
          Take Quiz
        </button>
      <div className="text-white text-xl">
        Highest Score: {maxScore}
      </div>
      </div>
    </>
  );
};

export default Button;
