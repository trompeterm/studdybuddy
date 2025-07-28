import { useState } from 'react';
import './Flashcards.css';
import Flashcard from '../elements/Flashcard';
import LoadingSpinner from '../elements/LoadingSpinner';

interface FlashcardData {
    question: string;
    answer: string;
}

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
    const [flashcards, setFlashcards] = useState<FlashcardData[]>([]);
    const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);

    const handleTopicClick = async (topic: string) => {
        setSelectedTopic(topic);
        setIsLoading(true);
        await loadFlashcards(topic);
        setIsLoading(false);
        setShowFlashcard(true);
        setCurrentFlashcardIndex(0);
    };

    const loadFlashcards = async (topic: string) => {
        const response = await fetch(`${BASE_URL}/generate-flashcard?topic=${encodeURIComponent(topic)}`);
        const jsonString = await response.json();
        const data = JSON.parse(jsonString);
        setFlashcards(data);
    }

    const handleNext = () => {
        if (currentFlashcardIndex < flashcards.length - 1) {
            setCurrentFlashcardIndex(currentFlashcardIndex + 1);
        }
    };

    const handleClose = () => {
        setShowFlashcard(false);
        setFlashcards([]);
        setCurrentFlashcardIndex(0);
    };

    return (
        <div className="container">
            {showFlashcard && flashcards.length > 0 ? (
                <Flashcard 
                    topic={selectedTopic} 
                    question={flashcards[currentFlashcardIndex].question} 
                    answer={flashcards[currentFlashcardIndex].answer} 
                    currentIndex={currentFlashcardIndex + 1}
                    totalCount={flashcards.length}
                    onNext={handleNext}
                    onClose={handleClose}
                    canGoNext={currentFlashcardIndex < flashcards.length - 1}
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
