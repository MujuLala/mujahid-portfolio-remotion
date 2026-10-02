import {interpolate, Easing} from 'remotion';

export const W = 1920;
export const H = 1080;
export const FPS = 30;
export const DUR = 1080; // 36s — first frame === last frame state

export const INK = '#0d0d0d';
export const PAPER = '#f5f5f1';
export const GREEN = '#2fb36a';
export const GREY = '#b9b9b3';
export const DARK = '#1f1f1f';

// Premium easing set
export const EASE = Easing.bezier(0.65, 0, 0.35, 1); // slow-fast-slow
export const OUT = Easing.bezier(0.16, 1, 0.3, 1); // fast -> slow
export const SOFT = Easing.bezier(0.45, 0, 0.15, 1);
export const SETTLE = Easing.bezier(0.34, 1.18, 0.64, 1); // tiny overshoot, settles

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

export const p = (f: number, a: number, b: number, easing = EASE) =>
	interpolate(f, [a, b], [0, 1], {...clamp, easing});

export const kf = (f: number, frames: number[], values: number[], easing = EASE) =>
	interpolate(f, frames, values, {...clamp, easing});

export const loop = (f: number, d: number) => (f % d) / d;
