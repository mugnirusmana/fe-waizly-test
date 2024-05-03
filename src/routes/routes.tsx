import Chart from "./../pages/chart"
import Login from "./../pages/login"
import Home from "./../pages/home"
import Product from "./../pages/product"
import ProductDetail from "./../pages/product-detail"

const AuthedRoute = [
	{
		path: "/chart",
		component: Chart,
	}
]

const UnauthedRoute = [
	{
		path: "/login",
		component: Login,
	}
]

const PublicRoute = [
	{
		path: "/",
		component: Home,
	},
    {
		path: "/product",
		component: Product,
	},
    {
		path: "/product/:id",
		component: ProductDetail,
	}
]

export {
	AuthedRoute,
	PublicRoute,
	UnauthedRoute
}