import './Flashcard.css';
import { useState } from 'react';
import { Star } from 'lucide-react';
import { useAuth0 } from '@auth0/auth0-react';

interface FlashcardProps {
    topic: string;
    question: string;
    answer: string;
    currentIndex: number;
    totalCount: number;
    onNext: () => void;
    onClose: () => void;
    canGoNext: boolean;
}

export default function Flashcard({ 
    topic, 
    question, 
    answer, 
    currentIndex, 
    totalCount, 
    onNext, 
    onClose, 
    canGoNext
}: FlashcardProps) {

    const BASE_URL = import.meta.env.VITE_API_URL;
    const [isFlipped, setIsFlipped] = useState(false);
    const [isStarred, setIsStarred] = useState(false);
    const { user, isAuthenticated } = useAuth0();

    const handleClick = () => {
        setIsFlipped(!isFlipped);
    };

    const handleStarClick = async (e: React.MouseEvent) => {
        e.stopPropagation();
        
        if (!isAuthenticated) {
            alert('Please log in to save flashcards');
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
            setIsStarred(false);
        }
    };

    const handleNext = () => {
        if (canGoNext) {
            setIsFlipped(false);
            setIsStarred(false);
            onNext();
        }
    };

    return (
        <div className="content-container">
            <div className="info-container">
                <h3>{topic}</h3>
                <div className="flashcard-counter">
                    {currentIndex} / {totalCount}
                </div>
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
                <button 
                    onClick={handleNext} 
                    disabled={!canGoNext}
                    className={!canGoNext ? 'disabled' : ''}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
