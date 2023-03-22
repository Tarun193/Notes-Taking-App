import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/authContext";

const Register = () => {
  const { Register } = useContext(AuthContext);
  return (
    <main className="main-container">
      <div className="header">
        <h1 style={{ color: "white" }}>Register Please</h1>
      </div>
      <form onSubmit={(e) => Register(e)}>
        <p className="input-group">
          <label htmlFor="name">Full Name:</label>
          <input type="text" placeholder="Raj" name="name" id="name" />
        </p>
        <p className="input-group">
          <label htmlFor="mobile">Mobile Number:</label>
          <input type="tel" placeholder="+16666666" name="mobile" id="mobile" />
        </p>
        <p className="input-group">
          <label htmlFor="paswword">password:</label>
          <input type="password" name="password" id="password" />
        </p>
        <button type="submit" id="Submit-Button">
          Submit
        </button>
      </form>
      <div className="login-reg-question">
        <p>
          User? <Link to="/Login">Login</Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
