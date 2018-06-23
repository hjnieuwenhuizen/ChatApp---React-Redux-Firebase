export default {
	selectUsername: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		background: 'black',
		overflow: 'hidden',
		color: 'white',
		fontFamily: 'Space Mono, monospace',
		'& .container': {
			position: 'absolute',
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			width: '200px',
			height: '73px',
			margin: 'auto',
			'& .error': {
				color: 'red',
				marginBottom: '10px'
			},
			'& input': {
				width: 'calc(100% - 10px)',
				border: 'none',
				padding: '5px',
				marginBottom: '10px',
				fontFamily: 'Space Mono, monospace'
			},
			'& input:focus, button:focus': {
			    outline: 'none',
			},
			'& button': {
				width: '100%',
				border: 'none',
				background: 'white',
				color: 'black',
				textAlign: 'center',
				paddingTop: '5px',
				paddingBottom: '5px',
				cursor: 'pointer',
				fontFamily: 'Space Mono, monospace'
			},
			'& button:hover': {
				opacity: 0.8
			}
		}
	}
}
