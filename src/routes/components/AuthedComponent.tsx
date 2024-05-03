import { Navigate } from "react-router-dom"

import Template from "./../template"

interface Props {
    comp: any
    token?: string | null
}

const AuthedComponent = ({comp: Component, token}: Props) => {
    if (token) {
        return (
            <Template>
                <Component />
            </Template>
        )
    } else {
		return <Navigate to={"/login"} />
	}
}

export default AuthedComponent