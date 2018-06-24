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
			overflowX: 'hidden',
			overflowY: 'scroll',
		},
		'& ::-webkit-scrollbar': { 
			display: 'none', 
		},
		'& .chat-container': {
			position: 'relative',
			float: 'left',
			top: 0,
			left: 0,
			height: '100%',
			width: 'calc(100% - 400px)'
		},
		'@media (max-width: 1000px)': {
			'& .contacts-container': {
				width: '100%',
				borderRight: 'none',
				position: 'absolute'
			},
			'& .chat-container': {
				width: '100%',
				position: 'absolute'
			},
			'& .contacts-container.show-contacts': {
				transform: 'translateX(0)'
			},
			'& .contacts-container.hide-contacts': {
				transform: 'translateX(-100%)'
			},
			'& .chat-container.show-contacts': {
				transform: 'translateX(100%)'
			},
			'& .chat-container.hide-contacts': {
				transform: 'translateX(0)'
			},
		}
	}
}
