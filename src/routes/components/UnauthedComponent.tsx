import { Navigate } from "react-router-dom"

import Template from "./../template"

interface Props {
    comp: any
    token?: string | null
}

const UnauthedComponent = ({comp: Component, token}: Props) => {
    if (!token) {
        return (
            <Template>
                <Component />
            </Template>
        )
    } else {
		return <Navigate to={"/dashboard"} />
	}
}

export default UnauthedComponent