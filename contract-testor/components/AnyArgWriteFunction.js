import { useEffect, useState } from "react";
import styles from "../styles/Functions.module.css";
import Query from "./Query.js"

export default function AnyArgWriteFunction(props) {
    const contract = props.contract;

    const [args, setArgs] = useState(Array(props.ABI.inputs.length)); // create a list with the same number of arguments
    const [data, setData] = useState();
    const handleQueryChange = (val) => {
        const index = val[0];
        const result = val[1];

        update(index, result);
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
        console.log(args)
        try {
            const txn = await contract[props.ABI.name].apply(this, args);

            const { chainId } = await contract.provider.getNetwork()
            let baseurl;
            if (chainId == 1) {
                baseurl = "https://etherscan.io/tx/";
            } else if (chainId == 4) {
                baseurl = "https://rinkeby.etherscan.io/tx/";
            }
            const newurl = baseurl + txn.hash;
            let link = <a href={newurl} style={{"color": "red"}} target="_blank">{newurl}</a>
            setData(link);

            await txn.wait();

            props.onBCStateChanged(newurl); //hacky solution, just need a unique value

            link = <a href={newurl} style={{"color": "green"}} target="_blank">{newurl}</a>
            setData(link);
        } catch (e) {
            setData(<p style={{"color": "red"}}>{e.message}</p>);
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
                <br/>
                {data}
            </div>

        </>
    )
}