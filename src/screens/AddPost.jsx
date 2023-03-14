import React, { useRef, useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ImFolderUpload } from "react-icons/im";

const AddPost = () => {
  const [postValues, setPostValues] = useState({
    backgroundImg: "",
    title: "",
    body: "",
  });

  const [value, setValue] = useState("");

  const [image, SetImage] = useState("");

  const handleInputChange = (e) => {
    console.log(e.target.files);
  };

  const postSubmitHandler = () => {
    // console.log(postValues);
  };

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="ComposePost">
      <img
        src={image || require("../assets/images/svg/camera.gif")}
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
          onChange={handleInputChange}
        />
      </div>
      <label htmlFor="title">Title:</label>
      <input type="text" name="title" ref={inputRef} />
      <label htmlFor="body">Body:</label>

      <ReactQuill
        theme="snow"
        id="body"
        name="body"
        value={value}
        onChange={setValue}
        style={{ height: "200px" }}
      />

      <button type="submit" className="submitPost" onClick={postSubmitHandler}>
        PUBLISH
      </button>
      <div className="posts-headings">
        <h1>Recent Posts</h1>
      </div>
    </div>
  );
};

export default AddPost;
