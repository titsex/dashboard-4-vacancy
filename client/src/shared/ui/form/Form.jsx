import styles from './Form.module.css'
import React from 'react'

const Form = ({ register, handler, title, children }) => {
    return (
        <form className={`${styles.form} dark:bg-dark-theme`} onSubmit={handler}>
            <h1 className="text-center text-lg font-medium">{title}</h1>

            {Array.isArray(children)
                ? children.map((child) => {
                      return child?.props?.name
                          ? React.createElement(child.type, {
                                ...{
                                    ...child.props,
                                    register,
                                    key: child.props.name,
                                },
                            })
                          : child
                  })
                : children}
        </form>
    )
}

export default Form
