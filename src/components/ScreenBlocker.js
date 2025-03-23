import React, { useState, useEffect } from "react";

const ScreenBlocker = ({ children }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  if (isSmallScreen) {
    return (
      <div style={styles.blockScreen}>
        <h2 style={styles.text}>Screen too small</h2>
        <p style={styles.subText}>
          Please use a larger screen to access this application.
        </p>
      </div>
    );
  }

  return children;
};

const styles = {
  blockScreen: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vw",
    backgroundColor: "#222",
    color: "#fff",
    textAlign: "center",
  },
  text: {
    fontSize: "24px",
    fontWeight: "bold",
  },
  subText: {
    fontSize: "18px",
    marginTop: "10px",
  },
};

export default ScreenBlocker;
