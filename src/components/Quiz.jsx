import React, { useState } from "react";
import axios from "axios";
import { useGlobalContext } from "../context";

const Quiz = () => {
  const { setMode } = useGlobalContext();
  const [firstQ, setFirstQ] = useState(true);
  const [question, setQuestion] = useState({});
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [wrong, setWrong] = useState(false);
  const maxScore = localStorage.getItem("score") || 0;
  const [category, setCategory] = useState("")

  const changeMode = async () => {
    setScore(0);
    setMode(false);
  };

  const generateQuestion = async () => {
    let response;
    if(category === ""){
        response = await axios.get(
          "https://quizapi.io/api/v1/questions?apiKey=ZDKNUnyxqdiYMcAdblYjGC1c11uYsbfSXTOBAxqt&limit=1"
        );
    }else{
        response = await axios.get(
            `https://quizapi.io/api/v1/questions?apiKey=ZDKNUnyxqdiYMcAdblYjGC1c11uYsbfSXTOBAxqt&limit=1&category=${category}`
          );
    }
    const data = response.data;
    setQuestion({ ...data[0] });
    let id = 0;
    let correctOptionArr = Object.values(data[0].correct_answers);
    id = 0;
    let optionArr = Object.values(data[0].answers)
      .filter((c) => c !== null)
      .map((c) => ({ id: id++, opt: c, correct: correctOptionArr[id - 1] }));
    setOptions([...optionArr]);
    setFirstQ(false);
    console.log({ optionArr , category});
  };

  const checkAnswer = (id) => {
    const checkIfCorrect = options.find((o) => o.id === id).correct;
    setOptions((prev) => prev.map((p) => ({ ...p, correct: null })));
    if (checkIfCorrect === "true") {
      setScore((prev) => prev + 1);
      generateQuestion();
    } else if (checkIfCorrect === "false") {
      setWrong(true);
      setTimeout(() => {
        if (maxScore === 0) {
          localStorage.setItem("score", 0);
        }
        if (score > maxScore) {
          localStorage.setItem("score", score);
        }
        setWrong(false);
        changeMode();
      }, 2000);
    }
  };

  return (
    <>
      <button
        onClick={changeMode}
        className="px-5 py-3 text-white rounded-lg hover:opacity-85 bg-red-500 absolute top-5 left-5"
      >
        Home
      </button>

      <div className="flex items-center gap-3 absolute top-5 right-5">
        <div className="text-white">High Score: {maxScore}</div>
        <div className="px-5 py-3 text-white rounded-lg hover:opacity-85 bg-green-500 ">
          Score: {score}
        </div>
      </div>
      {firstQ ? (
        <div className="flex flex-col gap-5">
            <select name="" id="" onChange={e => setCategory(e.target.value)} defaultValue={category} className="px-6 py-3 rounded-xl bg-green-600 opacity-85 text-white">
                <option value="">Select Category</option>
                <option value="Linux">Linux</option>
                <option value="DevOps">DevOps</option>
                <option value="Docker">Docker</option>
                <option value="Code">Code</option>
                <option value="CMS">CMS</option>
            </select>
          <button
            onClick={generateQuestion}
            id="btn-bg"
            className="px-10 py-4 text-white rounded-lg hover:opacity-85 text-2xl"
          >
            Go...
          </button>
        </div>
      ) : (
        <div className="flex gap-6 flex-col text-3xl">
          <div className="text-white">{question.question}</div>
          <div className="grid grid-cols-2 gap-3 ">
            {options.map((o) => {
              return (
                <button
                  key={o.id}
                  id="btn-bg"
                  className="px-5 py-3 text-white rounded-lg hover:opacity-85"
                  onClick={() => {
                    checkAnswer(o.id);
                  }}
                >
                  {o.opt}
                </button>
              );
            })}
          </div>
          {!wrong ? (
            <button
              onClick={generateQuestion}
              id="btn-bg"
              className="px-5 py-3 text-white rounded-lg hover:opacity-85"
            >
              Skip
            </button>
          ) : (
            <span className="px-5 py-3 text-white rounded-lg hover:opacity-85 bg-red-800 text-center font-bold">
              WRONG ANSWER!!!
            </span>
          )}
        </div>
      )}
    </>
  );
};

export default Quiz;
