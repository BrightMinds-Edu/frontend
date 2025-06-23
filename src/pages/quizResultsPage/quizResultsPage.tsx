import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./quizResultsPage.scss";

const QuizResultsPage = () => {
  const navigate = useNavigate();
  const { quizId } = useParams();
  // Dummy results data
  const quizResults = {
    QuizResultsId: 1,
    QuizId: 1,
    StartTime: new Date("2024-06-22T10:00:00"),
    EndTime: new Date("2024-06-22T10:15:00"),
    UserId: 1,
    totalQuestions: 3,
    correctAnswers: 2,
    wrongAnswers: 1,
    score: 67,
    timeTaken: "15:32",
  };

  const wrongAnswersData = [
    {
      id: "q2",
      question:
        "කූඩයක අඹ ගෙඩි 25ක් තිබුණා. අම්මා අඹ යුෂ හදන්න 8ක් එළියට ගත්තා. කූඩයේ තවමත් අඹ ගෙඩි කීයක් තිබේද?",

      correctAns: "17",
      explanation:
        "8 ඉවත් කිරීමෙන් පසු කූඩයේ තවමත් අඹ ගෙඩි කීයක් තිබේදැයි ඔබ සොයා ගත යුතුයි. එබැවින්,\n 25න් 8 අඩු කරන්න: \n 25 − 8 = 17 \nකූඩයේ ඉතිරිව ඇති අඹ ගෙඩි 17ක් තිබේ.",
    },
  ];

  const correctAnswersData = [
    {
      id: "q1",
      question:
        "නිමල් ළඟ රුපියල් 500ක් තිබුණා. එයා රුපියල් 320කට පැන්සල් පෙට්ටියක් ගත්තා. එයාට ඉතුරු සල්ලි කීයක් තියෙනවද?",

      correctAns: "180",
      explanation:
        "පැන්සල් පෙට්ටිය මිලදී ගැනීමෙන් පසු නිමල් සතුව කොපමණ මුදලක් තිබේදැයි ඔබ සොයා බැලිය යුතුය. එබැවින්,\n" +
        " ඔහු සතුව තිබූ මුදලින් පැන්සල් පෙට්ටියේ පිරිවැය අඩු කරන්න:\n" +
        "500 − 320 = 180 \n නිමල් සතුව රුපියල් 180 ක් ඉතිරිව ඇත.",
    },

    {
      id: "q3",
      question:
        "බස් රථයක ආසන 40ක් ඇත. දැනටමත් 27 දෙනෙක් වාඩි වී සිටිති. තවත් කී දෙනෙකුට බස් රථයට නැඟී වාඩි විය හැකිද?",

      correctAns: "13",
      explanation:
        "තවමත් හිස් ආසන කීයක් තිබේදැයි ඔබ සොයා ගත යුතුය. එබැවින්, මුළු ආසන සංඛ්‍යාවෙන් වාඩි වී සිටින පුද්ගලයින් සංඛ්‍යාව අඩු කරන්න: \n40 − 27 = 13 \nතවත් 13 දෙනෙකුට නැඟී වාඩි විය හැකිය.",
    },
  ];

  const handleViewCategory = (category: string) => {
    navigate(`/quiz-review/${quizId}/${category}`);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "#28a745";
    if (score >= 60) return "#ffc107";
    return "#dc3545";
  };

  const getPerformanceMessage = (score) => {
    if (score >= 80) return "Excellent work!";
    if (score >= 60) return "Good job!";
    return "Keep practicing!";
  };

  return (
    <div className="quiz-results-page">
      <div className="results-container">
        <header className="results-header">
          <h1>Quiz Complete!</h1>
          <p className="quiz-title">General Knowledge Quiz #1</p>
        </header>

        <div className="score-summary">
          <div
            className="score-circle"
            style={{ borderColor: getScoreColor(quizResults.score) }}
          >
            <span
              className="score-number"
              style={{ color: getScoreColor(quizResults.score) }}
            >
              {quizResults.score}%
            </span>
            <span className="score-label">Score</span>
          </div>
          <p
            className="performance-message"
            style={{ color: getScoreColor(quizResults.score) }}
          >
            {getPerformanceMessage(quizResults.score)}
          </p>
        </div>

        <div className="results-grid">
          <div className="result-card total">
            <div className="card-icon">📊</div>
            <div className="card-content">
              <h3>Total Questions</h3>
              <span className="card-number">{quizResults.totalQuestions}</span>
            </div>
            <button
              className="view-btn"
              onClick={() => handleViewCategory("all")}
            >
              View All
            </button>
          </div>

          <div className="result-card correct">
            <div className="card-icon">✅</div>
            <div className="card-content">
              <h3>Correct Answers</h3>
              <span className="card-number">{quizResults.correctAnswers}</span>
            </div>
            <button
              className="view-btn"
              onClick={() => handleViewCategory("correct")}
            >
              Review
            </button>
          </div>

          <div className="result-card wrong">
            <div className="card-icon">❌</div>
            <div className="card-content">
              <h3>Wrong Answers</h3>
              <span className="card-number">{quizResults.wrongAnswers}</span>
            </div>
            <button
              className="view-btn"
              onClick={() => handleViewCategory("wrong")}
            >
              Review
            </button>
          </div>
        </div>

        <div className="quiz-stats">
          <div className="stat-item">
            <span className="stat-label">Time Taken:</span>
            <span className="stat-value">{quizResults.timeTaken}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Started:</span>
            <span className="stat-value">
              {quizResults.StartTime.toLocaleTimeString()}
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Completed:</span>
            <span className="stat-value">
              {quizResults.EndTime.toLocaleTimeString()}
            </span>
          </div>
        </div>

        <div className="action-buttons">
          <button
            className="btn secondary"
            onClick={() => navigate("/quiz-list")}
          >
            Back to Quizzes
          </button>
          <button
            className="btn primary"
            onClick={() => navigate(`/quiz/${quizId}`)}
          >
            Retake Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizResultsPage;
