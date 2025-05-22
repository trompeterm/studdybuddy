import './Quiz.css';
import { useState } from 'react';

interface QuizProps {
    topic: string;
    question: string;
    answer1: string;
    answer2: string;
    answer3: string;
    answer4: string;
    correctAnswer: number;
    onClose: () => void;
    onNext: () => void;
    questionNumber: number;
    totalQuestions: number;
}

export default function Quiz( { 
    topic, 
    question, 
    answer1, 
    answer2, 
    answer3, 
    answer4, 
    correctAnswer, 
    onClose, 
    onNext,
    questionNumber,
    totalQuestions 
}: QuizProps) {
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

    const handleAnswerClick = (answerIndex: number) => {
        setSelectedAnswer(answerIndex);
    };

    const handleNext = () => {
        setSelectedAnswer(null);
        onNext();
    };

    const getAnswerClass = (answerIndex: number) => {
        if (selectedAnswer === null) return '';
        if (answerIndex === correctAnswer) return 'correct';
        if (selectedAnswer === answerIndex) return 'incorrect';
        return '';
    };

    return (
        <div className="quiz-container">
            <div className="quiz-info">
                <h3>{topic}</h3>
                <p>Question {questionNumber}/{totalQuestions}</p>
            </div>
            <div className="question-container">
                <p>{question}</p>
                <ul>
                    <li><button 
                        className={getAnswerClass(1)}
                        onClick={() => handleAnswerClick(1)}
                    >{answer1}</button></li>
                    <li><button 
                        className={getAnswerClass(2)}
                        onClick={() => handleAnswerClick(2)}
                    >{answer2}</button></li>
                    <li><button 
                        className={getAnswerClass(3)}
                        onClick={() => handleAnswerClick(3)}
                    >{answer3}</button></li>
                    <li><button 
                        className={getAnswerClass(4)}
                        onClick={() => handleAnswerClick(4)}
                    >{answer4}</button></li>
                </ul>
            </div>
            <div className="quiz-controls">
                <button onClick={onClose}>Close</button>
                <ul>
                    <button>Previous</button>
                    <button onClick={handleNext}>Next</button>
                </ul>
            </div>
        </div>
    );
}