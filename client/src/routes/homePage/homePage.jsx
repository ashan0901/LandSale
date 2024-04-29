import { useContext } from "react";
import SearchBar from "../../components/searchBar/SearchBar";
import "./homePage.scss";
import { AuthContext } from "../../context/AuthContex";
import { Link } from "react-router-dom";

function HomePage() {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  return (
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">
            Discover Properties and Secure Your Ideal Home
          </h1>
          <p>
            With our extensive listings, personalized service, and wealth of
            industry knowledge, finding your perfect property has never been
            easier.Explore our platform and let us help you turn your real
            estate aspirations into reality.
          </p>
          {/* here the search bar */}
          {/* <SearchBar /> */}
          <Link to="/list">
            <button>Search → </button>
          </Link>
        </div>
      </div>
      <div className="imgContainer">
        <img src="/home.jpg" alt="" />
      </div>
    </div>
  );
}

export default HomePage;
