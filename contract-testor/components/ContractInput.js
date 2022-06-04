import { useEffect, useState } from "react"


export default function Input(props) {

    const handleChange = (e) => {
        props.onAddressChange(e.target.value);
    }

    return (
        <>
            <label>Contract address:</label>
            <input type="text"
                    name="contract"
                    value = {props.address}
                    onChange = {handleChange}
                    />
        </>
    )
}