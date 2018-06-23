export default {
	'@keyframes rotate-forever': {
	    from: { transform: 'rotate(0deg)' },
	    to: { transform: 'rotate(360deg)' },
  	},
	distractorContainer: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		background: 'black',
		'& .distractor': {
			position: 'absolute',
			width: '30px',
			height: '30px',
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			margin: 'auto',
			border: '3px solid white',
			borderRightColor: 'transparent',
			borderRadius: '50%',
			animationName: 'rotate-forever',
			animationDuration: '0.7s',
			animationIterationCount: 'infinite',
			animationTimingFunction: 'linear'
		}
	}
}
