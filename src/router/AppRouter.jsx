
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom"
import { useAppStore } from "../store/useAppStore"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Page404 from "../pages/Page404"
import Navbar from "../components/layout/Navbar"
import Profile from "../pages/Profile"
import Movies from "../pages/Movies"
import Cart from "../pages/Cart"
import Shopping from "../pages/shopping"
import Admin from "../pages/admin"
import Unauthorized from "../pages/Unauthorized"


const AppRouter = () => {

    const { user, hasRole } = useAppStore()

    return (
        <BrowserRouter>
            <Navbar />
            <main>
                <Routes>
                    <Route
                        path="/"
                        element={<Home />}
                    />
                    <Route
                        path="/login"
                        element={<Login />}
                    />
                    <Route
                        path="/profile"
                        element={
                            user === null ?
                                <Navigate to="/login" />
                                :
                                <Profile />
                        }
                    />
                    <Route
                        path="/movies"
                        element={
                            user === null ?
                                <Navigate to="/login" />
                                :
                                <Movies />
                        }
                    />
                    <Route
                        path="/cart"
                        element={
                            user === null ?
                                <Navigate to="/login" />
                                :
                                <Cart />
                        }
                    />
                    <Route
                        path="/miscompras"
                        element={
                            user === null ?
                                <Navigate to="/login" />
                                :
                                <Shopping />
                        }
                    />
                    <Route
                        path="/panel"
                        element={
                            user === null ?
                                <Navigate to="/login" />
                                :
                                hasRole(["admin", "manager"]) ?
                                    <Admin />
                                    :
                                    <Unauthorized />
                        }
                    />
                    <Route
                        path="*"
                        element={<Page404 />}
                    />
                </Routes>
            </main>
        </BrowserRouter>
    )
}

export default AppRouter