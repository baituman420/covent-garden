import React from 'react';
import './styles/main.css';

import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import ElPub from './components/ElPub.jsx';
import ComerBeber from './components/ComerBeber.jsx';
import Barra from './components/Barra.jsx';
import Deporte from './components/Deporte.jsx';
import Galeria from './components/Galeria.jsx';
import InstagramLocation from './components/InstagramLocation.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ width: '100%', paddingTop: '5rem', flex: 1 }}>
        <Hero />
        <ElPub />
        <ComerBeber />
        <Barra />
        <Deporte />
        <Galeria />
        <InstagramLocation />
      </main>
      <Footer />
    </div>
  );
}
