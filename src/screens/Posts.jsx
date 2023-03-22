import React, { useContext, useEffect, useState } from "react";
import { BlogProvider } from "../BlogContext";
import Post from "../components/Post/Post";
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
  }, [postLists]);

  return (
    <div className="Container">
      <div className="users-post">
        {userPosts &&
          userPosts.map((post) => <Post key={post.id} post={post} />)}
      </div>
    </div>
  );
};

export default Posts;
