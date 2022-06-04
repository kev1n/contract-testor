import styles from "../styles/Form.module.css";
import CInput from "./ContractInput.js";
import AInput from "./ABIInput.js"

import {useState} from 'react';

export default function Form() {
    const [address, setAddress] = useState("");
    const [abi, setAbi] = useState("");

    const handleAddressChange = (addy) => {
        setAddress(addy);
    }

    const handleABIChange = (ABI) => {
        setAbi(ABI);
    }

    return (
        <div className={styles.container}>
            <CInput
                onAddressChange = {handleAddressChange}
            />
            <AInput
                onABIChange = {handleABIChange}
            />
        </div>
    )
}