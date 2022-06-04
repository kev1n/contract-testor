import { useState, useEffect } from "react";
import NoArgReadFunction from "./NoArgReadFunction";
import {ethers} from 'ethers';

export default function Main(props) {
    const contractInfo = props.abi;
    const caddress = props.addy;

    const readNoArguments = [];
    const readYesArguments = [];
    const write = [];

    let ABIJSON = {};

    //ethereum stuff
    let ethereum = {};
    const [account, setAccount] = useState("");
    const [contract, setContract] = useState({});
    
    useEffect(() => {
        ethereum = window.ethereum;

        if (hasWeb3()) {
            findAccount();
        } else {
            alert("Install metamask")
        }
    })

    useEffect(() => {
        parse();
        if (ABIJSON && caddress && account) {
            try {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const con = new ethers.Contract(caddress, ABIJSON, signer);
                setContract(con)
                
            } catch (e) {
                console.log(e)
            }
        }

    }, [caddress, contractInfo])
    
    const hasWeb3 = () => {
        return Boolean(ethereum);
    }

    const findAccount = async () => {
        const accounts = await ethereum.request({method: "eth_accounts"});
        setAccount(accounts[0]);

    }

    const connectWallet = async () => {
        const accounts = await ethereum.request({method: 'eth_requestAccounts'});
        setAccount(accounts[0]);
    }    

    //parsing ABI
    const parse = () => {
        try {
            ABIJSON = JSON.parse(contractInfo)["abi"];
        } catch (e) {
            console.log(contractInfo)
        }

        for (let i = 0; i < ABIJSON.length; i++) {
            let abi = ABIJSON[i]
            
            if (abi["type"] == "function") {
                //console.log(abi)
                if (abi["stateMutability"] == "view") {
                    if (abi["inputs"].length == 0) {
                        readNoArguments.push(abi);
                    } else {
                        readYesArguments.push(abi);
                    }
                }
            }
            
        }
    }

    
    parse()
       
    
    return (
        <>

            {account == "" &&
            <button onClick={connectWallet}>
                Connect Wallet
            </button> 
            }
            
            {(ABIJSON && caddress && account) &&
            <div>
                {readNoArguments.map((abi, n) => 
                    <NoArgReadFunction key={n} ABI={abi} contract = {contract}/>
                )}
            </div>

            }


            

        </>
    )
}