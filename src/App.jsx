import React from 'react';
import './styles/main.css';

import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import ElPub from './components/ElPub.jsx';
import CartaCompleta from './components/CartaCompleta.jsx';
import Especialidades from './components/Especialidades.jsx';
import Athletic from './components/Athletic.jsx';
import GruposBloque from './components/GruposBloque.jsx';
import Barra from './components/Barra.jsx';
import ComerBeber from './components/ComerBeber.jsx';
import Galeria from './components/Galeria.jsx';
import InstagramLocation from './components/InstagramLocation.jsx';
import Footer from './components/Footer.jsx';
import NavidadModal from './components/NavidadModal.jsx';

export default function App() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ width: '100%', paddingTop: '5rem', flex: 1 }}>
        <Hero />
        <ElPub />
        <CartaCompleta />
        <Especialidades />
        <Athletic />
        <GruposBloque />
        <Barra />
        <ComerBeber />
        <Galeria />
        <InstagramLocation />
      </main>
      <Footer />
      {/* Ventana emergente con los menús de Navidad y Katxopo (activa hasta enero) */}
      <NavidadModal />
    </div>
  );
}
