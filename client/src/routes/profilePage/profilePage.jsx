import { Link, useLoaderData, useNavigate } from "react-router-dom";

import List from "../../components/list/List";
import apiRequest from "../../lib/apiRequest";
import "./profilePage.scss";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContex";

function ProfilePage() {
  const { updateUser, currentUser } = useContext(AuthContext);
  const data = useLoaderData();
  //to navigate user
  const navigate = useNavigate();

  //handle logout user
  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      //clear local storage
      updateUser(null);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <Link to="/profile/update">
              <button>Update Profile</button>
            </Link>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img src={currentUser.avatar || "noavatar.jpg"} alt="" />
            </span>
            <span>
              Username: <b>{currentUser.username}</b>
            </span>
            <span>
              E-mail: <b>{currentUser.email}</b>
            </span>
            <button onClick={handleLogout}>Log Out</button>
          </div>
          <div className="title">
            <h1>Create a New Post </h1>
            <Link to="/add">
              <button>Create New Post</button>
            </Link>
          </div>
          {/* <List />
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <List /> */}
        </div>
      </div>
      <div className="chatContainer">
        <img src="/profile.jpg" alt="" />
      </div>
    </div>
  );
}

export default ProfilePage;
