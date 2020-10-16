import api from '../services/httpService';

export default {
	add: async function (data) {
		return await api.post({
			url: '/feedback',
			data
		})
	}
}


