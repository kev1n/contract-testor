import styles from '../styles/Sidebar.module.css'
import Form from './Form.js'
export default function Sidebar(props) {

    const liftABI = (ABI) => {
        props.changeABI(ABI); //finally done lifting
    }

    const liftAddress = (addy) => {
        props.changeAddress(addy); //finally done lifting
    }

    return (
        <div className={styles.container}>
            <div className={styles.centered}>
                <Form
                    liftABI = {liftABI}
                    liftAddress = {liftAddress}
                />
            </div>
        </div>
    )
}