import { useState } from 'react';
import { Star } from 'lucide-react';
import './Flashcard.css';

interface FlashcardProps {
    topic: string;
    question: string;
    answer: string;
    onClose: () => void;
}

export default function Flashcard({ topic, question, answer, onClose }: FlashcardProps) {
    const [isQuestionSide, setIsQuestionSide] = useState(true);

    return (
        <div className="content-container">
            <div className="info-container">
                <h3>{topic}</h3>
                <ul>
                    <li><label>Card #/#</label></li>
                    <li><Star>Star</Star></li>
                </ul>
            </div>
            <div className={`card-container ${!isQuestionSide ? 'flipped' : ''}`} onClick={() => setIsQuestionSide(!isQuestionSide)}>
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
                    <button>Next</button>
                </ul>
            </div>
        </div>
    );
}
