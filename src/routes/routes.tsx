import Dashboard from "./../pages/dashboard"
import Login from "./../pages/login"
import Home from "./../pages/home"

interface TypeObject {
	path: string;
	component?: any;
}

interface TypesArray extends Array<TypeObject>{}

const AuthedRoute: TypesArray = [
	{
		path: "/dashboard",
		component: Dashboard,
	}
]

const UnauthedRoute: TypesArray = [
	{
		path: "/login",
		component: Login,
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