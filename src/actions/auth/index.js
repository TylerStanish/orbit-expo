import axios from 'axios';

export const signInWithPhone = (phone) => {
	return dispatch => {
		axios.post(process.env.URL + '/signInWithPhone', {
			phone
		}).then(() => {

		}).catch(e => {

		});
	}
};