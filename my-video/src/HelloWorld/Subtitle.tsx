import {interpolate, useCurrentFrame} from 'remotion';

export const Subtitle: React.FC = () => {
	const frame = useCurrentFrame();

	const opacity = interpolate(frame, [60, 80], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<p
			style={{
				fontSize: 40,
				color: '#666',
				opacity,
				textAlign: 'center',
				fontFamily: 'sans-serif',
				marginTop: 20,
			}}
		>
			Edit{' '}
			<span style={{color: '#0070f3', fontFamily: 'monospace'}}>
				src/Composition.tsx
			</span>{' '}
			to get started
		</p>
	);
};
