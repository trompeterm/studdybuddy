import { useState } from 'react';
import './Flashcards.css';
import Flashcard from '../elements/Flashcard';

export default function Flashcards() {
    const [visibleMath, setVisibleMath] = useState(false);
    const [visibleScience, setVisibleScience] = useState(false);
    const [visibleHistory, setVisibleHistory] = useState(false);
    const [visibleEnglish, setVisibleEnglish] = useState(false);
    const [visibleCoding, setVisibleCoding] = useState(false);
    const [showFlashcard, setShowFlashcard] = useState(false);
    const [selectedTopic, setSelectedTopic] = useState('');

    const handleTopicClick = (topic: string) => {
        setSelectedTopic(topic);
        setShowFlashcard(true);
    };

    return (
        <div className="container">
            {showFlashcard ? (
                <Flashcard topic={selectedTopic} onClose={() => setShowFlashcard(false)} />
            ) : (
                <>
                    <h1 className="main-label">I want to studdy...</h1>
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
