import { useState } from 'react';
import './Flashcards.css';
import Flashcard from '../elements/Flashcard';
import LoadingSpinner from '../elements/LoadingSpinner';

export default function Flashcards() {
    const BASE_URL = import.meta.env.VITE_API_URL;
    const [visibleMath, setVisibleMath] = useState(false);
    const [visibleScience, setVisibleScience] = useState(false);
    const [visibleHistory, setVisibleHistory] = useState(false);
    const [visibleEnglish, setVisibleEnglish] = useState(false);
    const [visibleCoding, setVisibleCoding] = useState(false);
    const [showFlashcard, setShowFlashcard] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedTopic, setSelectedTopic] = useState('');
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    const handleTopicClick = async (topic: string) => {
        setSelectedTopic(topic);
        setIsLoading(true);
        await loadFlashcard(topic);
        setIsLoading(false);
        setShowFlashcard(true);
    };

    const loadFlashcard = async (topic: string) => {
        const response = await fetch(`${BASE_URL}/generate-flashcard?topic=${encodeURIComponent(topic)}`);
        const jsonString = await response.json();
        const data = JSON.parse(jsonString);
        setQuestion(data.question);
        setAnswer(data.answer);
    }

    return (
        <div className="container">
            {showFlashcard ? (
                <Flashcard 
                    topic={selectedTopic} 
                    question={question} 
                    answer={answer} 
                    onClose={() => setShowFlashcard(false)}
                />
            ) : isLoading ? (
                <LoadingSpinner />
            ) : (
                <>
                    <h1 className="main-label">I want to study...</h1>
                    <div className="input-container">
                        <div className="input-group">
                            <button onClick={() => setVisibleMath(!visibleMath)}>Math</button>
                            <ul className={visibleMath ? 'visible' : ""}>
                                <li><button onClick={() => handleTopicClick('Algebra')}>Algebra</button></li>
                                <li><button onClick={() => handleTopicClick('Geometry')}>Geometry</button></li>
                                <li><button onClick={() => handleTopicClick('Calculus')}>Calculus</button></li>
                            </ul>
                        </div>
                        <div className="input-group">
                            <button onClick={() => setVisibleScience(!visibleScience)}>Science</button>
                            <ul className={visibleScience ? 'visible' : ""}>
                                <li><button onClick={() => handleTopicClick('Physics')}>Physics</button></li>
                                <li><button onClick={() => handleTopicClick('Chemistry')}>Chemistry</button></li>
                                <li><button onClick={() => handleTopicClick('Biology')}>Biology</button></li>
                            </ul>
                        </div>
                        <div className="input-group">
                            <button onClick={() => setVisibleHistory(!visibleHistory)}>History</button>
                            <ul className={visibleHistory ? 'visible' : ""}>
                                <li><button onClick={() => handleTopicClick('World History')}>World History</button></li>
                                <li><button onClick={() => handleTopicClick('US History')}>US History</button></li>
                                <li><button onClick={() => handleTopicClick('European History')}>European History</button></li>
                            </ul>
                        </div>
                        <div className="input-group">
                            <button onClick={() => setVisibleEnglish(!visibleEnglish)}>English</button>
                            <ul className={visibleEnglish ? 'visible' : ""}>
                                <li><button onClick={() => handleTopicClick('Literature')}>Literature</button></li>
                                <li><button onClick={() => handleTopicClick('Grammar')}>Grammar</button></li>
                                <li><button onClick={() => handleTopicClick('Writing')}>Writing</button></li>
                            </ul>
                        </div>
                        <div className="input-group">
                            <button onClick={() => setVisibleCoding(!visibleCoding)}>Coding</button>
                            <ul className={visibleCoding ? 'visible' : ""}>
                                <li><button onClick={() => handleTopicClick('Python')}>Python</button></li>
                                <li><button onClick={() => handleTopicClick('SQL')}>SQL</button></li>
                                <li><button onClick={() => handleTopicClick('Java')}>Java</button></li>
                            </ul>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
