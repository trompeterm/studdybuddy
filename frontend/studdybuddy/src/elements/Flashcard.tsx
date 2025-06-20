import './Flashcard.css';
import { useState } from 'react';
import { Star } from 'lucide-react';

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

    const handleClick = () => {
        setIsFlipped(!isFlipped);
    };

    const handleNext = () => {
        setIsFlipped(false);
        onNext();
    };

    const handleStarClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsStarred(!isStarred);
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
