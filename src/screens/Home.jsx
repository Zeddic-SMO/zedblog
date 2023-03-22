import React, { useContext } from "react";
import { FaUser } from "react-icons/fa";
import { BlogProvider } from "../BlogContext";
import Post from "../components/Post/Post";

const Home = () => {
  const { postLists } = useContext(BlogProvider);
  return (
    <div className="homeContainer">
      <div className="heroSection">
        <div className="leftSection">
          <div className="overlay"></div>
          <div className="content">
            <h2>Carrer Paths in the Tech Industry</h2>
          </div>
        </div>
        <div className="rightSection">
          <div className="top">
            <div className="content">
              <h2>Software Engineering</h2>
              <p>
                <FaUser />
              </p>
            </div>
          </div>
          <div className="bottom">
            <div className="content">
              <h2>Data Science and Algorithm</h2>
              <p></p>
            </div>
          </div>
        </div>
      </div>
      <div className="heroFooter">
        <p>
          <span
            style={{ color: "tomato", fontWeight: "600", marginRight: "5px" }}
          >
            Breaking News:
          </span>
          Chat GPT has taken over the whole...
        </p>
      </div>
      <div className="allPostsDisplay">
        <div className="latest-news">
          <h1>Latest News</h1>
        </div>
        {postLists &&
          postLists.map((post) => <Post post={post} key={post.id} />)}
      </div>
    </div>
  );
};

export default Home;
