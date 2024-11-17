import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";

function InactivityHandler() {
  const timerRef = useRef(null);
  const INACTIVITY_TIME = 15 * 60 * 1000; // 15 minutes
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user session
    localStorage.removeItem("authData"); // Remove authentication token or session data

    // Notify the user
    notifications.show({
      title: "Logged Out",
      message: "You have been logged out due to inactivity.",
      color: "red",
    });

    // Redirect to login
    navigate("/accounts/login");
  };

  const resetTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(handleLogout, INACTIVITY_TIME);
  };

  useEffect(() => {
    const events = ["mousemove", "keydown", "click", "scroll"];
    events.forEach((event) => document.addEventListener(event, resetTimer));
    resetTimer();

    return () => {
      events.forEach((event) =>
        document.removeEventListener(event, resetTimer)
      );
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return null;
}

export default InactivityHandler;
