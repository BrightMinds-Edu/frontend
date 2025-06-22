// Dummy data for prototype
export const dummyQuestions = [
    {
        id: "q1",
        question: "What is the capital of France?",
        options: ["London", "Paris", "Berlin"],
        state: "processed",
        correctAns: "Paris",
        explanation: "Paris is the capital and most populous city of France.",
        category: "Geography",
        author: "admin"
    },
    {
        id: "q2",
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter"],
        state: "processed",
        correctAns: "Mars",
        explanation: "Mars is called the Red Planet due to iron oxide (rust) on its surface.",
        category: "Science",
        author: "admin"
    },
    {
        id: "q3",
        question: "What is 2 + 2?",
        options: ["3", "4", "5"],
        state: "processed",
        correctAns: "4",
        explanation: "Basic addition: 2 + 2 equals 4.",
        category: "Math",
        author: "admin"
    },
    {
        id: "q4",
        question: "Who wrote Romeo and Juliet?",
        options: ["Charles Dickens", "William Shakespeare", "Jane Austen"],
        state: "processed",
        correctAns: "William Shakespeare",
        explanation: "Romeo and Juliet is a tragedy written by William Shakespeare.",
        category: "Literature",
        author: "admin"
    },
    {
        id: "q5",
        question: "What is the largest mammal?",
        options: ["Elephant", "Blue Whale", "Giraffe"],
        state: "processed",
        correctAns: "Blue Whale",
        explanation: "The blue whale is the largest animal ever known to have lived on Earth.",
        category: "Science",
        author: "admin"
    },
    {
        id: "q6",
        question: "Which country is home to Machu Picchu?",
        options: ["Brazil", "Peru", "Chile"],
        state: "processed",
        correctAns: "Peru",
        explanation: "Machu Picchu is an ancient Incan citadel located in Peru.",
        category: "Geography",
        author: "admin"
    }
];

export const dummyQuizzes = [
    {
        QuizId: 1,
        Questions: ["q1", "q2", "q3"],
        author: "admin"
    },
    {
        QuizId: 2,
        Questions: ["q4", "q5", "q6"],
        author: "admin"
    }
];

export const dummyQuizResults = {
    QuizResultsId: 1,
    QuizId: 1,
    StartTime: new Date("2024-06-22T10:00:00"),
    EndTime: new Date("2024-06-22T10:15:00"),
    UserId: 1,
    WrongAnswers: [
        {
            questionId: "q2",
            userAnswer: "Venus",
            correctAnswer: "Mars"
        }
    ],
    Key: "result_123"
};
