import React, { useState } from 'react';
import './addQuestionCard.scss';

export interface QuestionData {
  id: string;
  question: string;
  options: [string, string, string];
  category?: string;
  correctAnswer?: string;
  explanation?: string;
}

interface AddQuestionCardProps {
  data: QuestionData;
  onSave: (q: QuestionData) => void;
  onDelete?: () => void;
}

const categoryChoices = [
  '',
  'Mathematics',
  'Environment',
  'Sinhala',
  'English',
  'Tamil',
] as const;

const AddQuestionCard: React.FC<AddQuestionCardProps> = ({
  data,
  onSave,
  onDelete,
}) => {

  const [question, setQuestion] = useState<string>(data.question ?? '');
  const [options, setOptions] = useState<[string, string, string]>(
    data.options.length
      ? (data.options as [string, string, string])
      : ['', '', ''],
  );
  const [category, setCategory] = useState<string>(data.category ?? '');
  const [correctAnswer, setCorrectAnswer] = useState<string>(
    data.correctAnswer ?? '',
  );
  const [explanation, setExplanation] = useState<string>(
    data.explanation ?? '',
  );

  const handleOptionChange = (idx: number, value: string) => {
    setOptions((prev) => {
      const copy = [...prev] as [string, string, string];
      copy[idx] = value;
      return copy;
    });
  };

  const submit = () => {
    const trimmedOptions = options.map((o) => o.trim()) as [
      string,
      string,
      string,
    ];

    const payload: QuestionData = {
      id: data.id,
      question: question.trim(),
      options: trimmedOptions,
      category: category || undefined,
      correctAnswer: correctAnswer.trim() || undefined,
      explanation: explanation.trim() || undefined,
    };
    onSave(payload);
  };

  return (
    <div className="add-question-card">
      <h2 className="title">Question Editor</h2>

      {/* ► Question */}
      <div className="form-group">
        <label>
          Question<span className="req">*</span>
        </label>
        <textarea
          required
          rows={2}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
      </div>

      {/* ► Options */}
      <div className="form-group">
        <label>
          Options<span className="req">*</span>
        </label>
        {[0, 1, 2].map((idx) => (
          <input
            key={idx}
            type="text"
            placeholder={`Option ${idx + 1}`}
            required
            value={options[idx]}
            onChange={(e) => handleOptionChange(idx, e.target.value)}
          />
        ))}
      </div>

      {/* ► Category */}
      <div className="form-group">
        <label>Category (optional)</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categoryChoices.map((c) => (
            <option key={c} value={c}>
              {c === '' ? '— Select category —' : c}
            </option>
          ))}
        </select>
      </div>

      {/* ► Correct answer */}
      <div className="form-group">
        <label>Correct answer (optional)</label>
        <input
          type="text"
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
        />
      </div>

      {/* ► Explanation */}
      <div className="form-group">
        <label>Explanation (optional)</label>
        <textarea
          rows={3}
          value={explanation}
          onChange={(e) => setExplanation(e.target.value)}
        />
      </div>

      {/* ► Actions */}
      <div className="actions">
        <button className="btn primary" onClick={submit}>
          Save question
        </button>
        {onDelete && (
          <button className="btn danger" onClick={onDelete}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default AddQuestionCard;
