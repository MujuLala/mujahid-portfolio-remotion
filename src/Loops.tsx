import React from 'react';
import {W, H, INK, GREEN, loop, p, SETTLE, EASE} from './lib';

const TAU = Math.PI * 2;

/** Grid drifts exactly one cell per loop -> seamless. */
export const LoopingGrid: React.FC<{frame: number; opacity?: number; cell?: number; loopDur?: number}> = ({
	frame,
	opacity = 0.55,
	cell = 80,
	loopDur = 240,
}) => {
	const off = loop(frame, loopDur) * cell;
	const c = 'rgba(13,13,13,0.07)';
	return (
		<div
			style={{
				position: 'absolute',
				inset: -cell * 2,
				opacity,
				backgroundImage: `linear-gradient(to right, ${c} 1px, transparent 1px), linear-gradient(to bottom, ${c} 1px, transparent 1px)`,
				backgroundSize: `${cell}px ${cell}px`,
				backgroundPosition: `${off}px ${-off}px`,
			}}
		/>
	);
};

const BASE: [number, number, number, number][] = [
	// x, y, phase, integer-cycles
	[180, 200, 0.0, 1],
	[520, 120, 0.2, 2],
	[900, 260, 0.5, 1],
	[1380, 140, 0.7, 2],
	[1760, 240, 0.3, 1],
	[260, 820, 0.9, 2],
	[700, 930, 0.4, 1],
	[1240, 880, 0.1, 2],
	[1700, 780, 0.6, 1],
];

/** Nodes orbit on integer-cycle paths; edges fade by distance. */
export const LoopingVectorNetwork: React.FC<{frame: number; opacity?: number; loopDur?: number}> = ({
	frame,
	opacity = 0.6,
	loopDur = 360,
}) => {
	const t = loop(frame, loopDur);
	const pts = BASE.map(([x, y, ph, k]) => ({
		x: x + 22 * Math.sin(TAU * (t * k + ph)),
		y: y + 18 * Math.cos(TAU * (t * k + ph)),
	}));
	const edges: React.ReactNode[] = [];
	for (let i = 0; i < pts.length; i++) {
		for (let j = i + 1; j < pts.length; j++) {
			const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
			if (d < 560) {
				edges.push(
					<line
						key={`${i}-${j}`}
						x1={pts[i].x}
						y1={pts[i].y}
						x2={pts[j].x}
						y2={pts[j].y}
						stroke={INK}
						strokeWidth={1}
						opacity={(1 - d / 560) * 0.35}
					/>
				);
			}
		}
	}
	return (
		<svg width={W} height={H} style={{position: 'absolute', inset: 0, opacity}}>
			{edges}
			{pts.map((q, i) => (
				<circle key={i} cx={q.x} cy={q.y} r={i % 4 === 0 ? 4 : 2.5} fill={i % 4 === 0 ? GREEN : INK} opacity={0.7} />
			))}
		</svg>
	);
};

/** Long thin curves with a travelling dash; dash period divides the offset travel exactly. */
export const LoopingLines: React.FC<{frame: number; opacity?: number; loopDur?: number}> = ({
	frame,
	opacity = 0.22,
	loopDur = 300,
}) => {
	const t = loop(frame, loopDur);
	const paths = [
		'M-40 300 C 500 160, 1000 520, 1960 360',
		'M-40 760 C 480 900, 1100 620, 1960 820',
		'M-40 520 C 600 420, 1200 640, 1960 560',
	];
	return (
		<svg width={W} height={H} style={{position: 'absolute', inset: 0, opacity}}>
			{paths.map((d, i) => (
				<path
					key={i}
					d={d}
					fill="none"
					stroke={INK}
					strokeWidth={1}
					pathLength={1440}
					strokeDasharray="160 560"
					strokeDashoffset={-t * 720 * (i % 2 === 0 ? 1 : 2) * (i === 1 ? -1 : 1)}
				/>
			))}
		</svg>
	);
};

/** A few tiny orbiting dots (deterministic, tiny radius). */
export const LoopingParticles: React.FC<{frame: number; opacity?: number; loopDur?: number}> = ({
	frame,
	opacity = 0.5,
	loopDur = 420,
}) => {
	const t = loop(frame, loopDur);
	return (
		<svg width={W} height={H} style={{position: 'absolute', inset: 0, opacity}}>
			{Array.from({length: 12}).map((_, i) => {
				const x = (i * 331 + 120) % W;
				const y = (i * 197 + 90) % H;
				const ph = (i * 0.137) % 1;
				return (
					<circle
						key={i}
						cx={x + 14 * Math.sin(TAU * (t + ph))}
						cy={y + 18 * Math.cos(TAU * (t + ph))}
						r={1.6}
						fill={INK}
					/>
				);
			})}
		</svg>
	);
};

export type Chip = {label: string; x: number; y: number; at: number};

/** Floating UI chips: float 3px on an integer-cycle loop, enter/exit via mask + scale. */
export const LoopingUI: React.FC<{frame: number; chips: Chip[]; exitAt: number; loopDur?: number}> = ({
	frame,
	chips,
	exitAt,
	loopDur = 180,
}) => {
	const t = loop(frame, loopDur);
	return (
		<>
			{chips.map((c, i) => {
				const enter = p(frame, c.at, c.at + 22, SETTLE);
				const exit = p(frame, exitAt + i * 3, exitAt + 22 + i * 3, EASE);
				const vis = Math.max(0, Math.min(1, enter)) * (1 - exit);
				if (vis <= 0.001) return null;
				return (
					<div
						key={c.label}
						style={{
							position: 'absolute',
							left: c.x,
							top: c.y + 3 * Math.sin(TAU * (t + i * 0.25)),
							opacity: vis,
							transform: `scale(${0.96 + 0.04 * enter})`,
							clipPath: `inset(0 ${(1 - Math.min(1, enter)) * 100}% 0 0)`,
							padding: '12px 22px',
							background: '#fff',
							border: '1px solid rgba(13,13,13,0.14)',
							borderRadius: 999,
							fontSize: 22,
							fontWeight: 600,
							letterSpacing: '0.02em',
							color: INK,
							display: 'flex',
							alignItems: 'center',
							gap: 10,
							whiteSpace: 'nowrap',
						}}
					>
						<span style={{width: 8, height: 8, borderRadius: 8, background: GREEN}} />
						{c.label}
					</div>
				);
			})}
		</>
	);
};
