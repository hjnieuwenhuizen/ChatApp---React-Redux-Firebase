export default {
	contacts: {
		position: 'absolute',
		width: '90%',
		margin: 'auto',
		left: 0,
		right: 0,
		height: '100%',
		background: 'black',
		'& .your-username': {
			width: '100%',
			color: 'white',
			position: 'relative',
			padding: '5px',
			marginTop: '20px',
			textAlign: 'center',
			fontSize: '25px'
		},
		'& .contacts': {
			width: '100%',
			marginTop: '40px',
			marginBottom: '50px',
			'& .distractor-container': {
				position: 'relative',
				height: '60px'
			},
			'& .contact': {
				border: '2px solid #CCFFCC',
				width: 'calc(100% - 10px)',
				lineHeigth: '60px',
				paddingLeft: '5px',
				paddingTop: '10px',
				paddingBottom: '10px',
				cursor: 'pointer',
				textAlign: 'center',
				color: '#CCFFCC',
				marginTop: '10px'
			},
			'& .contact:hover': {
				opacity: 0.8
			}
		},
		'& .add-contact, .sign-out': {
			width: '100%',
			background: 'white',
			color: 'black',
			cursor: 'pointer',
			position: 'relative',
			textAlign: 'center',
			paddingTop: '5px',
			paddingBottom: '5px',
			marginBottom: '20px'
		},
		'& .add-contact:hover, .sign-out:hover': {
			opacity: 0.8
		}
	}
}
