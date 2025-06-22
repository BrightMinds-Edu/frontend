import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/homePage/homePage'
import AddQuestionPage from './pages/addQuestionPage/addQuestionPage'
import QuizListPage from './pages/quizListPage/quizListPage'
import QuizQuestionPage from './pages/quizQuestionPage/quizQuestionPage'
import QuizResultsPage from './pages/quizResultsPage/quizResultsPage'
import QuizReviewPage from './pages/quizReviewPage/quizReviewPage'
import './App.scss'

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/add-question" element={<AddQuestionPage />} />
                <Route path="/quiz-list" element={<QuizListPage />} />
                <Route path="/quiz/:quizId" element={<QuizQuestionPage />} />
                <Route path="/quiz-results/:quizId" element={<QuizResultsPage />} />
                <Route path="/quiz-review/:quizId" element={<QuizReviewPage />} />
                <Route path="/quiz-review/:quizId/:category" element={<QuizReviewPage />} />
            </Routes>
        </Router>
    )
}

export default App
