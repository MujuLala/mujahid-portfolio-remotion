import React from 'react';
import {Composition} from 'remotion';
import {Portfolio} from './Video';
import {W, H, FPS, DUR} from './lib';

export const RemotionRoot: React.FC = () => (
	<Composition id="MujahidReel" component={Portfolio} durationInFrames={DUR} fps={FPS} width={W} height={H} />
);
