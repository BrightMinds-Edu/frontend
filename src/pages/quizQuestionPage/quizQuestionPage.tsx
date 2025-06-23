import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./quizQuestionPage.scss";

const QuizQuestionPage = () => {
  const navigate = useNavigate();
  const { quizId } = useParams();

  const dummyQuestions = [
    {
      id: "q1",
      question:
        "නිමල් ළඟ රුපියල් 500ක් තිබුණා. එයා රුපියල් 320කට පැන්සල් පෙට්ටියක් ගත්තා. එයාට ඉතුරු සල්ලි කීයක් තියෙනවද?",
      options: ["180", "120", "260"],
      correctAns: "180",
      explanation:
        "පැන්සල් පෙට්ටිය මිලදී ගැනීමෙන් පසු නිමල් සතුව කොපමණ මුදලක් තිබේදැයි ඔබ සොයා බැලිය යුතුය. එබැවින්,\n" +
        " ඔහු සතුව තිබූ මුදලින් පැන්සල් පෙට්ටියේ පිරිවැය අඩු කරන්න:\n" +
        "500 − 320 = 180 \n නිමල් සතුව රුපියල් 180 ක් ඉතිරිව ඇත.",
    },
    {
      id: "q2",
      question:
        "කූඩයක අඹ ගෙඩි 25ක් තිබුණා. අම්මා අඹ යුෂ හදන්න 8ක් එළියට ගත්තා. කූඩයේ තවමත් අඹ ගෙඩි කීයක් තිබේද?",
      options: ["33", "17", "12"],
      correctAns: "17",
      explanation:
        "8 ඉවත් කිරීමෙන් පසු කූඩයේ තවමත් අඹ ගෙඩි කීයක් තිබේදැයි ඔබ සොයා ගත යුතුයි. එබැවින්,\n 25න් 8 අඩු කරන්න: \n 25 − 8 = 17 \nකූඩයේ ඉතිරිව ඇති අඹ ගෙඩි 17ක් තිබේ.",
    },
    {
      id: "q3",
      question:
        "බස් රථයක ආසන 40ක් ඇත. දැනටමත් 27 දෙනෙක් වාඩි වී සිටිති. තවත් කී දෙනෙකුට බස් රථයට නැඟී වාඩි විය හැකිද?",
      options: ["15", "23", "13"],
      correctAns: "13",
      explanation:
        "තවමත් හිස් ආසන කීයක් තිබේදැයි ඔබ සොයා ගත යුතුය. එබැවින්, මුළු ආසන සංඛ්‍යාවෙන් වාඩි වී සිටින පුද්ගලයින් සංඛ්‍යාව අඩු කරන්න: \n40 − 27 = 13 \nතවත් 13 දෙනෙකුට නැඟී වාඩි විය හැකිය.",
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [userAnswers, setUserAnswers] = useState({});
  const [timeElapsed, setTimeElapsed] = useState(0);

  const currentQuestion = dummyQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === dummyQuestions.length - 1;

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNext = () => {
    if (selectedAnswer) {
      setUserAnswers((prev) => ({
        ...prev,
        [currentQuestion.id]: selectedAnswer,
      }));

      if (isLastQuestion) {
        // Submit quiz
        handleSubmit();
      } else {
        setCurrentQuestionIndex((prev) => prev + 1);
        setSelectedAnswer("");
      }
    }
  };

  const handleSubmit = () => {
    const finalAnswers = {
      ...userAnswers,
      [currentQuestion.id]: selectedAnswer,
    };
    console.log("Quiz submitted with answers:", finalAnswers);
    navigate(`/quiz-results/${quizId}`);
  };

  const progress = ((currentQuestionIndex + 1) / dummyQuestions.length) * 100;

  return (
    <div className="quiz-question-page">
      <header className="quiz-header">
        <div className="quiz-info">
          <h1>General Knowledge Quiz #1</h1>
          <div className="quiz-meta">
            <span className="timer">Time: {formatTime(timeElapsed)}</span>
            <span className="progress-text">
              Question {currentQuestionIndex + 1} of {dummyQuestions.length}
            </span>
          </div>
        </div>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </header>

      <main className="question-container">
        <div className="question-card">
          <h2 className="question-text">{currentQuestion.question}</h2>

          <div className="options-container">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                className={`option-button ${
                  selectedAnswer === option ? "selected" : ""
                }`}
                onClick={() => handleAnswerSelect(option)}
              >
                <span className="option-letter">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="option-text">{option}</span>
              </button>
            ))}
          </div>

          <div className="question-navigation">
            <button
              className="btn secondary"
              onClick={() =>
                setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))
              }
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </button>

            <button
              className={`btn primary ${!selectedAnswer ? "disabled" : ""}`}
              onClick={handleNext}
              disabled={!selectedAnswer}
            >
              {isLastQuestion ? "Submit Quiz" : "Next Question"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuizQuestionPage;
