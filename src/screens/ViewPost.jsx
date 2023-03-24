import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BlogProvider } from "../BlogContext";
import { RWebShare } from "react-web-share";
import { BsFillShareFill } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { auth } from "../fire-base/FireBase";

const ViewPost = () => {
  const currentUser = auth.currentUser ? auth.currentUser.uid : false;
  const navigate = useNavigate();
  const { postLists } = useContext(BlogProvider);
  const { id } = useParams();
  const [singlePost, setSinglePost] = useState(null);
  const [others, setOthers] = useState(null);

  useEffect(() => {
    if (postLists) filterPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postLists, id]);

  const filterPosts = () => {
    const post = postLists.find((post) => {
      return post.id === id;
    });
    setSinglePost(post);

    const others = postLists.filter((post) => {
      return post.id !== id;
    });
    setOthers(others);
  };

  return (
    <div className="Container">
      {singlePost && (
        <>
          <div className="bg-img">
            <img src={singlePost.postImg} alt="Post" />
          </div>
          <div className="single-post-container">
            <div className="single-post">
              <div className="single-post-content">
                <h2>{singlePost.title}</h2>
                <div dangerouslySetInnerHTML={{ __html: singlePost.body }} />
              </div>
              <div className="post-icons">
                <span className="share-btn" title="Share post with friends!">
                  <RWebShare
                    data={{
                      text: singlePost.body.slice(0, 30),
                      url: "",
                      title: singlePost.title,
                    }}
                    onClick={() => console.log("shared successfully!")}
                  >
                    <BsFillShareFill />
                  </RWebShare>
                </span>

                {currentUser && currentUser === singlePost.signedInUserID && (
                  <span
                    title="Edit Post"
                    onClick={() => navigate(`/update/${id}`)}
                  >
                    <BiEdit />
                  </span>
                )}
              </div>
            </div>
            <div className="single-sidebar">
              <div className="single-sideberHeading">Others</div>
              <div className="others-container">
                {others &&
                  others.map((post) => {
                    return (
                      <ul key={post.id}>
                        <li onClick={() => navigate(`/view/${post.id}`)}>
                          &gt; {post.title}
                        </li>
                      </ul>
                    );
                  })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ViewPost;
