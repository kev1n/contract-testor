import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Sidebar from '../components/Sidebar'
import Main from '../components/Main.js'

import { useEffect, useState } from 'react'

export default function Home() {

  const [ABI, setABI] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => { //testing to see if it works
    //console.log(ABI, address)
  }, [ABI, address])

  return (
    <div className={styles.container}>
      <Head>
        <title>Contract Testor</title>
        <meta name="description" content="Contract testing locally with GUI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <Sidebar
        changeAddress = {setAddress} //calls setAddress(addy)
        changeABI = {setABI} //calls setABI(ABI)
      />
      <Main
        addy = {address}
        abi = {ABI}
      />
      
    </div>
  )
}
