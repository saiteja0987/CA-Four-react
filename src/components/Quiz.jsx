import React, { useState, useEffect } from "react";
import questions from "../questions";
import "./Quiz.css";

import kalviumLogo from "../assets/Kalvium-Logo-SVG.svg";

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [highlited, setHighlited] = useState(false);

  const [dark, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme === "dark" : true;
  });

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = !prevTheme;
      localStorage.setItem("theme", newTheme ? "dark" : "light");
      return newTheme;
    });
  };

  useEffect(() => {
    document.body.className = dark ? "dark-theme" : "light-theme";
  }, [dark]);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
  };

  const headerStyle = {
    backgroundColor: dark ? "#a9dbec" : "#00203f",
    borderBottom: dark ? "4px solid #00203f" : "4px solid #a9dbec",
  };

  const headerButtonStyle = {
    backgroundColor: dark ? "#00203f" : "#a9dbec",
    color: dark ? "white" : "black",
  };

  const backStyle = {
    backgroundColor: dark ? "#a9dbec" : "#00203f",
  };

  const mainStyle = {
    backgroundColor: dark ? "#00203f" : "#a9dbec",
  };

  const optionStyle = {
    backgroundColor: dark ? "#1a71c0" : "#00203f",
    color: dark ? "white" : "black",
  };

  const optionLightStyle = {
    backgroundColor: "#f0f0f0",
    color: "black",
  };

  const highlightButtonStyle = {
    backgroundColor: dark ? "#ffcc00" : "#00203f",
    color: dark ? "black" : "white",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "20px",
    width: "80px",  // Fixed width of 80px
  };

  const paraStyle = {
    color: dark ? "white" : "black",
  };

  const resultStyle = {
    color: dark ? "#a9dbec" : "#00203f",
  };

  const resultBtn = {
    backgroundColor: dark ? "#a9dbec" : "#00203f",
    color: dark ? "black" : "white",
  };

  return (
    <>
      <div className="app" style={backStyle}>
        <header style={headerStyle}>
          <img className="kalvium" src={kalviumLogo} alt="Logo" />
          <button style={headerButtonStyle} id="toggle" onClick={toggleTheme}>
            {dark === false ? "Light" : "Dark"}
          </button>
        </header>
        {currentQuestionIndex < questions.length ? (
          <main style={mainStyle}>
            <div className="question">
              <p id={highlited ? "highlited" : ""} style={resultStyle}>
                {questions[currentQuestionIndex].text}
              </p>
              {questions[currentQuestionIndex].options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleAnswer(option.isCorrect)}
                  style={dark ? optionStyle : optionLightStyle}
                >
                  {option.text}
                </button>
              ))}
              <button
                style={highlightButtonStyle}
                onClick={() =>
                  setHighlited((prevHighlited) => !prevHighlited)
                }
              >
                Highlight
              </button>
            </div>
          </main>
        ) : (
          <main className="complete" style={mainStyle}>
            <div className="completed">
              <h1 style={paraStyle}>Result :)</h1>
              <p style={resultStyle}>Quiz Completed!</p>
              <p style={resultStyle}>
                Your scored {score} / {questions.length}
                <p style={resultStyle}>Let's Goo!</p>
              </p>
              <button style={resultBtn} onClick={restartQuiz}>
                Try Again
              </button>
            </div>
          </main>
        )}
      </div>
    </>
  );
};

export default Quiz;
