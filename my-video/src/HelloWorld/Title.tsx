import {interpolate, useCurrentFrame} from 'remotion';

export const Title: React.FC<{
	titleText: string;
	titleColor: string;
}> = ({titleText, titleColor}) => {
	const frame = useCurrentFrame();

	const opacity = interpolate(frame, [30, 50], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<h1
			style={{
				fontSize: 100,
				fontWeight: 'bold',
				color: titleColor,
				opacity,
				textAlign: 'center',
				fontFamily: 'sans-serif',
			}}
		>
			{titleText}
		</h1>
	);
};
