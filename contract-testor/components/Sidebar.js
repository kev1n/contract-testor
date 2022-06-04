import styles from '../styles/Sidebar.module.css'
import Form from './Form.js'
export default function Sidebar() {
    return (
        <div className={styles.container}>
            <div className={styles.centered}>
                <Form/>
            </div>
        </div>
    )
}