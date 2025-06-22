import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/homePage/homePage'
import AddQuestionPage from './pages/addQuestionPage/addQuestionPage'
import QuizListPage from './pages/quizListPage/quizListPage'
import QuizQuestionPage from './pages/quizQuestionPage/quizQuestionPage'
import QuizResultsPage from './pages/quizResultsPage/quizResultsPage'
import QuizReviewPage from './pages/quizReviewPage/quizReviewPage'
import NavBar from './components/navBar/navBar'
import Footer from './components/footer/footer'
import './App.scss'

const App: React.FC = () => {
  // const [message, setMessage] = useState<string>('')

  // useEffect(() => {
  //   // Deployed backend URL
  //   fetch('https://1vtaztyw35.execute-api.eu-north-1.amazonaws.com/dev/api/data', {
  //     credentials: 'include',
  //   })
  //     .then(response => response.json())
  //     .then(data => setMessage(data.message))
  //     .catch(error => console.error('Error fetching data:', error))
  // }, [])

  return (
    <Router>
        <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-question" element={<AddQuestionPage />} />
          <Route path="/quiz-list" element={<QuizListPage />} />
          <Route path="/quiz/:quizId" element={<QuizQuestionPage />} />
          <Route path="/quiz-results/:quizId" element={<QuizResultsPage />} />
          <Route path="/quiz-review/:quizId" element={<QuizReviewPage />} />
          <Route path="/quiz-review/:quizId/:category" element={<QuizReviewPage />} />
      </Routes>
        <Footer />
    </Router>
  )
}

export default App
