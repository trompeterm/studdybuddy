import { useState } from 'react';
import './Quizzes.css';
import Quiz from '../elements/Quiz';
import LoadingSpinner from '../elements/LoadingSpinner';

interface QuizData {
    question: string;
    answer1: string;
    answer2: string;
    answer3: string;
    answer4: string;
    correctAnswer: number;
}

export default function Quizzes() {
    const BASE_URL = import.meta.env.VITE_API_URL;
    const [visibleMath, setVisibleMath] = useState(false);
    const [visibleScience, setVisibleScience] = useState(false);
    const [visibleHistory, setVisibleHistory] = useState(false);
    const [visibleEnglish, setVisibleEnglish] = useState(false);
    const [visibleCoding, setVisibleCoding] = useState(false);
    const [showQuiz, setShowQuiz] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedTopic, setSelectedTopic] = useState('');
    const [quizQuestions, setQuizQuestions] = useState<QuizData[]>([]);
    const [currentQuizIndex, setCurrentQuizIndex] = useState(0);

    const handleTopicClick = async (topic: string) => {
        setSelectedTopic(topic);
        setIsLoading(true);
        await loadQuizQuestions(topic);
        setIsLoading(false);
        setShowQuiz(true);
        setCurrentQuizIndex(0);
    };

    const loadQuizQuestions = async (topic: string) => {
        const response = await fetch(`${BASE_URL}/generate-quiz?topic=${encodeURIComponent(topic)}`);
        const jsonString = await response.json();
        const data = JSON.parse(jsonString);
        setQuizQuestions(data);
    }

    const handleNext = () => {
        if (currentQuizIndex < quizQuestions.length - 1) {
            setCurrentQuizIndex(currentQuizIndex + 1);
        }
    };

    const handleClose = () => {
        setShowQuiz(false);
        setQuizQuestions([]);
        setCurrentQuizIndex(0);
    };

    return (
        <div className="container">
            {showQuiz && quizQuestions.length > 0 ? (
                <Quiz 
                    topic={selectedTopic}
                    question={quizQuestions[currentQuizIndex].question}
                    answer1={quizQuestions[currentQuizIndex].answer1}
                    answer2={quizQuestions[currentQuizIndex].answer2}
                    answer3={quizQuestions[currentQuizIndex].answer3}
                    answer4={quizQuestions[currentQuizIndex].answer4}
                    correctAnswer={quizQuestions[currentQuizIndex].correctAnswer}
                    currentIndex={currentQuizIndex + 1}
                    totalCount={quizQuestions.length}
                    onNext={handleNext}
                    onClose={handleClose}
                    canGoNext={currentQuizIndex < quizQuestions.length - 1}
                />
            ) : isLoading ? (
                <LoadingSpinner />
            ) : (
                <>
                    <h1 className="main-label">I want to quiz myself on...</h1>
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
