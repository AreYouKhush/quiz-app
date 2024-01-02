import React, { useState } from "react";
import axios from "axios";
import { useGlobalContext } from "../context";

const Quiz = () => {
  const { mode, setMode } = useGlobalContext();
  const [firstQ, setFirstQ] = useState(true);
  const [question, setQuestion] = useState({});
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [wrong, setWrong] = useState(false);
  const [correct, setCorrect] = useState(false);
  const maxScore = localStorage.getItem("score") || 0;
  const [category, setCategory] = useState("0");

  const changeMode = () => {
    setScore(0);
    setMode("home");
  };

  function decodeHtmlEntities(html) {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  }

  const generateTechQuestion = async () => {
    let response;
    if (category === "0") {
      response = await axios.get(
        "https://quizapi.io/api/v1/questions?apiKey=ZDKNUnyxqdiYMcAdblYjGC1c11uYsbfSXTOBAxqt&limit=1"
      );
    } else {
      response = await axios.get(
        `https://quizapi.io/api/v1/questions?apiKey=ZDKNUnyxqdiYMcAdblYjGC1c11uYsbfSXTOBAxqt&limit=1&category=${category}`
      );
    }
    const data = response.data;
    let decodedOutput = decodeHtmlEntities(data[0].question);
    setQuestion({ question: decodedOutput });
    let id = 0;
    let correctOptionArr = Object.values(data[0].correct_answers);
    id = 0;
    let optionArr = Object.values(data[0].answers)
      .filter((c) => c !== null)
      .map((c) => ({ id: id++, opt: decodeHtmlEntities(c), correct: correctOptionArr[id - 1] }));
    setOptions([...optionArr]);
    setFirstQ(false);
  };

  const generateGkQuestion = async () => {
    let response;
    if (category === "0") {
      response = await axios.get("https://opentdb.com/api.php?amount=1");
    } else {
      response = await axios.get(
        `https://opentdb.com/api.php?amount=1&category=${category}`
      );
    }
    const data = response.data.results[0];
    let decodedOutput = decodeHtmlEntities(data.question);
    setQuestion({ question: decodedOutput });
    let id = 0;
    let correctOption = decodeHtmlEntities(data.correct_answer);
    let optionArr = Object.values(data.incorrect_answers);
    optionArr.push(correctOption);
    optionArr = optionArr.sort().map((o) => ({
      id: id++,
      opt: decodeHtmlEntities(o),
      correct: o === correctOption ? "true" : "false",
    }));
    setOptions([...optionArr]);
    setFirstQ(false);
  };

  const checkAnswer = (id) => {
    const checkIfCorrect = options.find((o) => o.id === id).correct;
    setOptions((prev) => prev.map((p) => ({ ...p, correct: null })));
    if (checkIfCorrect === "true") {
      setScore((prev) => prev + 1);
      setCorrect(true);
      setWrong(true);
      setTimeout(
        () => {
          setWrong(false);
          setCorrect(false);
          mode === "tech-quiz" ? generateTechQuestion() : generateGkQuestion();
        },
        mode === "tech-quiz" ? 1000 : 3000
      );
    } else if (checkIfCorrect === "false") {
      setWrong(true);
      setTimeout(
        () => {
          if (maxScore === 0) {
            localStorage.setItem("score", 0);
          }
          if (score > maxScore) {
            localStorage.setItem("score", score);
          }
          setWrong(false);
          changeMode();
        },
        mode === "tech-quiz" ? 1000 : 3000
      );
    }
  };

  return (
    <>
      <button
        onClick={changeMode}
        className="px-5 py-3 text-white rounded-lg hover:opacity-85 bg-red-500 absolute top-5 left-5 text-xs sm:text-base"
      >
        Home
      </button>

      <div className="flex items-center gap-3 absolute top-5 right-5">
        <div className="text-white text-xs sm:text-base">
          High Score: {maxScore}
        </div>
        <div className="px-5 py-3 text-white rounded-lg hover:opacity-85 bg-green-500 text-xs sm:text-base">
          Score: {score}
        </div>
      </div>
      {firstQ ? (
        <div className="flex flex-col gap-5">
          {mode === "tech-quiz" ? (
            <select
              name=""
              id=""
              onChange={(e) => setCategory(e.target.value)}
              defaultValue={category}
              className="px-6 py-3 rounded-xl bg-green-600 opacity-85 text-white"
            >
              <option value="0">Select Category</option>
              <option value="Linux">Linux</option>
              <option value="DevOps">DevOps</option>
              <option value="Docker">Docker</option>
              <option value="Code">Code</option>
              <option value="CMS">CMS</option>
            </select>
          ) : (
            <select
              name=""
              id=""
              onChange={(e) => setCategory(e.target.value)}
              defaultValue={category}
              className="px-6 py-3 rounded-xl bg-green-600 opacity-85 text-white"
            >
              <option value="0">Select Category</option>
              <option value="9">General Knowledge</option>
              <option value="10">Books</option>
              <option value="11">Film</option>
              <option value="12">Music</option>
              <option value="13">Musicals & Theatres</option>
              <option value="14">Television</option>
              <option value="15">Video Games</option>
              <option value="16">Board Games</option>
              <option value="17">Science & Nature</option>
              <option value="18">Computers</option>
              <option value="19">Mathematics</option>
              <option value="20">Mythology</option>
              <option value="21">Sports</option>
              <option value="22">Geography</option>
              <option value="23">History</option>
              <option value="24">Politics</option>
              <option value="25">Art</option>
              <option value="26">Celebrities</option>
              <option value="27">Animals</option>
              <option value="28">Vehicles</option>
              <option value="29">Comics</option>
              <option value="30">Gadgets</option>
              <option value="31">Anime & Manga</option>
              <option value="32">Cartoon & Animations</option>
            </select>
          )}
          <button
            onClick={
              mode === "tech-quiz" ? generateTechQuestion : generateGkQuestion
            }
            id="btn-bg"
            className="px-10 py-4 text-white rounded-lg hover:opacity-85 text-2xl"
          >
            Go...
          </button>
        </div>
      ) : (
        <div className="flex gap-6 flex-col text-3xl">
          <div className="text-white text-base sm:text-2xl">
            {question.question}
          </div>
          <div className="grid sm:grid-cols-2 gap-3 grid-col-1">
            {options.map((o) => {
              return (
                <button
                  key={o.id}
                  id="btn-bg"
                  className="px-2 py-1 text-white rounded-lg hover:opacity-85 text-sm sm:text-xl sm:py-3 sm:px-5"
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
              onClick={
                mode === "tech-quiz" ? generateTechQuestion : generateGkQuestion
              }
              id="btn-bg"
              className="px-5 py-3 text-white rounded-lg hover:opacity-85 text-base sm:text-2xl"
            >
              Skip
            </button>
          ) : !correct ? (
            <span className="px-5 py-3 text-white rounded-lg hover:opacity-85 bg-red-800 text-center font-bold text-base sm:text-2xl">
              ❌ WRONG!!!
            </span>
          ) : (
            <span className="px-5 py-3 text-white rounded-lg hover:opacity-85 bg-green-800 text-center font-bold text-base sm:text-2xl">
              ✅ Correct!!!
            </span>
          )}
          <div className="absolute bottom-2 right-2 text-white text-xs">
            *If question isn't generating wait 5 seconds then press skip!*
          </div>
        </div>
      )}
    </>
  );
};

export default Quiz;
