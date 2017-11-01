import {Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

export default {
	containerCenter: {
		flex: 1,
		justifyContent: 'center',
	},
	modalHeader: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
		padding: 5
	},
	modalContainer: {
		marginHorizontal: 30,
		marginVertical: 30,
		height: height-60,
		width: width-60,
		backgroundColor: 'white',
		borderRadius: 5,
		borderWidth: 1,
		borderColor: '#ccc'
	},
	backgroundImage: {
		resizeMode: 'cover',
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height,
		justifyContent: 'flex-end'
	},

	phoneAuthText: {
		fontSize: 50,
		alignItems: 'center',
		borderBottomWidth: 1,
		borderBottomColor: 'purple',
		// textDecorationLine: 'underline',
		margin: 5
	},
	finePrint: {
		fontSize: 12,
		color: 'gray',
		marginHorizontal: 15,
		marginTop: 10
	}

}