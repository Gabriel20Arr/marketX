import React from "react";
import styles from "./Loader.module.css";

const Loading = () => {
  return (
    <div className={styles.loading}>
      <div className={styles.back}>
        <div className={styles.spinner}></div>
        <p className={styles.text}>Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
