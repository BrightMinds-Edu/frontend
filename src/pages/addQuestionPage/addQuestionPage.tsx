import React, { useMemo, useState } from 'react';
import { v4 as uuid } from 'uuid';
import AddQuestionCard, { QuestionData } from '../../components/addQuestionCard/addQuestionCard';
import './addQuestionPage.scss';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddQuestionPage: React.FC = () => {
  const [questions, setQuestions] = useState<QuestionData[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedQuestion: QuestionData = useMemo(() => {
    if (!selectedId) {
      /* New blank template */
      return {
        id: uuid(),
        question: '',
        options: ['', '', ''],
      };
    }
    return questions.find((q) => q.id === selectedId)!;
  }, [selectedId, questions]);

  const upsertQuestion = (q: QuestionData) => {
    setQuestions((prev) => {
      const idx = prev.findIndex((x) => x.id === q.id);
      if (idx === -1) return [...prev, q];
      /* Update existing */
      const copy = [...prev];
      copy[idx] = q;
      return copy;
    });
    setSelectedId(q.id);
  };

  const deleteQuestion = (id: string) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
    setSelectedId(null);
  };

  const addNew = () => {
    const newQuestion: QuestionData = {
      id: uuid(),
      question: '',
      options: ['', '', ''],
    };
    setQuestions((prev) => [...prev, newQuestion]);
    setSelectedId(newQuestion.id);
  };

  const addToQuestionBank = () => {
    toast.info('Processing...', { autoClose: 2000 });
    setTimeout(() => {
      toast.success('Successfully Added to Question Bank!', { autoClose: 2000 });
    }, 2000);
  };

  return (
    <div className="add-question-page">
      <ToastContainer />
      {/* ► Side panel */}
      <aside className="sidebar">
        <h3>Questions</h3>
        {questions.length === 0 && (
          <p className="muted">No questions yet. Start by adding one!</p>
        )}

        <ul className="question-list">
          {questions.map((q, idx) => (
            <li
              key={q.id}
              className={q.id === selectedId ? 'active' : undefined}
              onClick={() => setSelectedId(q.id)}
            >
              {`Q${idx + 1}: ${q.question.slice(0, 30) || '(untitled)'}`}
            </li>
          ))}
          <li className="add-btn" onClick={addNew}>
            + New question
          </li>
        </ul>

        <button className="btn primary" onClick={addToQuestionBank}>
          Add to Question Bank
        </button>
      </aside>

      {/* ► Editor */}
      <section className="editor">
        <AddQuestionCard
          data={selectedQuestion}
          onSave={upsertQuestion}
          onDelete={
            selectedId ? () => deleteQuestion(selectedId) : undefined
          }
        />
      </section>
    </div>
  );
};

export default AddQuestionPage;