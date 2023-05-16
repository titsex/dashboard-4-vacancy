import { immer } from 'zustand/middleware/immer'
import { persist } from 'zustand/middleware'
import { create } from 'zustand'

const storage = persist(
    (set, get) => ({
        setCurrent: (theme) => {
            set((state) => {
                state.current = theme
            })
        },

        change: (theme) => {
            if (theme === 'dark') document.documentElement.classList.add('dark')
            if (theme === 'light') document.documentElement.classList.remove('dark')
        },

        setDevice: () => {
            set((state) => {
                if (window.matchMedia('(prefers-color-scheme: dark)').matches) state.device = 'dark'
                else state.device = 'light'
            })
        },
    }),
    {
        name: 'theme',
    }
)

export const themeStore = create(immer(storage))
