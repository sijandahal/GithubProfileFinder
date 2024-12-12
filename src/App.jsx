import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import ProfileCard from './components/ProfileCard';
import HomePage from './pages/HomePage';

function App() {
  const [userData, setUserData] = useState(null);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage setUserData={setUserData} />} />
          <Route path="/profile/:username" element={<ProfileCard userData={userData} />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
