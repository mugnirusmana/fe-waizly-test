import BlankPage from "./../pages/blank-page"
import Dashboard from "./../pages/dashboard"
import BasicTest1 from "./../pages/basic-test-1"
import BasicTest2 from "./../pages/basic-test-2"

import Login from "./../pages/login"
import Register from "./../pages/register"

import Home from "./../pages/home"

interface TypeObject {
	path: string
	component?: any
}

interface TypesArray extends Array<TypeObject>{}

const AuthedRoute: TypesArray = [
	{
		path: "/blank-page",
		component: BlankPage,
	},
	{
		path: "/dashboard",
		component: Dashboard,
	},
	{
		path: "/basic-test-1",
		component: BasicTest1,
	},
	{
		path: "/basic-test-2",
		component: BasicTest2,
	}
]

const UnauthedRoute: TypesArray = [
	{
		path: "/login",
		component: Login,
	},
	{
		path: "/register",
		component: Register,
	}
]

const PublicRoute: TypesArray = [
	{
		path: "/",
		component: Home,
	}
]

export {
	AuthedRoute,
	PublicRoute,
	UnauthedRoute
}