import React from 'react';
import {AbsoluteFill, Img, staticFile, useCurrentFrame} from 'remotion';
import {loadFont as loadMont} from '@remotion/google-fonts/Montserrat';
import {loadFont as loadKr} from '@remotion/google-fonts/NotoSansKR';
import {W, H, DUR, INK, PAPER, GREEN, GREY, DARK, EASE, OUT, SOFT, p, kf, loop} from './lib';
import {LoopingGrid, LoopingVectorNetwork, LoopingParticles, LoopingUI, Chip} from './Loops';

const mont = loadMont('normal', {weights: ['200', '400', '600', '800'], subsets: ['latin']}).fontFamily;
const kr = loadKr('normal', {weights: ['400', '800'], subsets: ['korean']}).fontFamily;
const FONT = `${mont}, ${kr}, sans-serif`;

const TAU = Math.PI * 2;
const WHITE = '#ffffff';
const SOFTGREY = '#a8a8a2';
const MIDGREY = '#6b6b66';

// browser
const BW = 1280;
const BH = 720;
const TB = 40;
const CH = BH - TB;
const KR_H = BW * (1218 / 800);

const dr = (d: number) => ({pathLength: 1, strokeDasharray: 1, strokeDashoffset: 1 - d});
const rise = (f: number, a: number, b: number) => 110 * (1 - p(f, a, b, OUT));
const blurOf = (f: number, a: number, b: number) => 8 * (1 - p(f, a, b, OUT));

const Mask: React.FC<{y: number; blur?: number; h: number; style?: React.CSSProperties; children: React.ReactNode}> = ({
	y, blur = 0, h, style, children,
}) => (
	<div style={{overflow: 'hidden', height: h, ...style}}>
		<div style={{transform: `translateY(${y}%)`, filter: blur > 0.1 ? `blur(${blur}px)` : undefined, height: h, lineHeight: `${h}px`, whiteSpace: 'nowrap'}}>
			{children}
		</div>
	</div>
);

const Cross: React.FC<{x: number; y: number; c?: string; o?: number}> = ({x, y, c = INK, o = 0.4}) => (
	<path d={`M${x - 10} ${y}H${x + 10}M${x} ${y - 10}V${y + 10}`} stroke={c} strokeWidth={1.5} opacity={o} fill="none" />
);

/** Editorial header: "02 | Title ........ Dsn By Mh" + full-width rule */
const Header: React.FC<{f: number; at: number; n: string; title: string; dark?: boolean}> = ({f, at, n, title, dark}) => {
	const c = dark ? WHITE : INK;
	const rule = dark ? 'rgba(255,255,255,0.35)' : 'rgba(13,13,13,0.5)';
	return (
		<>
			<svg width={W} height={120} style={{position: 'absolute', left: 0, top: 0}}>
				<line x1={0} y1={90} x2={W} y2={90} stroke={rule} strokeWidth={1.5} {...dr(p(f, at, at + 34, EASE))} />
				<line x1={196} y1={34} x2={196} y2={90} stroke={rule} strokeWidth={1.5} {...dr(p(f, at + 6, at + 30, EASE))} />
				<Cross x={196} y={90} c={dark ? GREEN : INK} o={p(f, at + 20, at + 34)} />
			</svg>
			<Mask y={rise(f, at + 4, at + 26)} h={44} style={{position: 'absolute', top: 38, left: 120}}>
				<span style={{fontSize: 28, fontWeight: 800, color: c}}>{n}</span>
			</Mask>
			<Mask y={rise(f, at + 10, at + 32)} h={44} style={{position: 'absolute', top: 38, left: 224}}>
				<span style={{fontSize: 28, fontWeight: 800, color: c}}>{title}</span>
			</Mask>
			<Mask y={rise(f, at + 16, at + 38)} h={44} style={{position: 'absolute', top: 38, right: 120}}>
				<span style={{fontSize: 24, fontWeight: 400, fontStyle: 'italic', color: dark ? SOFTGREY : MIDGREY}}>Design By Mujahid H.</span>
			</Mask>
		</>
	);
};

const CHIPS: Chip[] = [
	{label: 'Framer', x: 890, y: 236, at: 156},
	{label: 'Webflow', x: 1090, y: 168, at: 164},
	{label: 'Wix Studio', x: 1330, y: 236, at: 172},
	{label: 'Shopify', x: 1650, y: 190, at: 180},
	{label: 'WordPress', x: 1640, y: 812, at: 188},
	{label: 'Squarespace', x: 1200, y: 850, at: 196},
	{label: 'Mern Stack', x: 860, y: 828, at: 204},
];

// ---------- Gallery data ----------
const WORK = [
	{n: '01', title: 'Cotton Burg Store', tags: ['WordPress', 'Elementor', 'Woo-commerce'], img: 'korea.jpg', pos: 'top', scroll: true},
	{n: '02', title: 'Hanstaiger X1', tags: ['Shopify', 'Liquid Code', 'Tailwind CSS'], img: 'x1.png', pos: 'center 18%', scroll: true},
	{n: '03', title: 'Stipt.Partners', tags: ['Elementor', 'Wordpress', 'SmoothScroll'], img: 'stipt.png', pos: 'center 30%', scroll: true},
];
const LOGO_W = (70 / 86) * 1272;

/** Trusted-by logo marquee: white rounded strip, edge fades, seamless loop. */
const LogoStrip: React.FC<{f: number; at: number; top: number}> = ({f, at, top}) => {
	const fade = 'linear-gradient(90deg, transparent 0, #000 12%, #000 90%, transparent 100%)';
	return (
		<div
			style={{
				position: 'absolute', left: 120, right: 120, top, height: 96, borderRadius: 20, background: WHITE, overflow: 'hidden',
				display: 'flex', alignItems: 'center', clipPath: `inset(0 ${(1 - p(f, at, at + 30, OUT)) * 100}% 0 0 round 20px)`,
			}}
		>
			<div style={{width: 250, flexShrink: 0, paddingLeft: 36, fontSize: 15, fontWeight: 600, letterSpacing: '0.18em', lineHeight: 1.6, color: MIDGREY, textTransform: 'uppercase', borderRight: '1px solid rgba(13,13,13,0.1)', height: 48, display: 'flex', alignItems: 'center'}}>
				Trusted By<br />Global Brands
			</div>
			<div style={{flex: 1, height: '100%', overflow: 'hidden', maskImage: fade, WebkitMaskImage: fade}}>
				<div style={{display: 'flex', alignItems: 'center', height: '100%', transform: `translateX(${-loop(f, 420) * LOGO_W}px)`}}>
					{[0, 1, 2].map((k) => (
						<Img key={k} src={staticFile('logos.png')} style={{height: 70, width: LOGO_W, flexShrink: 0}} />
					))}
				</div>
			</div>
		</div>
	);
};

// ---------- Services data ----------
const SERVICES = [
	{name: 'Framer & Webflow', tags: ['Custom Code Components', 'Cms · Interactions · Seo']},
	{name: 'Shopify', tags: ['Custom Themes · Liquid', 'Store Setup · Speed']},
	{name: 'WordPress', tags: ['Elementor · Gutenberg', 'Wix Studio · Squarespace']},
	{name: 'Mern Stack', tags: ['React · Node.js · MongoDB', 'Api Integration']},
	{name: 'UI/UX Design', tags: ['Figma To Launch', 'Landing Pages · Branding']},
];

/** Small looping vector demos, one per service (all periodic => seamless). */
const Demo: React.FC<{i: number; f: number}> = ({i, f}) => {
	const t = loop(f, 180);
	const line = {stroke: INK, strokeWidth: 1.5, fill: 'none'};
	if (i === 0) {
		const w = 0.5 + 0.5 * Math.sin(TAU * t);
		const width = 190 + 130 * w;
		const x0 = 30, y0 = 20, h = 62;
		return (
			<svg width={420} height={110}>
				<rect x={x0} y={y0} width={width} height={h} rx={8} {...line} fill="rgba(47,179,106,0.08)" />
				{[[x0, y0], [x0 + width, y0], [x0, y0 + h], [x0 + width, y0 + h]].map(([x, y], k) => (
					<rect key={k} x={x - 4.5} y={y - 4.5} width={9} height={9} fill={WHITE} stroke={GREEN} strokeWidth={1.5} />
				))}
				<text x={x0 + 14} y={y0 + 38} fontSize={15} fontWeight={800} fill={INK} opacity={0.6} fontFamily={FONT}>Hero Section</text>
				<line x1={x0} y1={100} x2={x0 + width} y2={100} stroke={MIDGREY} strokeWidth={1} />
				<line x1={x0} y1={95} x2={x0} y2={105} stroke={MIDGREY} strokeWidth={1} />
				<line x1={x0 + width} y1={95} x2={x0 + width} y2={105} stroke={MIDGREY} strokeWidth={1} />
				<text x={x0 + width / 2} y={92} fontSize={12} textAnchor="middle" fill={MIDGREY} fontFamily={FONT}>{Math.round(width)}</text>
				<path d="M0 0 L0 16 L4.5 12 L8 19 L11 17.5 L7.5 10.5 L13 10 Z" fill={INK} transform={`translate(${x0 + width + 8} ${y0 + h + 6})`} />
			</svg>
		);
	}
	if (i === 1) {
		const fill = EASE(Math.min(1, Math.max(0, (t - 0.08) / 0.5)));
		const done = t > 0.6 && t < 0.92;
		const pop = done ? 1 : 0;
		return (
			<svg width={420} height={110}>
				<rect x={10} y={8} width={130} height={94} rx={12} {...line} />
				<rect x={20} y={18} width={110} height={44} rx={6} fill="rgba(13,13,13,0.06)" />
				<path d="M20 62 L55 34 L80 52 L100 38 L130 62" stroke={INK} strokeOpacity={0.35} strokeWidth={1.5} fill="none" />
				<rect x={20} y={72} width={72} height={7} rx={3.5} fill="rgba(13,13,13,0.45)" />
				<rect x={20} y={86} width={44} height={7} rx={3.5} fill="rgba(13,13,13,0.2)" />
				<rect x={170} y={14} width={150} height={9} rx={4.5} fill="rgba(13,13,13,0.45)" />
				<rect x={170} y={32} width={96} height={9} rx={4.5} fill="rgba(13,13,13,0.2)" />
				<rect x={170} y={60} width={180} height={34} rx={17} {...line} />
				<rect x={170} y={60} width={Math.max(0.1, 180 * fill)} height={34} rx={17} fill={GREEN} />
				<text x={260} y={82} fontSize={15} fontWeight={800} textAnchor="middle" fill={fill > 0.55 ? WHITE : INK} fontFamily={FONT}>{done ? 'Added' : 'Add To Cart'}</text>
				<circle cx={388} cy={34} r={16} {...line} />
				<circle cx={402} cy={20} r={9 * (0.7 + 0.3 * pop)} fill={GREEN} />
				<text x={402} y={24} fontSize={11} fontWeight={800} textAnchor="middle" fill={WHITE} fontFamily={FONT}>{done ? 1 : 0}</text>
			</svg>
		);
	}
	if (i === 2) {
		const u = t * 2;
		const phase = Math.floor(u);
		const frac = u - phase;
		const e = EASE(Math.min(1, frac * 1.6));
		const s = phase === 0 ? e : 1 - e;
		const yA = 10 + 38 * s;
		const yB = 10 + 38 * (1 - s);
		const pulse = 1 + 0.08 * Math.sin(TAU * t * 2);
		return (
			<svg width={420} height={110}>
				<rect x={20} y={yA} width={300} height={26} rx={7} fill="rgba(47,179,106,0.14)" stroke={GREEN} strokeWidth={1.5} />
				<rect x={20} y={yB} width={300} height={26} rx={7} {...line} />
				<rect x={20} y={86} width={300} height={22} rx={7} stroke={INK} strokeOpacity={0.3} strokeWidth={1.5} fill="none" />
				<rect x={34} y={yA + 9} width={90} height={8} rx={4} fill={GREEN} />
				<rect x={34} y={yB + 9} width={130} height={8} rx={4} fill="rgba(13,13,13,0.35)" />
				<g transform={`translate(372 55) scale(${pulse})`}>
					<circle r={22} fill={INK} />
					<path d="M-8 0H8M0 -8V8" stroke={WHITE} strokeWidth={2.5} strokeLinecap="round" />
				</g>
			</svg>
		);
	}
	if (i === 3) {
		const xs = [44, 150, 256, 362];
		const L = ['M', 'E', 'R', 'N'];
		const S = ['Mongo', 'Express', 'React', 'Node'];
		return (
			<svg width={420} height={110}>
				{[0, 1, 2].map((k) => (
					<g key={k}>
						<line x1={xs[k] + 24} y1={44} x2={xs[k + 1] - 24} y2={44} stroke={INK} strokeOpacity={0.5} strokeWidth={1.5} />
						{[0, 1].map((m) => {
							const q = (t * 2 + k / 3 + m / 2) % 1;
							return <circle key={m} cx={xs[k] + 24 + q * (xs[k + 1] - xs[k] - 48)} cy={44} r={4} fill={GREEN} />;
						})}
					</g>
				))}
				{xs.map((x, k) => (
					<g key={k}>
						<circle cx={x} cy={44} r={24} fill={WHITE} stroke={INK} strokeWidth={1.5} />
						<text x={x} y={51} fontSize={20} fontWeight={800} textAnchor="middle" fill={k === 0 || k === 3 ? GREEN : INK} fontFamily={FONT}>{L[k]}</text>
						<text x={x} y={96} fontSize={12} textAnchor="middle" fill={MIDGREY} fontFamily={FONT}>{S[k]}</text>
					</g>
				))}
			</svg>
		);
	}
	const path = 'M20 82 C 90 8, 150 108, 220 42 S 340 14, 400 66';
	const pts: [number, number][] = [[20, 82], [220, 42], [400, 66]];
	return (
		<svg width={420} height={110}>
			<path d={path} {...line} stroke={INK} strokeOpacity={0.25} />
			<path d={path} fill="none" stroke={GREEN} strokeWidth={3} strokeLinecap="round" pathLength={1} strokeDasharray="0.3 0.7" strokeDashoffset={-t} />
			<line x1={20} y1={82} x2={60} y2={34} stroke={MIDGREY} strokeWidth={1} />
			<line x1={220} y1={42} x2={262} y2={78} stroke={MIDGREY} strokeWidth={1} />
			{pts.map(([x, y], k) => (
				<rect key={k} x={x - 5} y={y - 5} width={10} height={10} fill={WHITE} stroke={INK} strokeWidth={1.5} />
			))}
			<circle cx={60} cy={34} r={3.5} fill={GREEN} />
			<circle cx={262} cy={78} r={3.5} fill={GREEN} />
		</svg>
	);
};

const BARS14 = [0.3, 0.45, 0.38, 0.55, 0.5, 0.62, 0.58, 0.7, 0.66, 0.8, 0.74, 0.88, 0.84, 0.95];

/** Premium SaaS dashboard mock (800x360). */
const Dashboard: React.FC<{f: number; floatY: number}> = ({f, floatY}) => {
	const g = (k: number) => p(f, 756 + k * 8, 790 + k * 8, OUT);
	const NAV = ['Overview', 'Revenue', 'Customers', 'Billing'];
	const KPI = [
		{l: 'Revenue', v: '$48.2k', d: '+12.4%', s: [54, 46, 50, 36, 28]},
		{l: 'Active Users', v: '12.4k', d: '+8.1%', s: [50, 52, 40, 42, 30]},
		{l: 'Conversion', v: '4.8%', d: '+2.3%', s: [52, 44, 46, 34, 32]},
	];
	const hover = p(f, 822, 842, OUT);
	return (
		<div style={{position: 'absolute', left: 1000, top: 140, width: 800, height: 360, clipPath: `inset(0 ${(1 - p(f, 736, 780, OUT)) * 100}% 0 0 round 20px)`}}>
			<svg width={800} height={360} style={{transform: `translateY(${floatY}px)`}}>
				<rect x={1} y={1} width={798} height={358} rx={20} fill={WHITE} stroke={INK} strokeOpacity={0.7} strokeWidth={1.5} />
				<path d="M21 1.75 H140 V358.25 H21 A19.25 19.25 0 0 1 1.75 339 V21 A19.25 19.25 0 0 1 21 1.75 Z" fill="#f7f7f4" />
				<line x1={140} y1={1} x2={140} y2={359} stroke={INK} strokeOpacity={0.12} />
				<line x1={141} y1={56} x2={799} y2={56} stroke={INK} strokeOpacity={0.1} />

				<rect x={22} y={20} width={24} height={24} rx={7} fill={INK} />
				<path d="M29 36 L34 28 L39 36" stroke={GREEN} strokeWidth={2.2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
				<text x={56} y={37} fontSize={15} fontWeight={800} fill={INK}>Acme</text>
				{NAV.map((n, k) => {
					const cy = 91 + k * 40;
					return (
						<g key={n} opacity={g(0)}>
							{k === 0 && <rect x={12} y={cy - 17} width={116} height={34} rx={10} fill="rgba(47,179,106,0.14)" />}
							<rect x={26} y={cy - 7} width={14} height={14} rx={4} fill={k === 0 ? GREEN : 'none'} stroke={k === 0 ? GREEN : MIDGREY} strokeWidth={1.5} />
							<text x={50} y={cy + 4.5} fontSize={12.5} fontWeight={k === 0 ? 800 : 400} fill={k === 0 ? INK : MIDGREY}>{n}</text>
						</g>
					);
				})}
				<g opacity={g(0)}>
					<rect x={26} y={313} width={14} height={14} rx={7} fill="none" stroke={MIDGREY} strokeWidth={1.5} />
					<text x={50} y={324.5} fontSize={12.5} fill={MIDGREY}>Settings</text>
				</g>

				<text x={164} y={34} fontSize={18} fontWeight={800} fill={INK}>Overview</text>
				<rect x={500} y={17} width={170} height={26} rx={13} fill="rgba(13,13,13,0.05)" />
				<circle cx={516} cy={29} r={5} fill="none" stroke={MIDGREY} strokeWidth={1.5} />
				<line x1={520} y1={33} x2={524} y2={37} stroke={MIDGREY} strokeWidth={1.5} strokeLinecap="round" />
				<text x={534} y={34} fontSize={11} fill={MIDGREY}>Search...</text>
				<circle cx={700} cy={30} r={14} fill="none" stroke={INK} strokeOpacity={0.15} />
				<path d="M694 34 H706 L704 30 V27 A4 4 0 0 0 696 27 V30 Z" fill="none" stroke={INK} strokeWidth={1.4} strokeLinejoin="round" />
				<circle cx={707} cy={22} r={3.5} fill={GREEN} stroke={WHITE} strokeWidth={1.5} />
				<circle cx={752} cy={30} r={15} fill="#e4e4de" stroke={GREEN} strokeWidth={2} />
				<circle cx={752} cy={26} r={4.5} fill={INK} fillOpacity={0.55} />
				<path d="M743 39 A9 7 0 0 1 761 39 Z" fill={INK} fillOpacity={0.55} />

				{KPI.map((c, k) => {
					const x = 160 + k * 214;
					const dark = k === 0;
					const pts = c.s.map((yy, j) => `${j === 0 ? 'M' : 'L'}${x + 112 + j * 16} ${72 + yy - 6}`).join(' ');
					return (
						<g key={c.l} opacity={g(k)}>
							<rect x={x} y={72} width={192} height={92} rx={14} fill={dark ? INK : WHITE} stroke={INK} strokeOpacity={dark ? 1 : 0.14} />
							<text x={x + 16} y={98} fontSize={11} fontWeight={600} fill={dark ? 'rgba(255,255,255,0.6)' : MIDGREY}>{c.l}</text>
							<text x={x + 16} y={128} fontSize={25} fontWeight={800} fill={dark ? WHITE : INK}>{c.v}</text>
							<path d={`M${x + 17} 150 l4 -7 l4 7 z`} fill={GREEN} />
							<text x={x + 30} y={150} fontSize={11} fontWeight={800} fill={GREEN}>{c.d}</text>
							<path d={pts} fill="none" stroke={GREEN} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" {...dr(p(f, 770 + k * 8, 810 + k * 8, EASE))} />
						</g>
					);
				})}

				<g opacity={g(1)}>
					<rect x={160} y={178} width={400} height={168} rx={14} fill={WHITE} stroke={INK} strokeOpacity={0.14} />
					<text x={176} y={202} fontSize={13} fontWeight={800} fill={INK}>Revenue Growth</text>
					<text x={176} y={218} fontSize={10.5} fill={MIDGREY}>Last 14 days</text>
				</g>
				{[1, 2, 3, 4].map((k) => (
					<line key={k} x1={176} y1={334 - 21 * k} x2={544} y2={334 - 21 * k} stroke={INK} strokeOpacity={0.07} opacity={g(1)} />
				))}
				{BARS14.map((b, i) => {
					const grow = p(f, 770 + i * 3, 806 + i * 3, OUT) * (1 + 0.025 * Math.sin(TAU * (f / 240 + i / 14)));
					const hh = b * 84 * grow;
					return <rect key={i} x={182 + i * 26} y={334 - hh} width={16} height={hh} rx={5} fill={i === 13 ? GREEN : 'rgba(13,13,13,0.14)'} />;
				})}
				{(() => {
					const d = BARS14.map((b, i) => `${i === 0 ? 'M' : 'L'}${190 + i * 26} ${334 - b * 84 - 6}`).join(' ');
					return <path d={d} fill="none" stroke={INK} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" {...dr(p(f, 800, 846, EASE))} />;
				})()}
				<g opacity={hover} transform={`translate(0 ${(1 - hover) * 6})`}>
					<rect x={498} y={216} width={60} height={22} rx={8} fill={INK} />
					<path d="M522 237 L528 244 L534 237 Z" fill={INK} />
					<text x={528} y={231} fontSize={11} fontWeight={800} textAnchor="middle" fill={WHITE}>$48.2k</text>
				</g>

				<g opacity={g(2)}>
					<rect x={578} y={178} width={202} height={168} rx={14} fill={WHITE} stroke={INK} strokeOpacity={0.14} />
					<text x={594} y={202} fontSize={13} fontWeight={800} fill={INK}>Traffic Source</text>
					<g transform="translate(679 262) rotate(-90)" fill="none" strokeWidth={12}>
						<circle r={36} stroke="rgba(13,13,13,0.08)" />
						<circle r={36} stroke={GREEN} pathLength={100} strokeDasharray={`${60 * p(f, 790, 840, OUT)} 100`} />
						<circle r={36} stroke={INK} pathLength={100} strokeDasharray={`${24 * p(f, 800, 850, OUT)} 100`} strokeDashoffset={-62} />
					</g>
					<text x={679} y={267} fontSize={17} fontWeight={800} textAnchor="middle" fill={INK}>60%</text>
					<circle cx={598} cy={327} r={4} fill={GREEN} />
					<text x={607} y={331} fontSize={10.5} fill={MIDGREY}>Organic</text>
					<circle cx={662} cy={327} r={4} fill={INK} />
					<text x={671} y={331} fontSize={10.5} fill={MIDGREY}>Direct</text>
					<circle cx={718} cy={327} r={4} fill="rgba(13,13,13,0.2)" />
					<text x={727} y={331} fontSize={10.5} fill={MIDGREY}>Social</text>
				</g>
			</svg>
		</div>
	);
};

const STATS: [string, string][] = [
	['8+', ' Years Experience'],
	['5.0', ' Upwork Rating'],
	['Top Rated', ' Freelancer'],
	['Mern · Shopify · Framer', ''],
];

const Card: React.FC<{x: number; y: number; w: number; h: number; f: number; at: number; ph: number; children: React.ReactNode}> = ({
	x, y, w, h, f, at, ph, children,
}) => {
	const e = p(f, at, at + 30, OUT);
	if (e <= 0.001) return null;
	const fl = 3 * Math.sin(TAU * (f / 180 + ph));
	return (
		<div
			style={{
				position: 'absolute', left: x, top: y, width: w, height: h, background: WHITE, color: INK, overflow: 'hidden',
				clipPath: `inset(${(1 - e) * 100}% 0 0 0)`, transform: `translateY(${(1 - e) * 40 + fl}px)`,
			}}
		>
			{children}
		</div>
	);
};

const Quote: React.FC<{text: string; name: string; role: string; size?: number}> = ({text, name, role, size = 29}) => (
	<>
		<div style={{padding: '34px 36px 0', fontSize: size, fontWeight: 600, lineHeight: 1.38, letterSpacing: '-0.01em'}}>{text}</div>
		<div style={{position: 'absolute', left: 36, right: 36, bottom: 26, borderTop: '1.5px solid #0d0d0d', paddingTop: 10, display: 'flex', justifyContent: 'space-between', fontSize: 18}}>
			<span style={{fontWeight: 800}}>{name}</span>
			<span style={{color: MIDGREY}}>{role}</span>
		</div>
	</>
);

export const Portfolio: React.FC = () => {
	const f = useCurrentFrame();
	const t = (TAU * f) / DUR;

	// camera (periodic over DUR)
	const camX = 26 * Math.sin(t);
	const camY = 14 * Math.sin(2 * t);
	const camS = 1 + 0.02 * Math.sin((Math.PI * f) / DUR);
	const layer = (k: number): React.CSSProperties => ({transform: `translate(${-camX * k}px, ${-camY * k}px)`});

	// signature line (frame 0 === last frame)
	const intro = p(f, 0, 50, OUT);
	const outro = p(f, 1030, 1080, EASE);
	const lineHalf = 200 + 760 * intro * (1 - outro);
	const lineOpacity = Math.max(
		kf(f, [70, 100], [1, 0]),
		kf(f, [522, 526, 538, 552], [0, 1, 1, 0]),
		kf(f, [824, 828, 838, 840], [0, 1, 1, 0]),
		kf(f, [993, 995], [0, 1])
	);
	const cursorX = 960 + lineHalf * 0.9 * Math.sin((TAU * (f % 240)) / 240);

	// browser (Korean client site)
	const draw = p(f, 55, 100, EASE);
	const reveal = p(f, 80, 120, OUT);
	const entry = 0.96 + 0.04 * p(f, 60, 115, OUT);
	const bScale = kf(f, [0, 130, 175, 300, 350], [1, 1, 0.66, 0.66, 0.8], EASE) * entry;
	const cx = 960 + 380 * p(f, 130, 175) + 10 * Math.sin(2 * t);
	const cy = 540 + 4 * Math.sin(3 * t);
	const scroll = kf(f, [100, 300], [0, 560], SOFT);
	const perim = 2 * (BW + BH);
	const browserVisible = f >= 55 && f < 352;

	// gallery panel (circle from browser, collapses to line)
	const gCirc = p(f, 300, 350, EASE);
	const gCollapse = p(f, 495, 530, EASE);
	const gVisible = f >= 300 && f < 532;
	const gClip = f < 495 ? `circle(${gCirc * 135}% at 69.8% 50%)` : `inset(${gCollapse * 49.9}% 0 ${gCollapse * 49.9}% 0)`;

	// reviews panel (opens from the line, collapses back to it)
	const rOpen = p(f, 838, 872, EASE);
	const rCollapse = p(f, 965, 1000, EASE);
	const rVisible = f >= 838 && f < 1002;
	const rClip = f < 965 ? `inset(${(1 - rOpen) * 49.9}% 0 ${(1 - rOpen) * 49.9}% 0)` : `inset(${rCollapse * 49.9}% 0 ${rCollapse * 49.9}% 0)`;

	const gridOp = 0.55 + 0.35 * p(f, 1000, 1030) * (1 - p(f, 1050, 1075));

	const TYPO = [
		{t: 'Building', c: GREY, s: 120, at: 140, top: 250},
		{t: 'Smart,', c: INK, s: 120, at: 154, top: 381},
		{t: 'Fast &', c: INK, s: 120, at: 168, top: 512},
		{t: 'Scalable.', c: INK, s: 120, at: 182, top: 643},
		{t: 'Digital Experiences', c: GREEN, s: 44, at: 204, top: 780},
	];

	// services
	const svcExit = p(f, 700, 730, EASE);
	const ROW0 = 250;
	const ROWH = 150;

	const floatY = 3 * Math.sin(TAU * (f / 180));

	return (
		<AbsoluteFill style={{background: PAPER, fontFamily: FONT, overflow: 'hidden'}}>
			<AbsoluteFill style={layer(0.2)}>
				<LoopingGrid frame={f} opacity={gridOp} />
			</AbsoluteFill>

			<AbsoluteFill style={layer(0.5)}>
				<LoopingVectorNetwork frame={f} />
				<LoopingParticles frame={f} />
			</AbsoluteFill>

			<AbsoluteFill style={{transform: `scale(${camS})`, transformOrigin: '50% 50%'}}>
				<AbsoluteFill style={layer(1)}>
					<svg width={W} height={H} style={{position: 'absolute', inset: 0, opacity: lineOpacity}}>
						<line x1={960 - lineHalf} y1={540} x2={960 + lineHalf} y2={540} stroke={INK} strokeWidth={2} strokeLinecap="round" />
						<circle cx={960 - lineHalf} cy={540} r={5} fill={INK} />
						<circle cx={960 + lineHalf} cy={540} r={5} fill={INK} />
						<circle cx={cursorX} cy={540} r={4} fill={GREEN} />
					</svg>

					{browserVisible && (
						<div style={{position: 'absolute', left: cx - BW / 2, top: cy - BH / 2, width: BW, height: BH, transform: `scale(${bScale})`, transformOrigin: '50% 50%'}}>
							<svg width={BW} height={BH} style={{position: 'absolute', inset: 0, overflow: 'visible', zIndex: 2, pointerEvents: 'none'}}>
								<rect x={1} y={1} width={BW - 2} height={BH - 2} rx={14} fill="none" stroke={INK} strokeWidth={2} strokeDasharray={perim} strokeDashoffset={perim * (1 - draw)} />
							</svg>
							<div style={{position: 'absolute', inset: 0, borderRadius: 14, overflow: 'hidden', background: '#fff', clipPath: `inset(${50 * (1 - reveal)}% 0 ${50 * (1 - reveal)}% 0 round 14px)`}}>
								<div style={{height: TB, display: 'flex', alignItems: 'center', gap: 8, padding: '0 16px', background: '#fafafa', borderBottom: '1px solid rgba(13,13,13,0.08)'}}>
									{[0, 1, 2].map((i) => (
										<span key={i} style={{width: 10, height: 10, borderRadius: 10, background: 'rgba(13,13,13,0.15)'}} />
									))}
									<div style={{marginLeft: 24, padding: '4px 20px', borderRadius: 999, background: '#f0f0ec', fontSize: 15, color: '#666'}}>Client Project · Korea</div>
								</div>
								<div style={{position: 'relative', height: CH, overflow: 'hidden'}}>
									<Img src={staticFile('korea.png')} style={{position: 'absolute', left: 0, width: BW, height: KR_H, top: -scroll + 3 * Math.sin(2 * t)}} />
								</div>
							</div>
						</div>
					)}

					{f >= 130 && f < 305 && (
						<div style={{position: 'absolute', left: 130 + 2 * Math.sin(2 * t), top: 0}}>
							{TYPO.map((l, i) => {
								const enter = p(f, l.at, l.at + 24, OUT);
								const exit = p(f, 262 + i * 3, 286 + i * 3, EASE);
								const h = Math.round(l.s * 1.04);
								return (
									<Mask key={i} y={110 * (1 - enter) - 110 * exit} blur={8 * (1 - enter) + 6 * exit} h={h} style={{position: 'absolute', top: l.top}}>
										<span style={{fontSize: l.s, fontWeight: 800, color: l.c, letterSpacing: l.s > 100 ? '-0.03em' : '0.02em'}}>{l.t}</span>
									</Mask>
								);
							})}
							<Mask y={rise(f, 218, 244) - 110 * p(f, 276, 296, EASE)} h={44} style={{position: 'absolute', top: 846}}>
								<span style={{fontSize: 30, fontWeight: 400, color: MIDGREY}}>Design · Web · Digital
</span>
							</Mask>
						</div>
					)}

					{/* Services (paper) */}
					{f >= 520 && f < 735 && (
						<AbsoluteFill style={{clipPath: `inset(0 0 ${svcExit * 100}% 0)`, transform: `translateY(${-svcExit * 70}px)`}}>
							<Header f={f} at={540} n="02" title="What I Build" />
							<Mask y={rise(f, 552, 586)} blur={blurOf(f, 552, 586)} h={110} style={{position: 'absolute', top: 118, left: 120}}>
								<span style={{fontSize: 80, fontWeight: 700, color: INK, letterSpacing: '0.03em', textTransform: 'uppercase'}}>Platforms I Build On</span>
							</Mask>
							{SERVICES.map((s, i) => {
								const y = ROW0 + i * ROWH;
								const at = 566 + i * 12;
								return (
									<React.Fragment key={s.name}>
										<svg width={W} height={H} style={{position: 'absolute', inset: 0}}>
											<line x1={120} y1={y} x2={1800} y2={y} stroke="rgba(13,13,13,0.35)" strokeWidth={1.5} {...dr(p(f, at, at + 34, EASE))} />
										</svg>
										<Mask y={rise(f, at + 6, at + 28)} h={40} style={{position: 'absolute', top: y + 55, left: 120}}>
											<span style={{fontSize: 24, fontWeight: 600, color: INK}}>{`0${i + 1}`}</span>
										</Mask>
										<Mask y={rise(f, at + 8, at + 36)} blur={blurOf(f, at + 8, at + 36)} h={90} style={{position: 'absolute', top: y + 30, left: 200}}>
											<span style={{fontSize: 60, fontWeight: 200, color: INK, letterSpacing: '0.03em', textTransform: 'uppercase'}}>{s.name}</span>
										</Mask>
										{s.tags.map((tg, k) => (
											<Mask key={k} y={rise(f, at + 16 + k * 5, at + 38 + k * 5)} h={36} style={{position: 'absolute', top: y + 39 + k * 36, left: 1000}}>
												<span style={{fontSize: 22, fontWeight: k === 0 ? 600 : 400, color: k === 0 ? INK : MIDGREY}}>{tg}</span>
											</Mask>
										))}
										<div
											style={{
												position: 'absolute', left: 1340, top: y + 16, width: 460, height: 118, borderRadius: 18, background: WHITE,
												border: '1px solid rgba(13,13,13,0.12)', backgroundImage: 'radial-gradient(rgba(13,13,13,0.1) 1px, transparent 1px)', backgroundSize: '16px 16px',
												display: 'flex', alignItems: 'center', justifyContent: 'center',
												clipPath: `inset(0 ${(1 - p(f, at + 14, at + 50, OUT)) * 100}% 0 0 round 18px)`,
											}}
										>
											<Demo i={i} f={f} />
										</div>
									</React.Fragment>
								);
							})}
							<svg width={W} height={H} style={{position: 'absolute', inset: 0}}>
								<line x1={120} y1={ROW0 + 5 * ROWH} x2={1800} y2={ROW0 + 5 * ROWH} stroke="rgba(13,13,13,0.35)" strokeWidth={1.5} {...dr(p(f, 630, 664, EASE))} />
							</svg>
						</AbsoluteFill>
					)}

					{/* Specializations (paper) */}
					{/* ---------- Specializations / Premium ---------- */}
{f >= 712 && f < 880 && (
	<AbsoluteFill style={{opacity: 1 - p(f, 838, 860, EASE)}}>
		<Header f={f} at={716} n="03" title="Specializations" />

		{/* Subtle vertical structure */}
		<svg
			width={W}
			height={H}
			style={{
				position: 'absolute',
				inset: 0,
				pointerEvents: 'none',
			}}
		>
			<line
				x1={80}
				y1={145}
				x2={1840}
				y2={145}
				stroke="rgba(13,13,13,0.12)"
				strokeWidth={1}
				{...dr(p(f, 720, 750, EASE))}
			/>

			<line
				x1={80}
				y1={910}
				x2={1840}
				y2={910}
				stroke="rgba(13,13,13,0.12)"
				strokeWidth={1}
				{...dr(p(f, 810, 835, EASE))}
			/>
		</svg>

		{/* ================================================= */}
		{/* CARD 01 — UI / UX */}
		{/* ================================================= */}

		<div
			style={{
				position: 'absolute',
				left: 80,
				top: 185,
				width: 540,
				height: 690,
				background: '#F8F8F5',
				border: '1px solid rgba(13,13,13,0.15)',
				borderRadius: 22,
				overflow: 'hidden',
				transform: `
					translateY(${(1 - p(f, 728, 758, EASE)) * 55}px)
					scale(${0.97 + p(f, 728, 758, EASE) * 0.03})
				`,
				opacity: p(f, 724, 754, EASE),
			}}
		>
			{/* CARD HEADER */}
			<div
				style={{
					position: 'absolute',
					left: 28,
					right: 28,
					top: 26,
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<span
					style={{
						fontSize: 13,
						fontWeight: 700,
						letterSpacing: '0.16em',
						color: MIDGREY,
					}}
				>
					01 / DESIGN
				</span>

				<span
					style={{
						fontSize: 12,
						color: '#13A66B',
						border: '1px solid rgba(19,166,107,0.35)',
						padding: '6px 9px',
						borderRadius: 20,
					}}
				>
					UI / UX
				</span>
			</div>

			{/* DESIGN VISUAL */}
			<div
				style={{
					position: 'absolute',
					left: 28,
					right: 28,
					top: 78,
					height: 350,
					background: '#FFFFFF',
					border: '1px solid rgba(13,13,13,0.12)',
					borderRadius: 16,
					overflow: 'hidden',
					transform: `translateY(${(1 - p(f, 738, 770, EASE)) * 20}px)`,
				}}
			>
				{/* browser bar */}
				<div
					style={{
						height: 38,
						borderBottom: '1px solid rgba(13,13,13,0.1)',
						display: 'flex',
						alignItems: 'center',
						padding: '0 14px',
						gap: 6,
					}}
				>
					<div style={{width: 7, height: 7, borderRadius: '50%', background: '#111'}} />
					<div style={{width: 7, height: 7, borderRadius: '50%', background: '#777'}} />
					<div style={{width: 7, height: 7, borderRadius: '50%', background: '#CCC'}} />

					<div
						style={{
							marginLeft: 18,
							width: 170,
							height: 8,
							background: '#ECECE8',
							borderRadius: 4,
						}}
					/>
				</div>

				{/* layout */}
				<div style={{display: 'flex', height: 312}}>
					<div
						style={{
							width: 92,
							borderRight: '1px solid rgba(13,13,13,0.1)',
							padding: 14,
						}}
					>
						<div
							style={{
								width: 42,
								height: 8,
								background: '#111',
								marginBottom: 28,
							}}
						/>

						{[1, 2, 3, 4, 5].map((_, i) => (
							<div
								key={i}
								style={{
									height: 7,
									width: i === 0 ? 54 : 42,
									background: i === 0 ? '#13A66B' : '#E4E4E0',
									marginBottom: 16,
									borderRadius: 4,
								}}
							/>
						))}
					</div>

					<div style={{flex: 1, padding: 24}}>
						<div
							style={{
								width: 130,
								height: 16,
								background: '#111',
								marginBottom: 12,
							}}
						/>

						<div
							style={{
								width: 190,
								height: 7,
								background: '#D9D9D5',
								marginBottom: 26,
							}}
						/>

						<div
							style={{
								display: 'grid',
								gridTemplateColumns: '1fr 1fr',
								gap: 12,
							}}
						>
							{[1, 2, 3, 4].map((_, i) => (
								<div
									key={i}
									style={{
										height: 72,
										border: '1px solid rgba(13,13,13,0.1)',
										borderRadius: 9,
										padding: 12,
									}}
								>
									<div
										style={{
											width: 28,
											height: 28,
											borderRadius: 7,
											background: i === 0 ? '#13A66B' : '#ECECE8',
											marginBottom: 10,
										}}
									/>

									<div
										style={{
											width: 65,
											height: 6,
											background: '#D9D9D5',
										}}
									/>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>

			{/* TEXT */}
			<Mask
				y={rise(f, 750, 778)}
				h={54}
				style={{
					position: 'absolute',
					left: 28,
					top: 458,
				}}
			>
				<span
					style={{
						fontSize: 42,
						fontWeight: 800,
						letterSpacing: '-0.04em',
						color: INK,
					}}
				>
					UI / UX Design
				</span>
			</Mask>

			<Mask
				y={rise(f, 758, 786)}
				h={34}
				style={{
					position: 'absolute',
					left: 28,
					top: 518,
				}}
			>
				<span
					style={{
						fontSize: 20,
						color: MIDGREY,
					}}
				>
					Interfaces built around clarity.
				</span>
			</Mask>

			<div
				style={{
					position: 'absolute',
					left: 28,
					right: 28,
					bottom: 26,
					display: 'flex',
					gap: 9,
				}}
			>
				{['Figma', 'Design Systems', 'Interaction'].map((x) => (
					<span
						key={x}
						style={{
							fontSize: 12,
							color: MIDGREY,
							border: '1px solid rgba(13,13,13,0.12)',
							padding: '7px 9px',
							borderRadius: 20,
						}}
					>
						{x}
					</span>
				))}
			</div>
		</div>

		{/* ================================================= */}
		{/* CARD 02 — ECOMMERCE / CMS */}
		{/* ================================================= */}

		<div
			style={{
				position: 'absolute',
				left: 690,
				top: 185,
				width: 540,
				height: 690,
				background: '#F8F8F5',
				border: '1px solid rgba(13,13,13,0.15)',
				borderRadius: 22,
				overflow: 'hidden',
				transform: `
					translateY(${(1 - p(f, 740, 770, EASE)) * 55}px)
					scale(${0.97 + p(f, 740, 770, EASE) * 0.03})
				`,
				opacity: p(f, 736, 766, EASE),
			}}
		>
			{/* HEADER */}
			<div
				style={{
					position: 'absolute',
					left: 28,
					right: 28,
					top: 26,
					display: 'flex',
					justifyContent: 'space-between',
				}}
			>
				<span
					style={{
						fontSize: 13,
						fontWeight: 700,
						letterSpacing: '0.16em',
						color: MIDGREY,
					}}
				>
					02 / COMMERCE
				</span>

				<span
					style={{
						fontSize: 12,
						color: '#13A66B',
						border: '1px solid rgba(19,166,107,0.35)',
						padding: '6px 9px',
						borderRadius: 20,
					}}
				>
					CMS
				</span>
			</div>

			{/* PRODUCT VISUAL */}
			<div
				style={{
					position: 'absolute',
					left: 28,
					right: 28,
					top: 78,
					height: 350,
					background: '#EDEDE8',
					borderRadius: 16,
					overflow: 'hidden',
					border: '1px solid rgba(13,13,13,0.1)',
				}}
			>
				{/* product image area */}
				<div
					style={{
						position: 'absolute',
						left: 20,
						top: 20,
						width: 220,
						height: 310,
						background: '#D8D8D2',
						borderRadius: 10,
						transform: `translateY(${Math.sin(t * 1.2) * 3}px)`,
					}}
				>
					<div
						style={{
							position: 'absolute',
							left: 34,
							right: 34,
							top: 42,
							height: 180,
							background: '#BEBEB7',
							borderRadius: 5,
						}}
					/>

					<div
						style={{
							position: 'absolute',
							left: 52,
							right: 52,
							bottom: 44,
							height: 10,
							background: '#999991',
						}}
					/>

					<div
						style={{
							position: 'absolute',
							left: 72,
							right: 72,
							bottom: 24,
							height: 6,
							background: '#A7A7A0',
						}}
					/>
				</div>

				{/* product information */}
				<div
					style={{
						position: 'absolute',
						left: 268,
						top: 38,
						right: 22,
					}}
				>
					<div
						style={{
							width: 110,
							height: 9,
							background: '#B2B2AC',
							marginBottom: 20,
						}}
					/>

					<div
						style={{
							width: 160,
							height: 19,
							background: '#111',
							marginBottom: 10,
						}}
					/>

					<div
						style={{
							width: 110,
							height: 9,
							background: '#C7C7C0',
							marginBottom: 26,
						}}
					/>

					<div
						style={{
							width: 80,
							height: 15,
							background: '#111',
							marginBottom: 30,
						}}
					/>

					<div
						style={{
							width: 150,
							height: 38,
							background: '#111',
							borderRadius: 5,
						}}
					/>
				</div>

				{/* green active indicator */}
				<div
					style={{
						position: 'absolute',
						right: 20,
						bottom: 20,
						width: 8,
						height: 8,
						borderRadius: '50%',
						background: '#13A66B',
					}}
				/>
			</div>

			<Mask
				y={rise(f, 762, 790)}
				h={54}
				style={{
					position: 'absolute',
					left: 28,
					top: 458,
				}}
			>
				<span
					style={{
						fontSize: 42,
						fontWeight: 800,
						letterSpacing: '-0.04em',
						color: INK,
					}}
				>
					E-Commerce & CMS
				</span>
			</Mask>

			<Mask
				y={rise(f, 770, 798)}
				h={34}
				style={{
					position: 'absolute',
					left: 28,
					top: 518,
				}}
			>
				<span
					style={{
						fontSize: 20,
						color: MIDGREY,
					}}
				>
					Stores that are built to sell.
				</span>
			</Mask>

			<div
	style={{
		position: 'absolute',
		left: 28,
		right: 28,
		bottom: 22,
		display: 'flex',
		flexWrap: 'wrap',
		gap: 7,
	}}
>
				{['Shopify', 'WordPress', 'Framer', 'Webflow', 'Squarespace', 'GHL', 'Squarespace', 'Wix-Studio'].map((x) => (
					<span
						key={x}
						style={{
							fontSize: 12,
							color: MIDGREY,
							border: '1px solid rgba(13,13,13,0.12)',
							padding: '7px 9px',
							borderRadius: 20,
						}}
					>
						{x}
					</span>
				))}
			</div>
		</div>

		{/* ================================================= */}
		{/* CARD 03 — SAAS */}
		{/* ================================================= */}

		<div
			style={{
				position: 'absolute',
				left: 1300,
				top: 185,
				width: 540,
				height: 690,
				background: '#F8F8F5',
				border: '1px solid rgba(13,13,13,0.15)',
				borderRadius: 22,
				overflow: 'hidden',
				transform: `
					translateY(${(1 - p(f, 752, 782, EASE)) * 55}px)
					scale(${0.97 + p(f, 752, 782, EASE) * 0.03})
				`,
				opacity: p(f, 748, 778, EASE),
			}}
		>
			<div
				style={{
					position: 'absolute',
					left: 28,
					right: 28,
					top: 26,
					display: 'flex',
					justifyContent: 'space-between',
				}}
			>
				<span
					style={{
						fontSize: 13,
						fontWeight: 700,
						letterSpacing: '0.16em',
						color: MIDGREY,
					}}
				>
					03 / PRODUCT
				</span>

				<span
					style={{
						fontSize: 12,
						color: '#13A66B',
						border: '1px solid rgba(19,166,107,0.35)',
						padding: '6px 9px',
						borderRadius: 20,
					}}
				>
					SAAS
				</span>
			</div>

			{/* DASHBOARD */}
			<div
				style={{
					position: 'absolute',
					left: 28,
					right: 28,
					top: 78,
					height: 350,
					background: '#FFFFFF',
					borderRadius: 16,
					border: '1px solid rgba(13,13,13,0.12)',
					overflow: 'hidden',
				}}
			>
				{/* sidebar */}
				<div
					style={{
						position: 'absolute',
						left: 0,
						top: 0,
						bottom: 0,
						width: 74,
						background: '#111',
						padding: 16,
					}}
				>
					<div
						style={{
							width: 28,
							height: 28,
							border: '1px solid rgba(255,255,255,0.4)',
							borderRadius: 7,
							marginBottom: 30,
						}}
					/>

					{[1, 2, 3, 4, 5].map((_, i) => (
						<div
							key={i}
							style={{
								width: i === 0 ? 34 : 25,
								height: 5,
								background:
									i === 0
										? '#13A66B'
										: 'rgba(255,255,255,0.25)',
								marginBottom: 20,
								borderRadius: 4,
							}}
						/>
					))}
				</div>

				{/* main */}
				<div
					style={{
						position: 'absolute',
						left: 74,
						right: 0,
						top: 0,
						bottom: 0,
						padding: 22,
						background: '#F9F9F7',
					}}
				>
					<div
						style={{
							width: 110,
							height: 13,
							background: '#111',
							marginBottom: 22,
						}}
					/>

					{/* mini stats */}
					<div
						style={{
							display: 'flex',
							gap: 10,
							marginBottom: 18,
						}}
					>
						{[1, 2, 3].map((_, i) => (
							<div
								key={i}
								style={{
									flex: 1,
									height: 58,
									background: '#FFFFFF',
									border: '1px solid rgba(13,13,13,0.09)',
									borderRadius: 7,
									padding: 10,
								}}
							>
								<div
									style={{
										width: 28,
										height: 6,
										background: '#CFCFC9',
										marginBottom: 9,
									}}
								/>

								<div
									style={{
										width: 42,
										height: 10,
										background:
											i === 1 ? '#13A66B' : '#111',
									}}
								/>
							</div>
						))}
					</div>

					{/* chart */}
					<div
						style={{
							height: 165,
							background: '#FFFFFF',
							border: '1px solid rgba(13,13,13,0.09)',
							borderRadius: 8,
							position: 'relative',
							overflow: 'hidden',
						}}
					>
						<svg
							width="100%"
							height="100%"
							viewBox="0 0 400 165"
						>
							{[35, 70, 105, 140].map((y) => (
								<line
									key={y}
									x1="20"
									y1={y}
									x2="380"
									y2={y}
									stroke="rgba(13,13,13,0.07)"
								/>
							))}

							<polyline
								points="20,130 70,116 115,122 160,92 205,104 250,70 300,82 340,45 380,55"
								fill="none"
								stroke="#111"
								strokeWidth="3"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeDasharray="700"
								strokeDashoffset={
									700 *
									(1 - p(f, 778, 824, EASE))
								}
							/>

							<circle
								cx="380"
								cy="55"
								r="5"
								fill="#13A66B"
							/>
						</svg>
					</div>
				</div>
			</div>

			<Mask
				y={rise(f, 774, 802)}
				h={54}
				style={{
					position: 'absolute',
					left: 28,
					top: 458,
				}}
			>
				<span
					style={{
						fontSize: 42,
						fontWeight: 800,
						letterSpacing: '-0.04em',
						color: INK,
					}}
				>
					SaaS & Web Apps
				</span>
			</Mask>

			<Mask
				y={rise(f, 782, 810)}
				h={34}
				style={{
					position: 'absolute',
					left: 28,
					top: 518,
				}}
			>
				<span
					style={{
						fontSize: 20,
						color: MIDGREY,
					}}
				>
					Products built for scale.
				</span>
			</Mask>

			<div
				style={{
					position: 'absolute',
					left: 28,
		right: 28,
		bottom: 22,
		display: 'flex',
		flexWrap: 'wrap',
		gap: 7,
				}}
			>
				{['Next.js',
	'React',
	'Node.js',
	'TypeScript',
	'MongoDB',
	'PostgreSQL',
	'Prisma',
	'Express.js',
	'Tailwind CSS',
	'REST API'].map((x) => (
					<span
						key={x}
						style={{
							fontSize: 12,
							color: MIDGREY,
							border: '1px solid rgba(13,13,13,0.12)',
							padding: '7px 9px',
							borderRadius: 20,
						}}
					>
						{x}
					</span>
				))}
			</div>
		</div>

		{/* ================================================= */}
		{/* BOTTOM SIGNATURE STRIP */}
		{/* ================================================= */}

		<Mask
			y={rise(f, 808, 832)}
			h={34}
			style={{
				position: 'absolute',
				left: 80,
				top: 935,
			}}
		>
			<span
				style={{
					fontSize: 17,
					fontWeight: 600,
					color: INK,
					letterSpacing: '0.08em',
					textTransform: 'uppercase',
				}}
			>
				Design · Commerce · Product
			</span>
		</Mask>

		<Mask
			y={rise(f, 816, 840)}
			h={34}
			style={{
				position: 'absolute',
				right: 80,
				top: 935,
				textAlign: 'right',
			}}
		>
			<span
				style={{
					fontSize: 17,
					color: MIDGREY,
				}}
			>
				Strategy → Design → Development
			</span>
		</Mask>
	</AbsoluteFill>
)}
				</AbsoluteFill>

				<AbsoluteFill style={layer(1.6)}>
					<LoopingUI frame={f} chips={CHIPS} exitAt={262} />
					<svg width={W} height={H} style={{position: 'absolute', inset: 0}}>
						<Cross x={60} y={60} o={0.35} />
						<Cross x={W - 60} y={60} o={0.35} />
						<Cross x={60} y={H - 60} o={0.35} />
						<Cross x={W - 60} y={H - 60} o={0.35} />
					</svg>
				</AbsoluteFill>
			</AbsoluteFill>

			{/* ---------- Gallery (dark) ---------- */}
			{gVisible && (
				<AbsoluteFill style={{background: DARK, clipPath: gClip}}>
					<Header f={f} at={332} n="01" title="Selected Work" dark />
					<Mask y={rise(f, 344, 378)} blur={blurOf(f, 344, 378)} h={130} style={{position: 'absolute', top: 124, left: 120}}>
						<span style={{fontSize: 96, fontWeight: 800, color: WHITE, letterSpacing: '-0.03em'}}>A Selection of My Work</span>
					</Mask>
					{WORK.map((w, i) => {
						const x = 120 + i * 590;
						const at = 366 + i * 16;
						const e = p(f, at, at + 36, OUT);
						const tx = p(f, at + 14, at + 40, OUT);
						const ph = TAU * (f / 240 + i / 3);
						const IMAGE_VIEW_H = 360;
						const imgH = 512 * (1218 / 800);
						const maxScroll = Math.max(0, imgH - IMAGE_VIEW_H);
						return (
							<div
								key={w.n}
								style={{
									position: 'absolute', left: x, top: 290 + 3 * Math.sin(ph), width: 540, height: 500, borderRadius: 22, background: '#292929',
									border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden', clipPath: `inset(0 ${(1 - e) * 100}% 0 0 round 22px)`,
								}}
							>
								<div style={{position: 'absolute', left: 14, top: 14, width: 512, height: IMAGE_VIEW_H, borderRadius: 14, overflow: 'hidden', background: 'linear-gradient(160deg, #f6f8fb, #e4e9f0)'}}>
									{w.scroll ? (
	<Img
		src={staticFile(w.img)}
		style={{
			position: 'absolute',
			left: 0,
			width: '100%',
			height: 'auto',
			top: -maxScroll * ((1 - Math.cos(ph)) / 2),
		}}
	/>
) : (
	<Img
		src={staticFile(w.img)}
		style={{
			width: '100%',
			height: '100%',
			objectFit: 'cover',
			objectPosition: w.pos,
			transform: `scale(${1.04 + 0.03 * Math.sin(ph)})`,
		}}
	/>
)}
									<div style={{position: 'absolute', left: 16, top: 16, padding: '0 16px', height: 34, borderRadius: 999, background: WHITE, color: INK, fontSize: 16, fontWeight: 800, lineHeight: '34px', boxShadow: '0 2px 10px rgba(0,0,0,0.12)'}}>{w.n}</div>
									<svg width={44} height={44} style={{position: 'absolute', right: 16, top: 16}}>
										<circle cx={22} cy={22} r={22} fill={INK} />
										<path d="M15 29 L29 15 M17 15 H29 V27" stroke={WHITE} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
									</svg>
								</div>
								<div style={{position: 'absolute', left: 28, right: 28, top: 392, opacity: tx, transform: `translateY(${(1 - tx) * 18}px)`}}>
									<div style={{height: 44, lineHeight: '44px', fontSize: 30, fontWeight: 800, color: WHITE, whiteSpace: 'nowrap', letterSpacing: '-0.01em'}}>{w.title}</div>
									<div style={{display: 'flex', gap: 10, marginTop: 14}}>
										{w.tags.map((tg) => (
											<span key={tg} style={{height: 34, padding: '0 16px', lineHeight: '32px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.22)', fontSize: 16, color: SOFTGREY}}>{tg}</span>
										))}
									</div>
								</div>
							</div>
						);
					})}
					<LogoStrip f={f} at={430} top={846} />
				</AbsoluteFill>
			)}

{/* ---------- Reviews + portrait (dark) ---------- */}
			{rVisible && (
				<AbsoluteFill style={{background: DARK, clipPath: rClip}}>
					<Header f={f} at={862} n="04" title="Trusted By Clients" dark />
					<Card x={120} y={150} w={520} h={340} f={f} at={872} ph={0}>
						<Quote text="He did an outstanding job and fixed the mess left by the previous developer, on time and with great attention to detail." name="Samara Jansen" role="Online Marketing" size={28} />
					</Card>
					<Card x={700} y={150} w={520} h={710} f={f} at={884} ph={0.3}>
						<Img src={staticFile('portrait.png')} style={{position: 'absolute', left: 0, top: 20, width: 520, height: 600, objectFit: 'contain', mixBlendMode: 'multiply'}} />
						<div style={{position: 'absolute', left: 36, right: 36, bottom: 24, borderTop: '1.5px solid #0d0d0d', paddingTop: 10, display: 'flex', justifyContent: 'space-between', fontSize: 18}}>
							<span style={{fontWeight: 800}}>Mujahid H<span style={{color: GREEN}}>.</span></span>
							<span style={{color: MIDGREY}}>Full Stack Web Developer</span>
						</div>
					</Card>
					<Card x={1280} y={150} w={520} h={340} f={f} at={896} ph={0.6}>
						<Quote text="It was a breeze working with Mujahid. He is really on top of his game." name="Nenad Miraz" role="Ceo" size={28} />
					</Card>
					<Card x={120} y={520} w={520} h={340} f={f} at={908} ph={0.15}>
						<Quote text="Strategic mindset: Mujahid asked the right questions, helped structure the content, and pushed our thinking." name="Abdessamad" role="Ceo, Peak & Peek" size={28} />
					</Card>
					<Card x={1280} y={520} w={520} h={340} f={f} at={920} ph={0.45}>
						<div style={{padding: '30px 36px 0'}}>
							<span style={{fontSize: 50,color: GREEN, fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 1}}>5.0</span>
							<div style={{fontSize: 26, fontWeight: 600, lineHeight: 1.4, marginTop: 8}}>Upwork Rating<br />Top Rated Freelancer</div>
						</div>
						<div style={{position: 'absolute', left: 36, right: 36, bottom: 26, borderTop: '1.5px solid #0d0d0d', paddingTop: 10, display: 'flex', justifyContent: 'space-between', fontSize: 18}}>
							<span style={{fontWeight: 800}}>8+ Years</span>
							<span style={{color: MIDGREY}}>Real-World Experience</span>
						</div>
					</Card>
					<LogoStrip f={f} at={925} top={930} />
				</AbsoluteFill>
			)}

			{/* ---------- Final brand ---------- */}
			{f >= 995 && f < 1075 && (
				<AbsoluteFill>
					<Mask y={rise(f, 998, 1033) - 110 * p(f, 1048, 1070, EASE)} blur={blurOf(f, 998, 1033)} h={170} style={{position: 'absolute', top: 340, left: 0, right: 0, textAlign: 'center'}}>
						<span style={{fontSize: 150, fontWeight: 800, color: INK, letterSpacing: '-0.03em'}}>
							Mujahid H<span style={{color: GREEN}}>.</span>
						</span>
					</Mask>
					<Mask y={rise(f, 1010, 1038) + 110 * p(f, 1048, 1070, EASE)} h={44} style={{position: 'absolute', top: 580, left: 0, right: 0, textAlign: 'center'}}>
						<span style={{fontSize: 28, fontWeight: 600, color: '#555', letterSpacing: '0.04em'}}>Full Stack Web Developer · Framer · Shopify · WordPress</span>
					</Mask>
					<Mask y={rise(f, 1020, 1048) + 110 * p(f, 1052, 1074, EASE)} h={44} style={{position: 'absolute', top: 636, left: 0, right: 0, textAlign: 'center'}}>
						<span style={{fontSize: 28, fontWeight: 600, color: GREEN, letterSpacing: '0.05em'}}>mujahidhussain.online</span>
					</Mask>
				</AbsoluteFill>
			)}
		</AbsoluteFill>
	);
};
