import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './quizReviewPage.scss';

const QuizReviewPage = () => {
    const navigate = useNavigate();
    const { quizId, category } = useParams();
    const [selectedFilter, setSelectedFilter] = useState(category || 'all');

    // Dummy review data
    const allAnswers = [
        {
            questionId: "q1",
            question: "What is the capital of France?",
            options: ["London", "Paris", "Berlin"],
            userAnswer: "Paris",
            correctAnswer: "Paris",
            isCorrect: true,
            explanation: "Paris is the capital and most populous city of France.",
            category: "Geography"
        },
        {
            questionId: "q2",
            question: "Which planet is known as the Red Planet?",
            options: ["Venus", "Mars", "Jupiter"],
            userAnswer: "Venus",
            correctAnswer: "Mars",
            isCorrect: false,
            explanation: "Mars is called the Red Planet due to iron oxide (rust) on its surface.",
            category: "Science"
        },
        {
            questionId: "q3",
            question: "What is 2 + 2?",
            options: ["3", "4", "5"],
            userAnswer: "4",
            correctAnswer: "4",
            isCorrect: true,
            explanation: "Basic addition: 2 + 2 equals 4.",
            category: "Math"
        }
    ];

    const getFilteredAnswers = () => {
        switch (selectedFilter) {
            case 'correct':
                return allAnswers.filter(answer => answer.isCorrect);
            case 'wrong':
                return allAnswers.filter(answer => !answer.isCorrect);
            default:
                return allAnswers;
        }
    };

    const filteredAnswers = getFilteredAnswers();

    const filterCounts = {
        all: allAnswers.length,
        correct: allAnswers.filter(a => a.isCorrect).length,
        wrong: allAnswers.filter(a => !a.isCorrect).length
    };

    return (
        <div className="quiz-review-page">
            <header className="review-header">
                <div className="header-content">
                    <h1>Quiz Review</h1>
                    <p>General Knowledge Quiz #1</p>
                </div>

                <div className="filter-tabs">
                    <button
                        className={`filter-tab ${selectedFilter === 'all' ? 'active' : ''}`}
                        onClick={() => {
                            setSelectedFilter('all');
                            navigate(`/quiz-review/${quizId}/all`);
                        }}
                    >
                        All Questions ({filterCounts.all})
                    </button>
                    <button
                        className={`filter-tab correct ${selectedFilter === 'correct' ? 'active' : ''}`}
                        onClick={() => {
                            setSelectedFilter('correct');
                            navigate(`/quiz-review/${quizId}/correct`);
                        }}
                    >
                        Correct ({filterCounts.correct})
                    </button>
                    <button
                        className={`filter-tab wrong ${selectedFilter === 'wrong' ? 'active' : ''}`}
                        onClick={() => {
                            setSelectedFilter('wrong');
                            navigate(`/quiz-review/${quizId}/wrong`);
                        }}
                    >
                        Wrong ({filterCounts.wrong})
                    </button>
                </div>
            </header>

            <main className="review-content">
                <div className="questions-container">
                    {filteredAnswers.length === 0 ? (
                        <div className="no-questions">
                            <p>No questions found for the selected filter.</p>
                        </div>
                    ) : (
                        filteredAnswers.map((answer, index) => (
                            <div key={answer.questionId} className="question-review-card">
                                <div className="question-header">
                                    <div className="question-number">
                                        Question {allAnswers.findIndex(a => a.questionId === answer.questionId) + 1}
                                    </div>
                                    <div className={`answer-status ${answer.isCorrect ? 'correct' : 'wrong'}`}>
                                        {answer.isCorrect ? '✅ Correct' : '❌ Incorrect'}
                                    </div>
                                </div>

                                <div className="question-content">
                                    <h3 className="question-text">{answer.question}</h3>

                                    <div className="options-review">
                                        {answer.options.map((option, optIndex) => {
                                            const isUserAnswer = option === answer.userAnswer;
                                            const isCorrectAnswer = option === answer.correctAnswer;

                                            let optionClass = 'option-item';
                                            if (isCorrectAnswer) optionClass += ' correct-option';
                                            if (isUserAnswer && !answer.isCorrect) optionClass += ' user-wrong';
                                            if (isUserAnswer && answer.isCorrect) optionClass += ' user-correct';

                                            return (
                                                <div key={optIndex} className={optionClass}>
                          <span className="option-letter">
                            {String.fromCharCode(65 + optIndex)}
                          </span>
                                                    <span className="option-text">{option}</span>
                                                    <div className="option-indicators">
                                                        {isCorrectAnswer && <span className="correct-indicator">✓</span>}
                                                        {isUserAnswer && !answer.isCorrect && <span className="wrong-indicator">✗</span>}
                                                        {isUserAnswer && <span className="user-indicator">Your answer</span>}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    <div className="explanation-section">
                                        <h4>Explanation:</h4>
                                        <p>{answer.explanation}</p>
                                    </div>

                                    <div className="question-meta">
                                        <span className="category-tag">{answer.category}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </main>

            <div className="review-actions">
                <button className="btn secondary" onClick={() => navigate(`/quiz-results/${quizId}`)}>
                    Back to Results
                </button>
                <button className="btn primary" onClick={() => navigate('/quiz-list')}>
                    Take Another Quiz
                </button>
            </div>
        </div>
    );
};

export default QuizReviewPage;
