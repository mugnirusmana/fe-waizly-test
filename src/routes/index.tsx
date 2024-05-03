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

import NotFound from "./../pages/not-found"
import AuthedTemplate from "./components/AuthedComponent"
import UnauthedTemplate from "./components/UnauthedComponent"
import PublicTemplate from "./components/PublicComponent"

import { RootState } from "./../config/root-reducer";

const Routes = () => {
	const { token } = useSelector((state: RootState) => state.auth)

	return (
		<Router>
			<WrapperRoutes>
                {AuthedRoute.map((item, index) => {
					return (
						<Route
							key={index.toString()}
							path={item.path}
							element={(<AuthedTemplate comp={item.component} token={token} />)}
						/>
					)
				})}
                {UnauthedRoute.map((item, index) => {
					return (
						<Route
							key={index.toString()}
							path={item.path}
							element={(<UnauthedTemplate comp={item.component} token={token} />)}
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