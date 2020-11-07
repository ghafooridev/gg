import React from "react"
import { mount, shallow } from "enzyme"

import ForgetPassword from "./index"

const defaultProps = {}

const factory = function (type, props) {
  const finalProps = { ...defaultProps, ...props }
  if (type === "mount") {
    return mount(<ForgetPassword {...finalProps} />)
  }

  return shallow(<ForgetPassword {...finalProps} />)
}

describe("Forget password", () => {
  it("Should load header text properly", () => {
    const wrapper = factory("shallow")
    console.log(wrapper.debug())
    console.log(wrapper.instance())
    console.log(wrapper)
  })
})
