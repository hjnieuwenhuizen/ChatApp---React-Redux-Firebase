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
		'& .head': {
			position: 'fixed',
			width: '90%',
			marginLeft: '5%',
			marginTop: '10px',
			height: '40px',
			'& .back': {
				position: 'absolute',
				display: 'none',
				fontSize: '30px',
				width: '50px',
				height: '50px',
				textAlign: 'center'
			},
			'& .username': {
				position: 'absolute',
				fontSize: '25px'
			},
			'@media (max-width: 1000px)': {
				width: '100%',
				marginLeft: 0,
				'& .back': {
					display: 'block'
				},
				'& .username': {
					left: '50px',
					top: '6px'
				}
			}
		},
		'& .chat': {
			position: 'relative',
			top: '40px',
			width: '90%',
			height: 'calc(100% - 120px)',
			left: 0,
			right: 0,
			margin: 'auto',
			overflowY: 'scroll',
			overflowX: 'hidden',
			'& ol': {
				padding: 0
			},
			'& .message-end': {
				display: 'none',
			},
			'@media (max-width: 1000px)': {
				top: '68px',
				height: 'calc(100% - 110px)',
				width: '100%',
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
				},
				'@media (max-width: 1000px)': {
					'& input': {
						width: 'calc(100% - 120px)',
						border: 'none',
						borderTop: '1px solid white',
						padding: '10px',
					},
					'& button': {
						width: '100px',
						paddingTop: '5px',
						paddingBottom: '5px',
						height: '42px',
						fontSize: '20px',
						fontWeight: 'bold'
					},
					'& .distractor-containter': {
						right: '20px',
						'& .distractor': {
							border: '1px solid black',
							borderRightColor: 'transparent',
							width: '10px',
							height: '10px'
						}
					}
				}
			},
			'@media (max-width: 1000px)': {
				width: '100%',
				bottom: 0
			}
		}
	}
}
