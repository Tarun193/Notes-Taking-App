import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/authContext";

const Login = () =>{
    const {login} = useContext(AuthContext);
    return(
        <main className="main-container">
            <div className="header">
            <  h1 style={{color: "white"}}>Login Please</h1>
            </div>
            <form onSubmit={(e) => login(e)}>
                <p className="input-group">
                <label htmlFor="mobile">Mobile Number:</label>
                <input type="tel" placeholder="+16666666" name="mobile" id="mobile"/>
                </p>
                <p className="input-group">
                <label htmlFor="paswword">password:</label>
                <input type="password"  name="password" id="password"/>
                </p>
                <button type="submit" id="Submit-Button">Submit</button>
        </form>
        <div className="login-reg-question">
        <p>Not a user yet? <Link to="/Register">Register</Link></p>
        </div>
        </main>
    )

}

export default Login;