import React, { useContext, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ImFolderUpload } from "react-icons/im";
import { useNavigate, useParams } from "react-router-dom";
import { BlogProvider } from "../BlogContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../fire-base/FireBase";
import { toast } from "react-toastify";

const UpdatePost = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { postLists } = useContext(BlogProvider);
  const [postImg, setPostImg] = useState(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [signedInUserID, setSignedInUserID] = useState("");

  useEffect(() => {
    getPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postLists]);

  const getPost = () => {
    const post = postLists.find((post) => post.id === id);
    setPostImg(post.postImg);
    setTitle(post.title);
    setBody(post.body);
    setSignedInUserID(post.signedInUserID);
  };

  const UpdatePost = async () => {
    await setDoc(doc(db, "posts", id), {
      postImg,
      title,
      body,
      signedInUserID,
    });

    toast.success("👌 Updated Successful!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigate("/");
  };

  return (
    <div className="ComposePost">
      <img
        src={(postImg && postImg) || require("../assets/images/svg/camera.gif")}
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

      <button type="submit" className="submitPost" onClick={UpdatePost}>
        UPDATE
      </button>
      <div className="posts-headings">
        <h1>My Recent Posts</h1>
      </div>
    </div>
  );
};

export default UpdatePost;
