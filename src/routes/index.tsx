import React from "react"
import {
  Routes as WrapperRoutes,
  Route,
  BrowserRouter as Router,
} from "react-router-dom"
import { useSelector } from "react-redux"

import {
	UnauthedRoute,
	AuthedRoute,
	PublicRoute
} from "./routes"

import { RootState } from "../config/store"

import NotFound from "./../pages/not-found"
import AuthedTemplate from "./components/AuthedComponent"
import UnauthedTemplate from "./components/UnauthedComponent"
import PublicTemplate from "./components/PublicComponent"

const Routes = () => {
	const auth = useSelector((state: RootState) => state?.auth)

	return (
		<Router>
			<WrapperRoutes>
				{AuthedRoute.map((item, index) => {
					return (
						<Route
							key={index.toString()}
							path={item.path}
							element={(<AuthedTemplate comp={item.component} token={auth?.data?.access_token} />)}
						/>
					)
				})}
                {UnauthedRoute.map((item, index) => {
					return (
						<Route
							key={index.toString()}
							path={item.path}
							element={(<UnauthedTemplate comp={item.component} token={auth?.data?.access_token} />)}
						/>
					)
				})}
                {PublicRoute.map((item, index) => {
					return (
						<Route
							key={index.toString()}
							path={item.path}
							element={(<PublicTemplate comp={item.component} />)}
						/>
					)
				})}
                <Route path="*" element={<NotFound />} />
            </WrapperRoutes>
        </Router>
    )
}

export default Routes