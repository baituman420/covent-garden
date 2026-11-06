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
import BarraPintxos from './components/BarraPintxos.jsx';
import Galeria from './components/Galeria.jsx';
import InstagramLocation from './components/InstagramLocation.jsx';
import Footer from './components/Footer.jsx';
import NavidadModal from './components/NavidadModal.jsx';

export default function App() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main id="main-content" tabIndex="-1" style={{ width: '100%', paddingTop: '5rem', flex: 1, outline: 'none' }}>
        <Hero />
        <ElPub />
        <CartaCompleta />
        <Especialidades />
        <Athletic />
        <GruposBloque />
        <Barra />
        <BarraPintxos />
        <Galeria />
        <InstagramLocation />
      </main>
      <Footer />
      {/* Ventana emergente con los menús de Navidad y Katxopo (activa hasta enero) */}
      <NavidadModal />
    </div>
  );
}
