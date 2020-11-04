import React from "react"
import { mount,shallow } from "enzyme"

it("hello world", () => {
  const wrapper = shallow(<div>
		<div>
				<li>Hello Jest2!2</li>
			<li>Hello Jest2!</li>
		</div>
	</div>)
	console.log(wrapper.text());
	console.log(wrapper.debug());
  expect(wrapper.text()).toMatch("Hello Jest!")
})
