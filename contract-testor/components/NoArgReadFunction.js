import { useEffect, useState } from "react";
import styles from "../styles/Functions.module.css";

export default function NoArgReadFunction(props) {
    const contract = props.contract;
    const [data, setData] = useState();


    useEffect(() => {
        getData();

    }, [])

    const getData = async () => {
        try {
            const d = await contract[props.ABI.name]();
            setData(d.toString())
        } catch (e) {
            console.log(e, props.ABI.name)
        }

    }
    return (
        <>
            <div className={styles.container}>
                {props.ABI.name}
                <br/>
                {data}
            </div>
        </>
    )
}