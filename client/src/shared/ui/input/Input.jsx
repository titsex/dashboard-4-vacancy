import styles from './Input.module.css'

const Input = ({ name, error, register, ...props }) => {
    return (
        <>
            <input
                autoComplete={name}
                className={`${styles.input} dark:bg-black mt-5`}
                {...register(name)}
                {...props}
            />
            {error && <span className={styles.error}>{error.message}</span>}
        </>
    )
}

export default Input
