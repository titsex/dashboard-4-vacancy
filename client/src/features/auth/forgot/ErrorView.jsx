import { useNavigate } from 'react-router-dom'

const ErrorView = ({ error }) => {
    const navigate = useNavigate()

    return (
        <div className="flex flex-col shadow dark:bg-dark-theme bg-light-theme p-5 rounded-lg">
            <h1 className="text-2xl text-red-600 text-center">Recovery Error</h1>
            <span>{error}</span>

            <button
                onClick={() => navigate('/', { replace: true })}
                className="text-black py-1 mt-5 bg-cyan-300 rounded-lg font-medium text-lg"
            >
                Go Home
            </button>
        </div>
    )
}

export default ErrorView
