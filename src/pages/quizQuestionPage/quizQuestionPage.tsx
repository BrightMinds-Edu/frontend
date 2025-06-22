import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './quizQuestionPage.scss';

const QuizQuestionPage = () => {
    const navigate = useNavigate();
    const { quizId } = useParams();

    const dummyQuestions = [
        {
            id: "q1",
            question: "What is the capital of France?",
            options: ["London", "Paris", "Berlin"],
            correctAns: "Paris",
            explanation: "Paris is the capital and most populous city of France."
        },
        {
            id: "q2",
            question: "Which planet is known as the Red Planet?",
            options: ["Venus", "Mars", "Jupiter"],
            correctAns: "Mars",
            explanation: "Mars is called the Red Planet due to iron oxide (rust) on its surface."
        },
        {
            id: "q3",
            question: "What is 2 + 2?",
            options: ["3", "4", "5"],
            correctAns: "4",
            explanation: "Basic addition: 2 + 2 equals 4."
        }
    ];

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [userAnswers, setUserAnswers] = useState({});
    const [timeElapsed, setTimeElapsed] = useState(0);

    const currentQuestion = dummyQuestions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === dummyQuestions.length - 1;

    // Timer effect
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeElapsed(prev => prev + 1);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleAnswerSelect = (answer) => {
        setSelectedAnswer(answer);
    };

    const handleNext = () => {
        if (selectedAnswer) {
            setUserAnswers(prev => ({
                ...prev,
                [currentQuestion.id]: selectedAnswer
            }));

            if (isLastQuestion) {
                // Submit quiz
                handleSubmit();
            } else {
                setCurrentQuestionIndex(prev => prev + 1);
                setSelectedAnswer('');
            }
        }
    };

    const handleSubmit = () => {
        const finalAnswers = {
            ...userAnswers,
            [currentQuestion.id]: selectedAnswer
        };
        console.log('Quiz submitted with answers:', finalAnswers);
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
                                className={`option-button ${selectedAnswer === option ? 'selected' : ''}`}
                                onClick={() => handleAnswerSelect(option)}
                            >
                                <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                                <span className="option-text">{option}</span>
                            </button>
                        ))}
                    </div>

                    <div className="question-navigation">
                        <button
                            className="btn secondary"
                            onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                            disabled={currentQuestionIndex === 0}
                        >
                            Previous
                        </button>

                        <button
                            className={`btn primary ${!selectedAnswer ? 'disabled' : ''}`}
                            onClick={handleNext}
                            disabled={!selectedAnswer}
                        >
                            {isLastQuestion ? 'Submit Quiz' : 'Next Question'}
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default QuizQuestionPage;
