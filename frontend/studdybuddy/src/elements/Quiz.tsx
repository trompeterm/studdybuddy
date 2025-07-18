import './Quiz.css';
import { useState } from 'react';
import { Star } from 'lucide-react';
import { useAuth0 } from '@auth0/auth0-react';

interface QuizProps {
    topic: string;
    question: string;
    answer1: string;
    answer2: string;
    answer3: string;
    answer4: string;
    correctAnswer: number;
    onClose: () => void;
}

export default function Quiz( { 
    topic, 
    question, 
    answer1, 
    answer2, 
    answer3, 
    answer4, 
    correctAnswer, 
    onClose
}: QuizProps) {
    const BASE_URL = import.meta.env.VITE_API_URL;
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [isStarred, setIsStarred] = useState(false);
    const { user, isAuthenticated } = useAuth0();

    const handleAnswerClick = (answerIndex: number) => {
        setSelectedAnswer(answerIndex);
    };

    const handleStarClick = async (e: React.MouseEvent) => {
        e.stopPropagation();
        
        if (!isAuthenticated) {
            alert('Please log in to save quiz questions');
            return;
        }

        if (!isStarred) {
            try {
                const response = await fetch(`${BASE_URL}/save-flashcard`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        question: question,
                        answer: `Correct Answer: ${correctAnswer === 1 ? answer1 : correctAnswer === 2 ? answer2 : correctAnswer === 3 ? answer3 : answer4}`,
                        user_id: user?.email || user?.sub || 'unknown'
                    })
                });

                if (response.ok) {
                    setIsStarred(true);
                    console.log('Quiz question saved successfully');
                } else {
                    console.error('Failed to save quiz question');
                }
            } catch (error) {
                console.error('Error saving quiz question:', error);
            }
        } else {
            setIsStarred(false);
        }
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
                <div onClick={handleStarClick} style={{ cursor: 'pointer' }}>
                    <Star fill={isStarred ? 'currentColor' : 'none'} />
                </div>
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
            </div>
        </div>
    );
}