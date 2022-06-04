import { useState } from "react"

export default function AInput(props) {

    const handleChange = (e) => {
        props.onABIChange(e.target.value);
    }

    return (
        <>
            <label >ABI:</label>
            <textarea
            type="text"
            name="abi"
            onChange = {handleChange}
            style={{ height: "90%", width: "100%", resize: "none"}}/>
        </>
    )
}