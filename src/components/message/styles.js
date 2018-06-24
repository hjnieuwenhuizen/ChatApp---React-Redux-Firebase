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
				maxWidth: '50%',
				'& .text': {
					marginTop: 0,
					marginRight: 0,
					marginBottom: '20px'
				},
				'& .time': {
					marginBottom: 0,
					position: 'absolute',
					bottom: '10px',
					right: '10px',
					color: 'grey',
					fontSize: '10px'
				},
				'@media (max-width: 1000px)': {

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
				left: 0,
				content: "''",
				position: 'absolute',
				borderStyle: 'solid',
				borderWidth: '0px 28px 14px 0',
				borderColor: 'transparent #CCFFCC transparent transparent'
			},
		}
	}
}
