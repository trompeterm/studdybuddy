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

    const handleClick = () => {
        setIsFlipped(!isFlipped);
    };

    const handleNext = () => {
        setIsFlipped(false);
        onNext();
    };

    return (
        <div className="content-container">
            <div className="info-container">
                <h3>{topic}</h3>
                <p>Card {cardNumber}/{totalCards}</p>
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
