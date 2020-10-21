const feedbackTemplate = function (category, content) {
  return `<div>
			<b>${category}</b>
			<hr/>
			<br>
			<span>${content}</span>
		</div>`
}

module.exports = feedbackTemplate
