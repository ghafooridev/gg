const activationTemplate = function (name, host, email, token) {
	return (
		`<div>
			<b>Hello ${name}</b>
			<hr/>
			<br>
			<span>
			Please verify your account by clicking <a href='http://${host}/api/user/confirmation/${email}/${token}' > activation </a> link
			</span>
			<br>
			Thank you
		</div>`
	)
}

module.exports = activationTemplate;