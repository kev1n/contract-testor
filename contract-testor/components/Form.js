import styles from "../styles/Form.module.css";
import CInput from "./ContractInput.js";
import AInput from "./ABIInput.js"

export default function Form(props) {
    const handleAddressChange = (addy) => {
        props.liftAddress(addy);
    }

    const handleABIChange = (ABI) => {
        props.liftABI(ABI);
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