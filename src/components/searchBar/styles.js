export default {
	searchBar: {
		marginTop: '20px',
		width: '100%',
		'& form': {
			width: '100%',
			'& input': {
				width: 'calc(100% - 20px)',
				border: 'none',
				padding: '10px',
				marginBottom: '10px',
				fontFamily: 'Space Mono, monospace',
			},
			'& input:focus': {
			    outline: 'none',
			},
			'& .close': {
				textAlign: 'right',
				cursor: 'pointer'
			}
		}
	}
}
