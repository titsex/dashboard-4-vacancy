import { persist, createJSONStorage } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { create } from 'zustand'

const storage = persist(
    (set, get) => ({
        setToken: (token) => {
            set((state) => {
                state.token = token
            })
        },

        getToken: () => get().token,
    }),
    {
        name: 'token',
        storage: createJSONStorage(() => sessionStorage),
    }
)

export const tokenStore = create(immer(storage))
