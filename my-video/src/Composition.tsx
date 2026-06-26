import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {z} from 'zod';
import {Logo} from './HelloWorld/Logo';
import {Subtitle} from './HelloWorld/Subtitle';
import {Title} from './HelloWorld/Title';

export const myCompSchema = z.object({
	titleText: z.string(),
	titleColor: z.string(),
	logoColor: z.string(),
});

export const MyComposition: React.FC<z.infer<typeof myCompSchema>> = ({
	titleText,
	titleColor,
	logoColor,
}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const opacity = interpolate(frame, [0, 20], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	const transitionStart = 25;

	const logoScale = spring({
		fps,
		frame: frame - transitionStart,
		config: {
			damping: 100,
		},
	});

	return (
		<AbsoluteFill style={{backgroundColor: 'white'}}>
			<AbsoluteFill
				style={{
					opacity,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Logo logoColor={logoColor} scale={logoScale} />
				<Title titleText={titleText} titleColor={titleColor} />
				<Subtitle />
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
