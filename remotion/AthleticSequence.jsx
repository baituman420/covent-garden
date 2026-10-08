import React from 'react';
import { Sequence } from 'remotion';
import { SceneA_Energy } from './scenes/SceneA_Energy.jsx';
import { SceneB_PlayerIntro } from './scenes/SceneB_PlayerIntro.jsx';
import { SceneC_Shot } from './scenes/SceneC_Shot.jsx';
import { SceneD_Impact } from './scenes/SceneD_Impact.jsx';
import { SceneE_Pride } from './scenes/SceneE_Pride.jsx';

export const AthleticSequence = ({
  title = "AQUÍ SE VIVE EL ATHLETIC",
  subtitle = "COVENT GARDEN · BILBAO",
  venue = "Doctor Areilza 28 · Indautxu",
}) => {
  return (
    <div style={{ flex: 1, backgroundColor: '#000000', position: 'relative' }}>
      <Sequence from={0} durationInFrames={45}>
        <SceneA_Energy />
      </Sequence>

      <Sequence from={40} durationInFrames={55}>
        <SceneB_PlayerIntro />
      </Sequence>

      <Sequence from={90} durationInFrames={60}>
        <SceneC_Shot />
      </Sequence>

      <Sequence from={145} durationInFrames={45}>
        <SceneD_Impact />
      </Sequence>

      <Sequence from={185} durationInFrames={55}>
        <SceneE_Pride title={title} subtitle={subtitle} venue={venue} />
      </Sequence>
    </div>
  );
};
