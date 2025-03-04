import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Demo from './components/Demo';
import LaunchApp from './components/LaunchApp';
import Documentation from './pages/Documentation';
import Pricing from './pages/Pricing';
import Community from './pages/Community';
import HomePage from './pages/HomePage';

// Scroll to section when hash changes
const ScrollToSection = () => {
  const { hash, pathname } = useLocation();
  
  React.useEffect(() => {
    // If there's a hash and we're on the home page
    if (hash && pathname === '/') {
      // Remove the # symbol
      const id = hash.replace('#', '');
      // Find the element with that id
      const element = document.getElementById(id);
      // If the element exists, scroll to it
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If no hash or not on home page, scroll to top
      window.scrollTo(0, 0);
    }
  }, [hash, pathname]);
  
  return null;
};

function App() {
  console.log('App component mounted');
  return (
    <Router>
      <ScrollToSection />
      <div className="min-h-screen bg-black text-white flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/launch" element={<LaunchApp />} />
            <Route path="/docs" element={<Documentation />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/community" element={<Community />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;