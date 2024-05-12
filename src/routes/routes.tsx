import BlankPage from "./../pages/blank-page"
import Dashboard from "./../pages/dashboard"
import BasicTest1 from "./../pages/basic-test-1"
import BasicTest2 from "./../pages/basic-test-2"
import BasicTest3 from "./../pages/basic-test-3"
import BackendTest1 from "./../pages/backend-test-1"
import BackendTest2 from "./../pages/backend-test-2"
import BackendTest3 from "./../pages/backend-test-3"
import BackendTest4 from "./../pages/backend-test-4"
import BackendTest5 from "./../pages/backend-test-5"
import FrontEndTest1 from "./../pages/frontend-test-1"

import Login from "./../pages/login"
import Register from "./../pages/register"

import Home from "./../pages/home"

interface TypeObject {
	path?: string
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
	},
	{
		path: "/basic-test-3",
		component: BasicTest3,
	},
	{
		path: "/backend-test-1",
		component: BackendTest1,
	},
	{
		path: "/backend-test-2",
		component: BackendTest2,
	},
	{
		path: "/backend-test-3",
		component: BackendTest3,
	},
	{
		path: "/backend-test-4",
		component: BackendTest4,
	},
	{
		path: "/backend-test-5",
		component: BackendTest5,
	},
	{
		path: '/frontend-test-1',
		component: FrontEndTest1
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