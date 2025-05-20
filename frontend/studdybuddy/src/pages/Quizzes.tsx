import { useState } from 'react';
import './Quizzes.css';
import Quiz from '../elements/Quiz';
import LoadingSpinner from '../elements/LoadingSpinner';

export default function Quizzes() {
    const [visibleMath, setVisibleMath] = useState(false);
    const [visibleScience, setVisibleScience] = useState(false);
    const [visibleHistory, setVisibleHistory] = useState(false);
    const [visibleEnglish, setVisibleEnglish] = useState(false);
    const [visibleCoding, setVisibleCoding] = useState(false);
    const [showQuiz, setShowQuiz] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedTopic, setSelectedTopic] = useState('');
    const [quizData, setQuizData] = useState({
        topic: '',
        question: '',
        answer1: '',
        answer2: '',
        answer3: '',
        answer4: '',
        correctAnswer: 1
    });

    const handleTopicClick = async (topic: string) => {
        setSelectedTopic(topic);
        setIsLoading(true);
        await loadQuiz(topic);
        setIsLoading(false);
        setShowQuiz(true);
    };

    const loadQuiz = async (topic: string) => {
        const response = await fetch(`http://127.0.0.1:8000/generate-quiz?topic=${encodeURIComponent(topic)}`);
        const jsonString = await response.json();
        const data = JSON.parse(jsonString);
        setQuizData({
            topic: topic,
            question: data.question,
            answer1: data.answer1,
            answer2: data.answer2,
            answer3: data.answer3,
            answer4: data.answer4,
            correctAnswer: data.correctAnswer
        });
    }

    return (
        <div className="container">
            {showQuiz ? (
                <Quiz 
                    topic={quizData.topic}
                    question={quizData.question}
                    answer1={quizData.answer1}
                    answer2={quizData.answer2}
                    answer3={quizData.answer3}
                    answer4={quizData.answer4}
                    correctAnswer={quizData.correctAnswer}
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
