import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import apiRequest from "../../lib/apiRequest";

function Register() {
  //this use to set error and display
  const [error, setError] = useState("");

  //use navigate hook to send user another page
  const navigate = useNavigate();

  //password validation

  const isValidPassword = (password) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;
    return re.test(String(password));
  };

  //make a handle submit function
  const handleSubmit = async (e) => {
    //prevent refershig
    e.preventDefault();

    //Form data is JavaScript object specifically desig ned to handle form data.
    const formdata = new F ormData(e.target);
    //using this all the data we can get data from input fileds
    const username = formdata.get("username");
    const email = formdata.get("email");
    const password = formdata.get("password");

    if (!isValidPassword(password)) {
      setError(
        "Your password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character (e.g., !, @, #, ?)."
      );
      return;
    }
    try {
      //we use axios to make request to send data to back end
      const res = await apiRequest.post("/auth/register", {
        username,
        email,
        password,
      });
      console.log(res.data);
      navigate("/login");
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  };

  return (
    <div className="register">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input name="username" type="text" placeholder="Username" required />
          <input name="email" type="email" placeholder="Email" required />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
          />
          <button>Register</button>
          {/* show error to user */}
          {error && <span>{error}</span>}

          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Register;
