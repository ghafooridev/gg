import React, { useState } from "react"

import PropType from "prop-types"

import Constant from "src/utils/Constant"
import LoginContext from "./LoginContext"

const LoginContextProvider = (props) => {
  const { children } = props
  const [page, setPage] = useState( Constant.LOGIN_PAGE.SIGN_IN)

  const changePage = function (data) {
    setPage(data)
  }

  return (
    <LoginContext.Provider value={{ changePage, page }}>
      {children}
    </LoginContext.Provider>
  )
}

LoginContextProvider.propTypes = {
  children: PropType.node.isRequired,
}
export default LoginContextProvider
