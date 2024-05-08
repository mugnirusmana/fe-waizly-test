import { Navigate } from "react-router-dom"

import AuthedTemplate from "./../templates/authedTemplate"

interface Props {
    comp: any
    token?: string | null
}

const AuthedComponent = ({comp: Component, token}: Props) => {
  if (token) {
    return (
      <AuthedTemplate>
        <Component />
      </AuthedTemplate>
    )
  } else {
    return <Navigate to={"/login"} />
  }
}

export default AuthedComponent