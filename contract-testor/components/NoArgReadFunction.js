import { useState } from "react";


export default function NoArgReadFunction(props) {
    console.log(
        props.ABI
    )


    return (
        <>
            <div>
                {props.ABI.name}
            </div>
        </>
    )
}