const FeedbackApi = require('./Feedback');
const UserApi = require('./User');

const api = server => {
	server.use('/api/feedback', FeedbackApi);
	server.use('/api/user', UserApi);
};
module.exports = api;
