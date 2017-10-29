import React from 'react';
import {
	Modal,
	View
} from 'react-native';
import {Icon} from 'react-native-elements';
import styles from '~/src/styles';

export default class ModalTemplate extends React.Component{

	render(){
		return(
			<Modal animationType={'slide'} transparent visible={this.props.visible}>
				<View style={styles.modalContainer}>
					<View style={styles.modalHeader}>
						<Icon
							name={'close'}
							color={'red'}
							onPress={() => this.props.close()}
							size={40}
						/>
					</View>
					{this.props.children}
				</View>
			</Modal>
		);
	}
}