import { useEffect, useState } from "react";
import styles from "../styles/Functions.module.css";
import Query from "./Query.js"
export default function ArgReadFunction(props) {

    //console.log(props.ABI)
    //console.log(props.ABI.inputs[0]['type'])
    const contract = props.contract;
    const [args, setArgs] = useState(Array(props.ABI.inputs.length));
    const [data, setData] = useState();

    const handleQueryChange = (val) => {
        console.log(val)
        const index = val[0];
        const result = val[1];

        update(index, result)
    }
    function update(index, newValue) {
        // shallow copy
        const newArray = [...args];
        // mutate copy
        newArray[index] = newValue;
        // set state
        setArgs(newArray);
      }

    const query = async () => {
        setData("Loading...")
        try {
            console.log(args)
            const d = await contract[props.ABI.name].apply(this, args);
            setData(<p style={{"color": "green"}}>{d.toString()}</p>)
        } catch (e) {
            setData(e.toString());
            setData(<p style={{"color": "red"}}>{e.toString()}</p>)
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
                <button onClick={() => query()}>Query</button>
                <br/>

                {data}
            </div>

        </>
    )
}