import React, { useRef, useEffect, useContext, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ImFolderUpload } from "react-icons/im";
import { BlogProvider } from "../BlogContext";

const AddPost = () => {
  const { handleCreatePost } = useContext(BlogProvider);

  // const [percent, SetPercent] = useState(null);

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const [postImg, setPostImg] = useState(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const postSubmitHandler = () => {
    handleCreatePost({ postImg, title, body });
  };

  return (
    <div className="ComposePost">
      <img
        src={
          (postImg && URL.createObjectURL(postImg)) ||
          require("../assets/images/svg/camera.gif")
        }
        alt="Background"
      />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "10px 0px",
        }}
      >
        <label
          htmlFor="backgroundImg"
          style={{ display: "flex", gap: "10px", cursor: "pointer" }}
        >
          Image
          <ImFolderUpload style={{ fontSize: "30px" }} />
        </label>
        <input
          type="file"
          id="backgroundImg"
          name="backgroundImg"
          style={{ display: "none" }}
          onChange={(e) => setPostImg(e.target.files[0])}
        />
      </div>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        name="title"
        ref={inputRef}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label htmlFor="body">Body:</label>
      <ReactQuill
        theme="snow"
        id="body"
        name="body"
        value={body}
        onChange={setBody}
        style={{ height: "200px" }}
      />

      <button type="submit" className="submitPost" onClick={postSubmitHandler}>
        PUBLISH
      </button>
      <div className="posts-headings">
        <h1>My Recent Posts</h1>
      </div>
    </div>
  );
};

export default AddPost;
