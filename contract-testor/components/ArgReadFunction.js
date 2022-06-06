import { useEffect, useState } from "react";
import styles from "../styles/Functions.module.css";

export default function ArgReadFunction(props) {

    console.log(props.ABI)
    //console.log(props.ABI.inputs[0]['type'])
    return (
        <>
                    
            <div className={styles.container}>
                {props.ABI.name}
                <br/>
                <br/>
                {props.ABI.inputs.map((obt, n) => 
                                        
                    <>
                        <div>
                            <p>{obt["name"]} ({obt['type']})</p>
                            <input></input>
                        </div>
                        <button>Write</button>
                        
                    </>

                

                    
                )}
                
            </div>

        </>
    )
}