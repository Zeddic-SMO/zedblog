import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { toast } from "react-toastify";
import { db, storage } from "../fire-base/FireBase";

const CreatePostHandler = ({ postImg, title, body }) => {
  // fetching the document of a particular user using ID
  const signedInUserID =
    sessionStorage.getItem("user") &&
    JSON.parse(sessionStorage.getItem("user")).id;

  console.log({ postImg, title, body });
  const [values, setValues] = useState({
    title: title,
    body: body,
  });

  //   handling blogpost image upload
  const uploadBlogImg = () => {
    // HANDLING BLOG IMAGE POST
    const fileName = new Date().getTime() + postImg.name;
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, postImg);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // setPercent(progress);
        console.log(progress);

        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setValues({ ...values, downloadURL });
        });
      }
    );
  };
  postImg && uploadBlogImg();

  //   saving blog
  const createPost = () => {
    const updateRef = doc(db, "posts", signedInUserID);

    updateDoc(updateRef, values)
      .then(() => {
        toast.success("👌 Update Successful!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  createPost();
  return;
};

export default CreatePostHandler;
