import { COLOR_TYPES, COLORS } from '@consts'
import { getDate } from '@utils'

export class Logger {
    static info(...data) {
        const [, date] = getDate()

        console.log(
            `${COLORS.CYAN + COLOR_TYPES.BOLD}[INFO]${COLORS.NONE + COLOR_TYPES.NONE} ${
                COLORS.YELLOW + COLOR_TYPES.NONE
            }(${date})${COLORS.NONE + COLOR_TYPES.NONE}:`,
            ...data
        )
    }

    static error(...data) {
        const [, date] = getDate()

        console.log(
            `${COLORS.RED + COLOR_TYPES.BOLD}[ERROR]${COLORS.NONE + COLOR_TYPES.NONE} ${
                COLORS.YELLOW + COLOR_TYPES.NONE
            }(${date})${COLORS.NONE + COLOR_TYPES.NONE}:`,
            ...data
        )
    }
}
