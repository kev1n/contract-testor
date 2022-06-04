import styles from "../styles/Form.module.css";
import CInput from "./ContractInput.js";
import {useState} from 'react';

export default function Form() {
    const [address, setAddress] = useState("");
    const handleAddressChange = (addy) => {
        setAddress(addy);
    }

    return (
        <div className={styles.container}>
            <CInput
                onAddressChange = {handleAddressChange}
            />
            <label >ABI:</label>
            <textarea type="text" name="abi" className={styles.input} style={{ height: "90%", resize: "none"}}/>
        </div>
    )
}