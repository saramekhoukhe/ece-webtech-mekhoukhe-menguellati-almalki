import React from "react";
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

function Footer() {
  return (
    <footer className={styles.footer}>
      <a
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by{' '}
        <span className={styles.logo}>
          ECE master students
        </span>
      </a>
    </footer>
  );
}

export default Footer;
