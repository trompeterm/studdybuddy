import './Flashcard.css';
import { useState } from 'react';
import { Star } from 'lucide-react';
import { useAuth0 } from '@auth0/auth0-react';

interface FlashcardProps {
    topic: string;
    question: string;
    answer: string;
    onClose: () => void;
    onNext: () => void;
    cardNumber: number;
    totalCards: number;
}

export default function Flashcard({ topic, question, answer, onClose, onNext, cardNumber, totalCards }: FlashcardProps) {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isStarred, setIsStarred] = useState(false);
    const { user, isAuthenticated } = useAuth0();

    const handleClick = () => {
        setIsFlipped(!isFlipped);
    };

    const handleNext = () => {
        setIsFlipped(false);
        onNext();
    };

    const handleStarClick = async (e: React.MouseEvent) => {
        e.stopPropagation();
        
        if (!isAuthenticated) {
            alert('Please log in to save flashcards');
            return;
        }

        if (!isStarred) {
            try {
                const response = await fetch('http://127.0.0.1:8000/save-flashcard', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        question: question,
                        answer: answer,
                        user_id: user?.email || user?.sub || 'unknown'
                    })
                });

                if (response.ok) {
                    setIsStarred(true);
                    console.log('Flashcard saved successfully');
                } else {
                    console.error('Failed to save flashcard');
                }
            } catch (error) {
                console.error('Error saving flashcard:', error);
            }
        } else {
            // If already starred, we could implement unstarring logic here
            // For now, we'll just toggle the local state
            setIsStarred(false);
        }
    };

    return (
        <div className="content-container">
            <div className="info-container">
                <h3>{topic}</h3>
                <div onClick={handleStarClick} style={{ cursor: 'pointer' }}>
                    <Star fill={isStarred ? 'currentColor' : 'none'} />
                </div>
            </div>
            <div className={`card-container ${isFlipped ? 'flipped' : ''}`} onClick={handleClick}> 
                <div className="front">
                    <p className="show">{question}</p>
                </div>
                <div className="back">
                    <p className="show">{answer}</p>
                </div>
            </div>
            <div className="button-container">
                <button onClick={onClose}>Close</button>
                <ul>
                    <button>Previous</button>
                    <button onClick={handleNext}>Next</button>
                </ul>
            </div>
        </div>
    );
}
