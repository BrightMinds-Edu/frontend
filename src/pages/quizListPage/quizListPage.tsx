import React from 'react';
import { useNavigate } from 'react-router-dom';
import './quizListPage.scss';

const QuizListPage = () => {
    const navigate = useNavigate();

    const quizzes = [
        {
            QuizId: 1,
            title: "General Knowledge Quiz #1",
            Questions: ["q1", "q2", "q3"],
            description: "Test your knowledge on geography, science, and math",
            author: "admin",
            duration: "15 minutes"
        },
        {
            QuizId: 2,
            title: "Arts & Sciences Quiz",
            Questions: ["q4", "q5", "q6"],
            description: "Literature, biology, and world landmarks",
            author: "admin",
            duration: "15 minutes"
        }
    ];

    const startQuiz = (quizId: number) => {
        navigate(`/quiz/${quizId}`);
    };

    return (
        <div className="quiz-list-page">
            <header className="page-header">
                <h1>Available Quizzes</h1>
                <p>Choose a quiz to test your knowledge</p>
            </header>

            <div className="quiz-grid">
                {quizzes.map((quiz) => (
                    <div key={quiz.QuizId} className="quiz-card">
                        <div className="quiz-card-header">
                            <h3>{quiz.title}</h3>
                            <span className="quiz-meta">By {quiz.author}</span>
                        </div>

                        <div className="quiz-card-body">
                            <p className="quiz-description">{quiz.description}</p>

                            <div className="quiz-stats">
                                <div className="stat">
                                    <span className="stat-label">Questions:</span>
                                    <span className="stat-value">{quiz.Questions.length}</span>
                                </div>
                                <div className="stat">
                                    <span className="stat-label">Duration:</span>
                                    <span className="stat-value">{quiz.duration}</span>
                                </div>
                            </div>
                        </div>

                        <div className="quiz-card-footer">
                            <button
                                className="btn primary start-quiz-btn"
                                onClick={() => startQuiz(quiz.QuizId)}
                            >
                                Start Quiz
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QuizListPage;
