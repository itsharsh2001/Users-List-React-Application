import React from 'react'
import styles from './card.module.css'

export const Card = (props) => {
    return (
        <div className={`${styles.card} ${props.className}`}>
            {props.children}
        </div>
    )
}
