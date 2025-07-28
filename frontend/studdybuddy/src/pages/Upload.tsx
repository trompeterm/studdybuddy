import { useState } from 'react';
import Flashcard from '../elements/Flashcard';
import LoadingSpinner from '../elements/LoadingSpinner';
import './Upload.css';

interface FlashcardData {
    question: string;
    answer: string;
}

export default function Upload() {
    const BASE_URL = import.meta.env.VITE_API_URL;
    const [file, setFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [flashcards, setFlashcards] = useState<FlashcardData[]>([]);
    const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [showFlashcard, setShowFlashcard] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) return;
        setIsLoading(true);
        setError(null);
        setShowFlashcard(false);
        setFlashcards([]);
        setCurrentFlashcardIndex(0);
        try {
            const formData = new FormData();
            formData.append('file', file);
            const response = await fetch(`${BASE_URL}/flashcard-from-pdf`, {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                const data = await response.json();
                let flashcardArray = data;
                if (typeof data === 'string') {
                    flashcardArray = JSON.parse(data);
                }
                setFlashcards(flashcardArray);
                setShowFlashcard(true);
            } else {
                setError('Failed to generate flashcards.');
            }
        } catch {
            setError('Error uploading file.');
        } finally {
            setIsLoading(false);
        }
    };

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
        <>
            <div className="upload-container">
                <h1 className="upload-title">Upload PDF to Generate Flashcards</h1>
                <input type="file" accept="application/pdf" onChange={handleFileChange} className="upload-input" />
                <button onClick={handleUpload} disabled={!file || isLoading} className="upload-btn">
                    Generate Flashcards
                </button>
                {isLoading && <LoadingSpinner />}
                {error && <div className="upload-error">{error}</div>}
            </div>
            {showFlashcard && flashcards.length > 0 && (
                <div className="upload-flashcard">
                    <Flashcard
                        topic={file ? file.name : 'PDF'}
                        question={flashcards[currentFlashcardIndex].question}
                        answer={flashcards[currentFlashcardIndex].answer}
                        currentIndex={currentFlashcardIndex + 1}
                        totalCount={flashcards.length}
                        onNext={handleNext}
                        onClose={handleClose}
                        canGoNext={currentFlashcardIndex < flashcards.length - 1}
                    />
                </div>
            )}
        </>
    );
}
