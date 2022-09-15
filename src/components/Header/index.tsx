import React from "react";
import styles from "./Header.module.scss";
import logo from "../../assets/cloudy-day.svg";

const Header = () => {
  return (
    <>
      <a href="/dashboard" className={styles.headerContainer}>
        <img src={logo} alt="logo" />
        <span>Weather Online</span>
      </a>
    </>
  );
};

export default Header;
