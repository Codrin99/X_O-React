import React from 'react';
import styles from "./square.module.css";

export default function square(props) {
    return (
        <button className={styles.square} onClick={props.onClick}>
            {props.value}
        </button>
    )
}
