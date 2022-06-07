import { useEffect, useState } from "react";
import styles from "../styles/Functions.module.css";
import Query from "./Query.js"

export default function AnyArgWriteFunction(props) {
    const contract = props.contract;
    const args = Array(props.ABI.inputs.length).fill(""); // create a list with the same number of arguments
    const [data, setData] = useState();
    const handleQueryChange = (val) => {
        const index = val[0];
        const result = val[1];

        args[index] = result;
    }

    const query = async () => {
        try {
            const d = await contract[props.ABI.name].apply(this, args);
            setData(d.toString())
        } catch (e) {
            setData(e.toString());
        }
    }
    return (
        <>
                    
            <div className={styles.container}>
                {props.ABI.name}
                <br/>
                <br/>
                {props.ABI.inputs.map((obt, n) => 
                
                   <Query key={n} index={n} name={obt["name"]} type = {obt['type']} onQueryChange = {handleQueryChange}/> 
                )}
                <button onClick={() => query()}>Write</button>
                <p>{data}</p>
            </div>

        </>
    )
}