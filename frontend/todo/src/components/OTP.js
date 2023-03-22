import { useContext } from "react";
import AuthContext from "../context/authContext";

const OTP = () => {
  const { handleOTP } = useContext(AuthContext);
  return (
    <main className="main-container">
      <div className="header">
        <h1 style={{ color: "white" }}>Enter OTP</h1>
      </div>
      <form onSubmit={(e) => handleOTP(e)}>
        <p className="input-group">
          <label htmlFor="otp">OTP:</label>
          <input type="number" placeholder="" name="otp" id="otp" />
        </p>
        <button type="submit" id="Submit-Button">
          Submit
        </button>
      </form>
    </main>
  );
};

export default OTP;
