export default {
	chat: {
		position: 'relative',
		width: '100%',
		height: '100%',
		color: 'white',
		fontFamily: 'Space Mono, monospace',
		'& .no-chat-selected': {
			textAlign: 'center',
			height: '10px',
			width: '100%',
			position: 'absolute',
			margin: 'auto',
			top: 0,
			bottom: 0
		},
		'& .chat': {
			position: 'relative',
			top: '20px',
			width: '90%',
			height: 'calc(100% - 120px)',
			left: 0,
			right: 0,
			margin: 'auto',
			overflowY: 'scroll',
			'& .message-end': {
				display: 'none',
			}
		},
		'& ::-webkit-scrollbar': { 
			display: 'none', 
		},
		'& .send': {
			position: 'absolute',
			bottom: '20px',
			width: '90%',
			margin: 'auto',
			left: 0,
			right: 0,
			'& .container': {
				'& input:focus, button:focus': {
					outline: 'none',
				},
				'& input': {
					width: 'calc(100% - 244px)',
					float: 'left',
					border: '2px solid white',
					padding: '20px',
					background: 'transparent',
					color: 'white',
					fontFamily: 'Space Mono, monospace'
				},
				'& button': {
					width: '200px',
					float: 'left',
					border: 'none',
					background: 'white',
					color: 'black',
					textAlign: 'center',
					paddingTop: '5px',
					paddingBottom: '5px',
					cursor: 'pointer',
					height: '63px',
					fontFamily: 'Space Mono, monospace',
					fontSize: '22px',
					fontWeight: 'bold'
				},
				'& button:hover': {
					opacity: 0.8
				},
				'& .distractor-containter': {
					position: 'absolute',
					right: '50px',
					top: 0,
					bottom: 0,
					'& .distractor': {
						border: '2px solid black',
						borderRightColor: 'transparent'
					}
				}
			}
		}
	}
}
