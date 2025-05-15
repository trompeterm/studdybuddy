import { useState } from 'react';
import { Star } from 'lucide-react';
import './Flashcard.css';

interface FlashcardProps {
    topic: string;
    onClose: () => void;
}

export default function Flashcard({ topic, onClose }: FlashcardProps) {
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
            <div className="card-container" onClick={() => setIsQuestionSide(!isQuestionSide)}>
                <div className={isQuestionSide ? "front" : "back"}>
                    <p className={isQuestionSide ? "show" : ""}>This is the question</p>
                    <p className={isQuestionSide ? "" : "show"}>This is the answer</p>
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
