import React from 'react';
import { Composition } from 'remotion';
import { AthleticSequence } from './AthleticSequence.jsx';

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="AthleticPromo"
        component={AthleticSequence}
        durationInFrames={240}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          title: "AQUÍ SE VIVE EL ATHLETIC",
          subtitle: "COVENT GARDEN · BILBAO",
          venue: "Doctor Areilza 28 · Indautxu",
        }}
      />
      <Composition
        id="AthleticPromoMobile"
        component={AthleticSequence}
        durationInFrames={240}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          title: "AQUÍ SE VIVE EL ATHLETIC",
          subtitle: "COVENT GARDEN · BILBAO",
          venue: "Doctor Areilza 28 · Indautxu",
        }}
      />
    </>
  );
};
