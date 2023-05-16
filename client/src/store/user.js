import { immer } from 'zustand/middleware/immer'
import { persist } from 'zustand/middleware'
import { create } from 'zustand'

const storage = persist(
    (set) => ({
        setUser: (user) => {
            set((state) => {
                state.user = user
            })
        },

        setIsAuth: (isAuth) => {
            set((state) => {
                state.isAuth = isAuth
            })
        },
    }),
    { name: 'user' }
)

export const userStore = create(immer(storage))
