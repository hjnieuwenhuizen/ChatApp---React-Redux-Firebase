export default {
	app: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		background: 'black',
		overflow: 'hidden',
		color: 'white',
		fontFamily: 'Space Mono, monospace',
		'& .contacts-container': {
			position: 'relative',
			float: 'left',
			top: 0,
			left: 0,
			height: '100%',
			width: '398px',
			borderRight: '2px solid white',
		},
		'& .chat-container': {
			position: 'relative',
			float: 'left',
			top: 0,
			left: 0,
			height: '100%',
			width: 'calc(100% - 400px)'
		}
	}
}
