export default {
	contacts: {
		position: 'absolute',
		width: 'calc(100% - 2px)',
		height: '100%',
		background: 'black',
		borderRight: '2px solid white',
		'& .your-username': {
			width: '90%',
			background: 'white',
			color: 'black',
			position: 'relative',
			margin: 'auto',
			left: 0,
			right: 0,
			padding: '5px',
			marginTop: '20px',
			textAlign: 'center'
		},
		'& .contacts': {
			width: '90%',
			margin: 'auto',
			marginTop: '20px',
			marginBottom: '20px',
			'& .contact': {
				border: '2px solid white',
				width: 'calc(100% - 10px)',
				lineHeigth: '60px',
				paddingLeft: '5px',
				paddingTop: '10px',
				paddingBottom: '10px',
				cursor: 'pointer',
			},
			'& .contact:hover': {
				opacity: 0.8
			}
		},
		'& .add-contact, .sign-out': {
			width: '90%',
			background: 'white',
			color: 'black',
			cursor: 'pointer',
			position: 'relative',
			margin: 'auto',
			left: 0,
			right: 0,
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
