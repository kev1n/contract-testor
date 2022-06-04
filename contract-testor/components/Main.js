import { useEffect } from "react";

export default function Main(props) {
    const contractInfo = props.abi;
    const address = props.addy;

    const readNoArguments = [];
    const readYesArguments = [];
    const write = [];

    let ABIJSON = {};

    useEffect(() => {
        parse();
    })

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

    

       
    
    return (
        <>
            <div>
                {readNoArguments.map((abi) => 
                    
                )}
            </div>
            

        </>
    )
}