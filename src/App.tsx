import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/homePage/homePage'
import AddQuestionPage from './pages/addQuestionPage/addQuestionPage'
import './App.scss'

const App: React.FC = () => {
  const [message, setMessage] = useState<string>('')

  useEffect(() => {
    // Deployed backend URL
    fetch('https://1vtaztyw35.execute-api.eu-north-1.amazonaws.com/dev/api/data', {
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error('Error fetching data:', error))
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-question" element={<AddQuestionPage />} />
      </Routes>
      <p>Message from backend: {message}</p> 
      {/* TODO: remove this "message" and only for testing purposes */}
    </Router>
  )
}

export default App
