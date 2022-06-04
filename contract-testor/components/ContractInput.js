import { useState } from "react"


export default function CInput(props) {

    const handleChange = (e) => {
        props.onAddressChange(e.target.value);
    }

    return (
        <>
            <label>Contract address:</label>
            <input type="text"
                    name="contract"
                    onChange = {handleChange}
                    style={{width: "100%"}}
                    />
        </>
    )
}