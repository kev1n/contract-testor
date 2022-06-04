import styles from "../styles/Form.module.css"

export default function Form() {
    return (
        <div className={styles.container}>
            
            <label for="contract" >Contract Address:</label>
            <input type="text" name="contract" className={styles.input}/>
            <label for="abi">ABI:</label>
            <textarea type="text" name="abi" className={styles.input} style={{ height: "90%", resize: "none"}}/>


        </div>
    )
}