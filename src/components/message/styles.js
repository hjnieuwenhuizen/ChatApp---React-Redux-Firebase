export default {
	message: {
		'& .container': {
			display: 'flex',
			marginTop: '10px',
			'& .message': {
				position: 'relative',
				width: 'auto',
				borderRadius: "8px",
				color: 'black',
				padding: '10px',
				minWidth: '150px',
				'& .text': {
					marginRight: '100px'
				},
				'& .text, .time': {
					marginTop: 0,
					marginBottom: 0
				},
				'& .time': {
					position: 'absolute',
					bottom: '10px',
					right: '10px',
					color: 'grey',
					fontSize: '10px'
				}
			}
		},
		'& .from-me': {
			justifyContent: 'flex-end',
			marginRight: '10px',
			'&:before': {
				right: '0px',
				content: "''",
				position: 'absolute',
				borderStyle: 'solid',
				borderWidth: '14px 18px 0px 0',
				borderColor: 'transparent white transparent transparent',
				transform: 'rotate(180deg)'
			},
			'& .message': {
				background: 'white',
			},
		},
		'& .to-me': {
			justifyContent: 'flex-start',
			marginLeft: '10px',
			'& .message': {
				background: '#CCFFCC',
			},
			'&:before': {
				left: '38px',
				content: "''",
				position: 'absolute',
				borderStyle: 'solid',
				borderWidth: '0px 28px 14px 0',
				borderColor: 'transparent #CCFFCC transparent transparent'
			},
		}
	}
}
