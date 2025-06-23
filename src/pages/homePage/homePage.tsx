import React, { CSSProperties, useState } from "react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";

interface Quiz {
  subject: string;
  score: number;
  date: string;
}

interface User {
  name: string;
  pastQuizzes: Quiz[];
  average: Record<string, number>;
  suggestions: string;
}

const dummyUser: User = {
  name: "User1",
  pastQuizzes: [
    { subject: "Maths", score: 85, date: "2025-06-10" },
    { subject: "English", score: 78, date: "2025-06-14" },
    { subject: "Environment", score: 92, date: "2025-06-18" },
  ],
  average: {
    Maths: 85,
    Environment: 92,
    Sinhala: 74,
    English: 78,
    Tamil: 81,
  },
  suggestions:
    "You are doing great in Environment. Focus more on Sinhala and English to improve your overall performance.",
};

const SidebarTabs = [
  "Take a quiz",
  "Current progress",
  "View quiz results",
  "Suggestions",
  "Ask AI",
] as const;
type Tab = (typeof SidebarTabs)[number];

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    color: "#1f2937",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  } as CSSProperties,
  sidebar: {
    width: "18rem",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    padding: "2rem 1.5rem",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
  } as CSSProperties,
  sidebarTitle: {
    fontSize: "1.75rem",
    fontWeight: "700",
    marginBottom: "2.5rem",
    textAlign: "center",
    letterSpacing: "-0.025em",
  } as CSSProperties,
  tabList: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    listStyle: "none",
    padding: 0,
    margin: 0,
  } as CSSProperties,
  tabButton: {
    width: "100%",
    textAlign: "left",
    justifyContent: "flex-start",
    borderRadius: "0.75rem",
    padding: "0.875rem 1.25rem",
    fontSize: "0.95rem",
    fontWeight: "500",
    transition: "all 0.2s ease",
    border: "none",
  } as CSSProperties,
  main: {
    flex: 1,
    padding: "2.5rem",
    backgroundColor: "#f8fafc",
    background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    minHeight: "100vh",
  } as CSSProperties,
  card: {
    backgroundColor: "white",
    borderRadius: "1rem",
    padding: "2rem",
    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.08)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(10px)",
  } as CSSProperties,
  cardTitle: {
    fontSize: "1.5rem",
    fontWeight: "700",
    marginBottom: "1.5rem",
    color: "#1f2937",
    borderBottom: "2px solid #e5e7eb",
    paddingBottom: "0.75rem",
  } as CSSProperties,
  quizGrid: {
    display: "grid",
    gap: "1rem",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  } as CSSProperties,
  quizCard: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    padding: "1.5rem",
    borderRadius: "0.75rem",
    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    cursor: "pointer",
  } as CSSProperties,
  progressGrid: {
    display: "grid",
    gap: "1rem",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  } as CSSProperties,
  progressCard: {
    background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
    padding: "1.25rem",
    borderRadius: "0.75rem",
    border: "1px solid #e5e7eb",
    textAlign: "center",
    transition: "transform 0.2s ease",
  } as CSSProperties,
  subjectName: {
    fontSize: "1rem",
    fontWeight: "600",
    color: "#4b5563",
    marginBottom: "0.5rem",
  } as CSSProperties,
  score: {
    fontSize: "2rem",
    fontWeight: "700",
    color: "#667eea",
  } as CSSProperties,
  resultsGrid: {
    display: "grid",
    gap: "1rem",
  } as CSSProperties,
  resultCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1.25rem",
    background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
    borderRadius: "0.75rem",
    border: "1px solid #e5e7eb",
    transition: "transform 0.2s ease",
  } as CSSProperties,
  resultInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "0.25rem",
  } as CSSProperties,
  resultSubject: {
    fontSize: "1.1rem",
    fontWeight: "600",
    color: "#1f2937",
  } as CSSProperties,
  resultDate: {
    fontSize: "0.875rem",
    color: "#6b7280",
  } as CSSProperties,
  resultScore: {
    fontSize: "1.5rem",
    fontWeight: "700",
    color: "#667eea",
  } as CSSProperties,
  suggestionCard: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    padding: "2rem",
    borderRadius: "1rem",
    boxShadow: "0 8px 25px rgba(102, 126, 234, 0.3)",
  } as CSSProperties,
  suggestionText: {
    fontSize: "1.1rem",
    lineHeight: "1.6",
    margin: 0,
  } as CSSProperties,
  aiContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  } as CSSProperties,
  input: {
    width: "100%",
    border: "2px solid #e5e7eb",
    borderRadius: "0.75rem",
    padding: "1rem",
    fontSize: "1rem",
    transition: "border-color 0.2s ease",
    outline: "none",
    fontFamily: "inherit",
  } as CSSProperties,
  askButton: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    border: "none",
    borderRadius: "0.75rem",
    padding: "1rem 2rem",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "transform 0.2s ease",
    alignSelf: "flex-start",
  } as CSSProperties,
};

export default function HomePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("Take a quiz");

  const startQuiz = (quizId: number) => {
    navigate(`/quiz/${quizId}`);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "#22c55e";
    if (score >= 80) return "#eab308";
    if (score >= 70) return "#f97316";
    return "#ef4444";
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Take a quiz":
        return (
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Suggested Quizzes</h2>
            <div style={styles.quizGrid}>
              {[
                { subject: "Maths", topic: "Genaral mathematics", icon: "📊" },
                { subject: "English", topic: "Spelling practice", icon: "📚" },
                {
                  subject: "Environment",
                  topic: "Geography",
                  icon: "🌱",
                },
              ].map((quiz, idx) => (
                <div
                  key={idx}
                  style={{
                    ...styles.quizCard,
                    transform: "translateY(0)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 25px rgba(102, 126, 234, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 15px rgba(102, 126, 234, 0.3)";
                  }}
                  onClick={(e) => {
                    startQuiz(1);
                  }}
                >
                  <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>
                    {quiz.icon}
                  </div>
                  <h3
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: "600",
                      margin: "0 0 0.5rem 0",
                    }}
                  >
                    {quiz.subject}
                  </h3>
                  <p style={{ margin: 0, opacity: 0.9 }}>{quiz.topic}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case "Current progress":
        return (
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Average Scores</h2>
            <div style={styles.progressGrid}>
              {Object.entries(dummyUser.average).map(([subject, score]) => (
                <div
                  key={subject}
                  style={{
                    ...styles.progressCard,
                    transform: "translateY(0)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <div style={styles.subjectName}>{subject}</div>
                  <div style={{ ...styles.score, color: getScoreColor(score) }}>
                    {score}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case "View quiz results":
        return (
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Past Quizzes</h2>
            <div style={styles.resultsGrid}>
              {dummyUser.pastQuizzes.map((quiz, idx) => (
                <div
                  key={idx}
                  style={{
                    ...styles.resultCard,
                    transform: "translateY(0)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <div style={styles.resultInfo}>
                    <div style={styles.resultSubject}>{quiz.subject}</div>
                    <div style={styles.resultDate}>{quiz.date}</div>
                  </div>
                  <div
                    style={{
                      ...styles.resultScore,
                      color: getScoreColor(quiz.score),
                    }}
                  >
                    {quiz.score}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case "Suggestions":
        return (
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>AI Suggestions</h2>
            <div style={styles.suggestionCard}>
              <p style={styles.suggestionText}>{dummyUser.suggestions}</p>
            </div>
          </div>
        );
      case "Ask AI":
        return (
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Ask our AI Assistant</h2>
            <div style={styles.aiContainer}>
              <input
                style={styles.input}
                placeholder="Type your question here..."
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#667eea";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#e5e7eb";
                }}
              />
              <button
                style={{
                  ...styles.askButton,
                  transform: "translateY(0)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Ask Assistant
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={styles.container}>
      <aside style={styles.sidebar}>
        <h1 style={styles.sidebarTitle}>Welcome, {dummyUser.name}</h1>
        <ul style={styles.tabList}>
          {SidebarTabs.map((tab) => (
            <li key={tab} style={{ listStyle: "none" }}>
              <button
                style={{
                  ...styles.tabButton,
                  backgroundColor:
                    activeTab === tab
                      ? "rgba(255, 255, 255, 0.2)"
                      : "transparent",
                  color: "white",
                  transform: "translateX(0)",
                }}
                onClick={() => setActiveTab(tab)}
                onMouseEnter={(e) => {
                  if (activeTab !== tab) {
                    e.currentTarget.style.backgroundColor =
                      "rgba(255, 255, 255, 0.1)";
                    e.currentTarget.style.transform = "translateX(4px)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== tab) {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.transform = "translateX(0)";
                  }
                }}
              >
                {tab}
              </button>
            </li>
          ))}
        </ul>
      </aside>
      <main style={styles.main}>{renderContent()}</main>
    </div>
  );
}
