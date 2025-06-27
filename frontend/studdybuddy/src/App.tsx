import './App.css'
import Navbar from './elements/Navbar'
import Flashcards from './pages/Flashcards'
import Home from './pages/Home'
import Quizzes from './pages/Quizzes'
import Upload from './pages/Upload'
import SavedFlashcards from './pages/SavedFlashcards'
import { Routes, Route } from 'react-router-dom'
import favicon from './assets/studdybuddy.png'
import Account from './pages/Account'

function setFavicon(url: string) {
  let link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }
  link.href = url;
}

function App() {
  setFavicon(favicon);
  return (
    <>
    <title>StuddyBuddy</title>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/flashcard" element={<Flashcards />} />
        <Route path="/quiz" element={<Quizzes />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/account" element={<Account />} />
        <Route path="/saved" element={<SavedFlashcards />} />
      </Routes>
    </>
  )
}

export default App
