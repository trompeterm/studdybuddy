import { useState } from 'react';
import Flashcard from '../elements/Flashcard';
import LoadingSpinner from '../elements/LoadingSpinner';
import './Upload.css';

export default function Upload() {
    const [file, setFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [flashcard, setFlashcard] = useState<{ question: string; answer: string } | null>(null);
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
        setFlashcard(null);
        try {
            const formData = new FormData();
            formData.append('file', file);
            const response = await fetch('http://127.0.0.1:8000/flashcard-from-pdf', {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                const data = await response.json();
                let flashcardObj = data;
                if (typeof data === 'string') {
                    flashcardObj = JSON.parse(data);
                }
                setFlashcard({
                    question: flashcardObj.question,
                    answer: flashcardObj.answer,
                });
                setShowFlashcard(true);
            } else {
                setError('Failed to generate flashcard.');
            }
        } catch (err) {
            setError('Error uploading file.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="upload-container">
            <h1 className="upload-title">Upload PDF to Generate Flashcard</h1>
            <input type="file" accept="application/pdf" onChange={handleFileChange} className="upload-input" />
            <button onClick={handleUpload} disabled={!file || isLoading} className="upload-btn">
                Generate Flashcard
            </button>
            {isLoading && <LoadingSpinner />}
            {error && <div className="upload-error">{error}</div>}
            {showFlashcard && flashcard && (
                <div className="upload-flashcard">
                    <Flashcard
                        topic={file ? file.name : 'PDF'}
                        question={flashcard.question}
                        answer={flashcard.answer}
                        onClose={() => setShowFlashcard(false)}
                    />
                </div>
            )}
        </div>
    );
}
