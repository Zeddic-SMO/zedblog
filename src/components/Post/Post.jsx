import React, { useContext } from "react";
import { RWebShare } from "react-web-share";
import { BsFillShareFill, BsTrash, BsFolder2Open } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import "./Post.css";
import { BlogProvider } from "../../BlogContext";
import { useNavigate } from "react-router-dom";
import { auth } from "../../fire-base/FireBase";

const Post = ({ post }) => {
  const currentUser = auth.currentUser ? auth.currentUser.uid : false;
  const navigate = useNavigate();
  const { DeleteHandler } = useContext(BlogProvider);
  const { title, postImg, body, signedInUserID, id } = post;
  return (
    <div className="post-container">
      <div classNbackgroundame="post-background">
        <img src={postImg} alt="background" className="backgroundImg" />
      </div>
      <div className="post-content">
        <div className="content">
          <h2> {title}</h2>
          <div dangerouslySetInnerHTML={{ __html: post.body }} />
        </div>
        <div className="post-icons">
          <span
            className="view-btn"
            title="View post"
            onClick={() => navigate(`/view/${id}`)}
          >
            <BsFolder2Open />
          </span>

          <span className="share-btn" title="Share post with friends!">
            <RWebShare
              data={{
                text: body.slice(0, 30),
                url: "",
                title: title,
              }}
              onClick={() => console.log("shared successfully!")}
            >
              <BsFillShareFill />
            </RWebShare>
          </span>

          {currentUser && currentUser === signedInUserID && (
            <span title="Edit Post" onClick={() => navigate(`/update/${id}`)}>
              <BiEdit />
            </span>
          )}
        </div>
        {currentUser && currentUser === signedInUserID && (
          <span
            className="trash-btn"
            title="Delete Post"
            onClick={() => DeleteHandler(id)}
          >
            <BsTrash />
          </span>
        )}
      </div>
    </div>
  );
};

export default Post;
