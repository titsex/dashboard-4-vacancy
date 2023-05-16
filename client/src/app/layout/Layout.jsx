import styles from './Layout.module.css'
import api from 'shared/api/axios.js'
import axios from 'axios'

import { ActivateAccountPageRoute, RecoveryPasswordPageRoute, ActivateAccountPage, RecoveryPasswordPage } from 'pages'
import { NavLink, Outlet, useMatch } from 'react-router-dom'
import { userStore, themeStore, tokenStore } from 'store'
import { Bird, User, Sun, LogOut } from 'lucide-react'
import { Auth } from 'features/auth/Auth.jsx'
import { config } from 'shared/lib/config.js'
import { useEffect } from 'react'

const linkStyle = ({ isActive }) => (isActive ? `${styles.link} bg-cyan-300 rounded-lg text-black` : `${styles.link}`)

const Layout = () => {
    const theme = themeStore((state) => state)

    theme.setDevice()
    theme.change(theme.current || theme.device)

    const switchThemeHandler = () => {
        theme.setCurrent((theme.current || theme.device) === 'dark' ? 'light' : 'dark')
        theme.change(theme.current)
    }

    const [isAuth, setIsAuth, setUser] = userStore((state) => [state.isAuth, state.setIsAuth, state.setUser])
    const [getToken, setToken] = tokenStore((state) => [state.getToken, state.setToken])

    useEffect(() => {
        if (getToken())
            axios
                .get(`${config.API_URL}/user/refresh`, { withCredentials: true })
                .then(({ data }) => {
                    setUser(data.user)
                    setToken(data.accessToken)
                    setIsAuth(true)
                })
                .catch(() => {
                    setIsAuth(false)

                    userStore.persist.clearStorage()
                    tokenStore.persist.clearStorage()
                })
    }, [])

    const logoutHandler = () =>
        api.get('/user/signout').then(() => {
            setIsAuth(false)

            userStore.persist.clearStorage()
            tokenStore.persist.clearStorage()
        })

    const matchActivateAccountPath = useMatch(ActivateAccountPageRoute.path)
    const matchRecoveryPasswordPath = useMatch(RecoveryPasswordPageRoute.path)

    return (
        <div className="flex dark:text-white text-black transition-colors duration-[500ms]">
            {isAuth && (
                <aside className="h-screen dark:bg-dark-theme bg-light-theme w-1/5">
                    <NavLink className="text-3xl flex justify-center mt-3" to="/">
                        Dashboard
                    </NavLink>

                    <hr className="mt-3 h-1 dark:bg-violet-500 bg-purple-300 border-0 w-52 mx-auto rounded" />

                    <ul className="flex flex-col mt-3">
                        <NavLink className={linkStyle} to="/">
                            <User className="mr-3" />
                            <span>Profile</span>
                        </NavLink>

                        <NavLink className={linkStyle} to="/pets">
                            <Bird className="mr-3" />
                            <span>Pets</span>
                        </NavLink>
                    </ul>
                </aside>
            )}

            <main className="dark:bg-black bg-white flex w-full justify-center h-screen items-center">
                <div className="flex gap-5 absolute right-5 top-5">
                    <button onClick={switchThemeHandler}>
                        <Sun className="outline-none" />
                    </button>
                    {isAuth && (
                        <button onClick={logoutHandler}>
                            <LogOut className="text-red-600 outline-none" />
                        </button>
                    )}
                </div>

                {isAuth && <Outlet />}
                {!isAuth && !matchActivateAccountPath && !matchRecoveryPasswordPath && <Auth />}
                {!isAuth && matchActivateAccountPath && !matchRecoveryPasswordPath && <ActivateAccountPage />}
                {!isAuth && matchRecoveryPasswordPath && !matchActivateAccountPath && <RecoveryPasswordPage />}
            </main>
        </div>
    )
}

export default Layout
