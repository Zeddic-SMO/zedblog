import React, { useContext, useEffect, useState } from "react";
import { BlogProvider } from "../BlogContext";
import Post from "../components/Post/Post";
import Spinner from "../components/Spinner/Spinner";
import { auth } from "../fire-base/FireBase";

const Posts = () => {
  const currentUser = auth.currentUser.uid;
  const { postLists } = useContext(BlogProvider);
  const [userPosts, setUserPosts] = useState(null);

  useEffect(() => {
    if (postLists) {
      const filteredPosts = postLists.filter((post) => {
        return post.signedInUserID === currentUser;
      });
      setUserPosts(filteredPosts);
    }
  }, [postLists, currentUser]);

  return (
    <div className="Container">
      <div className="posts-headings">
        <h1>My Recent Posts</h1>
      </div>
      {userPosts ? (
        <div className="users-post" style={{ minHeight: "70vh" }}>
          {userPosts &&
            userPosts.map((post) => <Post key={post.id} post={post} />)}
        </div>
      ) : (
        <div style={{ height: "100vh" }}>
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default Posts;
