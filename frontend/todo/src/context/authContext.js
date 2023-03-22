import { useState, createContext, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import jwt_decode from "jwt-decode";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const temp = localStorage.getItem("authToken")
    ? jwt_decode(JSON.parse(localStorage.getItem("authToken")).access)
    : null;
  const navigate = useNavigate();
  const [authToken, setAuthToken] = useState(
    localStorage.getItem("authToken")
      ? JSON.parse(localStorage.getItem("authToken"))
      : null
  );
  const [user, setUser] = useState(temp);

  const [loading, setLoading] = useState(true);
  const [number, setNumber] = useState(null);

  const login = async (e) => {
    e.preventDefault();
    console.log("chill");
    try {
      const response = await api.post("token/", {
        mobileNo: e.target.mobile.value,
        password: e.target.password.value,
      });
      const data = response.data;
      setAuthToken(data);
      setUser(jwt_decode(data.access));
      console.log(jwt_decode(data.access));
      localStorage.setItem("authToken", JSON.stringify(data));
      navigate("/");
    } catch {
      alert("Something went Wrong.");
    }
  };

  let logoutUser = () => {
    setAuthToken(null);
    setUser(null);
    localStorage.removeItem("authToken");
    navigate("/");
  };

  // Function for regstering the user;
  const Register = (e) => {
    e.preventDefault();
    try {
      api.post("Register/", {
        name: e.target.name.value,
        number: e.target.mobile.value,
        password: e.target.password.value,
        username: e.target.name.value,
      });
      setNumber(e.target.mobile.value);
      navigate("OTP/");
    } catch {
      console.log("Error");
      alert("Something Went Wrong !!!!");
    }
  };

  // Function for handing OTP input;
  const handelOTP = (e) => {
    e.preventDefault();
    const otp = e.target.otp.value;
    try {
      e.target.otp.value = null;
      api.post("verifyOTP/", {
        number: number,
        otp: otp,
      });
      alert("Successfully Verfied!!");
      navigate("login/");
    } catch {
      alert("Something went wrong !!!");
    }
  };

  let updateToken = useCallback(async () => {
    if (user) {
      try {
        let response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refresh: authToken?.refresh }),
        });

        const data = await response.json();

        if (response.status === 200) {
          data["refresh"] = authToken?.refresh;
          setAuthToken(data);
          setUser(jwt_decode(data.access));
          localStorage.setItem("authToken", JSON.stringify(data));
        }
      } catch {
        navigate("login/");
      }
    }
    if (loading) {
      setLoading(false);
    }
  }, [authToken, loading, navigate, user]);

  useEffect(() => {
    if (loading) {
      updateToken();
    }
    let fourMinutes = 1000 * 60 * 4;
    let interval = setInterval(() => {
      if (authToken) {
        updateToken();
      }
    }, fourMinutes);
    return () => clearInterval(interval);
  }, [authToken, updateToken, loading]);

  let contextData = {
    user: user,
    authTokens: authToken,
    login: login,
    logout: logoutUser,
    Register: Register,
    handleOTP: handelOTP,
  };
  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
