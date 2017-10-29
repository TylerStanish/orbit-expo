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
	}
}