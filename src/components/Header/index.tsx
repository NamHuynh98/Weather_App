import React from "react";
import styles from "./Header.module.scss";
import logo from "../../assets/cloudy-day.svg";

const Header = () => {
  return (
    <div className={styles.headerContainer}>
      <a href="/dashboard">
        <img src={logo} alt="logo" />
        <span>Weather Online</span>
      </a>
    </div>
  );
};

export default Header;
