import { useContext, useState } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContex";

function Login() {
  //this use to set error and display
  const [error, setError] = useState("");

  const { updateUser } = useContext(AuthContext);

  //use navigate hook to send user another page
  const navigate = useNavigate();

  //make a handle submit function
  const handleSubmit = async (e) => {
    //prevent refershig
    e.preventDefault();

    //Form data is JavaScript object specifically designed to handle form data.
    const formdata = new FormData(e.target);
    //using this all the data we can get data from input fileds
    const username = formdata.get("username");

    const password = formdata.get("password");
    try {
      //we use axios to make request to send data to back end
      const res = await apiRequest.post("/auth/login", {
        username,
        password,
      });

      updateUser(res.data);

      console.log(res);
      navigate("/");
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  };

  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="password" type="password" placeholder="Password" />
          <button>Login</button>
          {error && <span>{error}</span>}
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;
