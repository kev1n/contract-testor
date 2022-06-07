import { useState, useEffect } from "react";
import NoArgReadFunction from "./NoArgReadFunction.js";
import ArgReadFunction from "./ArgReadFunction.js"
import {ethers} from 'ethers';
import AnyArgWriteFunction from "./AnyArgWriteFunction.js";
import styles from "../styles/Main.module.css"

let readNoArguments = [];
let readYesArguments = [];
let writeAnyArgs = [];
export default function Main(props) {
    const contractInfo = props.abi;
    const caddress = props.addy;

    
    const write = [];


    //ethereum stuff
    let ethereum = {};
    const [account, setAccount] = useState("");
    const [contract, setContract] = useState({});
    const [ABIJSON, setABIJSON] = useState({});


    useEffect(() => {
        ethereum = window.ethereum;

        if (hasWeb3()) {
            findAccount();
        } else {
            alert("Install metamask")
        }
    })

    useEffect(() => {
        try {
            const parsed = JSON.parse(contractInfo)["abi"];
            setABIJSON(parsed) // this will call the next useEffect
        } catch (e) {
            readNoArguments = [];
            readYesArguments = [];
            console.log(e)
        }
    }, [contractInfo])

    useEffect(() => {
        parse();
    }, [ABIJSON])

    useEffect(() => {

        if (ABIJSON && caddress && account) {
            try {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const con = new ethers.Contract(caddress, ABIJSON, signer);
                setContract(con)
                //console.log("success")
            } catch (e) {
                console.log(e)
            }
        }

    }, [caddress, contractInfo, ABIJSON, account])
    
    
    const hasWeb3 = () => {
        return Boolean(ethereum);
    }

    const findAccount = async () => {
        const accounts = await ethereum.request({method: "eth_accounts"});
        //console.log(accounts)
        setAccount(accounts[0]);

    }

    const connectWallet = async () => {
        const accounts = await ethereum.request({method: 'eth_requestAccounts'});
        setAccount(accounts[0]);
    }    

    //parsing ABI
    const parse = () => {
        try {
            const tempNoArgs = [];
            const tempYesArgs = [];
            const tempWrite = [];
            for (let i = 0; i < ABIJSON.length; i++) {
                let abi = ABIJSON[i]
                
                if (abi["type"] == "function") {
                    console.log(abi)
                    if (abi["stateMutability"] == "view") {
                        if (abi["inputs"].length == 0) {
                            tempNoArgs.push(abi);
                        } else {
                            tempYesArgs.push(abi);
                        }
                    } else if (abi["stateMutability"] == "payable" || abi["stateMutability"] == "nonpayable") {
                        tempWrite.push(abi);
                    }
                }
                
            }

            readNoArguments = tempNoArgs;
            readYesArguments = tempYesArgs;
            writeAnyArgs = tempWrite;
        } catch (e) {
            console.log(e);
        }

    }

    const [render, setRender] = useState({});
    const reRenderNoArgs = (e) => {
        setRender(e)
    }
       
    
    return (
        <>
            <div className={styles.container}>
            {!account &&
            <button onClick={connectWallet}>
                Connect Wallet
            </button> 
            }
            {contract &&

            <>
                <div>
                    <div className={styles.topSection}>
                        {readNoArguments.map((abi, n) => 
                            <NoArgReadFunction key={n} ABI={abi} contract = {contract} reRender = {render}/>
                        )}
                    </div>
                    
                    {readYesArguments.map((abi, n) => 
                        <ArgReadFunction key={n} ABI={abi} contract = {contract}/>
                    )}
                    {writeAnyArgs.map((abi, n) => 
                        <AnyArgWriteFunction key={n} ABI={abi} contract = {contract} onBCStateChanged = {reRenderNoArgs}/>
                    )}
                </div>
            </>
            }
            </div>
            


            

        </>
    )
}