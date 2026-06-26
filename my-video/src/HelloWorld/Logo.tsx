import {interpolate, useCurrentFrame} from 'remotion';

export const Logo: React.FC<{
	logoColor: string;
	scale: number;
}> = ({logoColor, scale}) => {
	const frame = useCurrentFrame();

	const rotate = interpolate(frame, [0, 150], [0, Math.PI * 2]);

	return (
		<svg
			width={200 * scale}
			height={200 * scale}
			viewBox="0 0 100 100"
			style={{marginBottom: 40}}
		>
			<g transform={`rotate(${(rotate * 180) / Math.PI}, 50, 50)`}>
				<circle cx="50" cy="20" r="10" fill={logoColor} />
				<circle cx="80" cy="70" r="10" fill={logoColor} />
				<circle cx="20" cy="70" r="10" fill={logoColor} />
				<line x1="50" y1="20" x2="80" y2="70" stroke={logoColor} strokeWidth="4" />
				<line x1="80" y1="70" x2="20" y2="70" stroke={logoColor} strokeWidth="4" />
				<line x1="20" y1="70" x2="50" y2="20" stroke={logoColor} strokeWidth="4" />
			</g>
		</svg>
	);
};
