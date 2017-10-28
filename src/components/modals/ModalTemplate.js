import React from 'react';
import {
	Modal,
	View
} from 'react-native';
import {Icon} from 'react-native-elements';

export default class ModalTemplate extends React.Component{

	state = {
		visible: false
	}

	open(){
		this.setState({visible: true});
	}

	render(){
		return(
			<Modal visible={this.state.visible}>
				<View style={styles.modalHeader}>
					<Icon
						name={'close'}
						color={'red'}
						onPress={() => this.setState({visible: false})}
					/>
				</View>
				{React.Children.map(this.props.children, child => {
					React.cloneElement(child, {
						close: this.setState({visible: false}),
						open: this.setState({visible: true})
					});
				})}
			</Modal>
		);
	}
}

const styles = {
	modalHeader: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center'
	}
}