const FeedbackApi = require('../api/Feedback');
const UserApi = require('../api/User');

const api = server => {
	server.use('/api/feedback', FeedbackApi);
	server.use('/api/user', UserApi);
};
module.exports = api;
