import api from '../services/httpService';

export default {
	register: async function (data) {
		return await api.post({
			url: '/user/register',
			data
		})
	}
}


