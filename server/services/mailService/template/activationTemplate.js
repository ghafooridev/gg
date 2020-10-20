const activationTemplate = function (name, host, email, token) {
	return (
		`<div>
			<b>Hello ${name}</b>
			<hr/>
			<br>
			<span>
			Please verify your account by clicking the link: http://${host}/api/user/confirmation/${email}/${token}
			</span>
			<br>
			Thank you
		</div>`
	)
}

module.exports = activationTemplate;