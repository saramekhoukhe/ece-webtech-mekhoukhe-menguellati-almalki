import React from "react";
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

function Header() {
  return (
    <Head>
      <title>App</title>
      <meta name="description" content="App" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
export default Header;
