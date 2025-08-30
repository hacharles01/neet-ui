import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Registration from './pages/Registration';

function App() {
  return (
    <div className="app-container">
      <Header />
      <Container maxWidth="lg" sx={{ py: 4, minHeight: 'calc(100vh - 200px)' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<Registration />} />
        </Routes>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
