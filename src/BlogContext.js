import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "./fire-base/FireBase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth, storage } from "./fire-base/FireBase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getAUser } from "./controllers/UpdateHandler";

export const BlogProvider = createContext();

const BlogContext = ({ children }) => {
  // LOADING STATR *******************************************************
  const [loading, setLoading] = useState(false);
  // REDIRECT ************************************************************
  const navigate = useNavigate();

  // CURRENT USER STATUS ************************************************
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const currentUser = JSON.parse(sessionStorage.getItem("user"));
    setCurrentUser(currentUser);
  }, []);

  // LOG OUT CONTROLLER *************************************************
  const handleLogOut = () => {
    sessionStorage.removeItem("user");
    setCurrentUser(null);
    navigate("/");
  };

  // LOGIN PAGE *********************************************************
  const [error, setError] = useState(false);

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails({ ...loginDetails, [name]: value });
    setError(false);
  };

  const handleSubmit = () => {
    const { email, password } = loginDetails;

    if (!email || !password) {
      setError("All Fields Are Required!");
      toast.warning("🦄 Oops, empty field(s)!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      return;
    }
    setLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        const userInfo = { id: user.uid, email: user.email };
        setCurrentUser(userInfo);
        sessionStorage.setItem("user", JSON.stringify(userInfo));

        setLoading(false);

        toast.success("👌 Login Success!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });

        setLoginDetails({
          email: "",
          password: "",
        });
        navigate("/");
      })
      .catch((error) => {
        setError("Invalid Email or Passowrd");
        console.log(error.message);
        setLoading(false);
      });
  };

  // REGISTER /PROFILE HANDLING *************************************************************
  // profile Pic
  const [profilePic, setProfilePic] = useState(null);
  // Registeration info
  const [registerDetails, setRegisterDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    profilePic: null,
  });

  // Registeration
  const handleRegInput = (e) => {
    const { name, value } = e.target;
    setRegisterDetails({ ...registerDetails, [name]: value });
    setError(false);
  };

  const handleRegSubmit = async () => {
    const { firstName, lastName, email, password } = registerDetails;
    if (!firstName || !lastName || !email || !password) {
      setError("All the fields are required!");

      toast.warning("🦄 Oops, empty field(s)!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    setLoading(true);

    try {
      const newUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Add a new document in users
      await setDoc(doc(db, "users", newUser.user.uid), {
        ...registerDetails,
        timeStamps: serverTimestamp(),
      });

      const userInfo = { id: newUser.user.uid, email: newUser.user.email };
      setCurrentUser(userInfo);
      sessionStorage.setItem("user", JSON.stringify(userInfo));

      setLoading(false);

      toast.success("👌 Account Created!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      navigate("/profile");
    } catch (error) {
      setError(error.message);
    }
  };

  // handling profile pic and profile updating --------------------------
  // ********************************************************************
  // USER'S INFORMATION
  const [signedInUser, setSignedInUser] = useState(null);
  const [percent, setPercent] = useState(null);
  const [updateValues, setUpdateValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    profilePic: "",
  });

  // fetching the document of a particular user using ID
  const signedInUserID =
    sessionStorage.getItem("user") &&
    JSON.parse(sessionStorage.getItem("user")).id;

  useEffect(() => {
    getAUser(signedInUserID).then((res) => {
      const data = res;

      setSignedInUser({ ...data });
    });
  }, [signedInUserID]);

  //Reasign the update values to the user's value
  useEffect(() => {
    if (signedInUser) {
      setUpdateValues({
        firstName: signedInUser.firstName,
        lastName: signedInUser.lastName,
        email: signedInUser.email,
        profilePic: signedInUser.profilePic,
      });
    }
  }, [signedInUser]);

  // collecting updateValues
  const handleUpdateInput = (e) => {
    const { name, value } = e.target;
    setUpdateValues({ ...updateValues, [name]: value });
  };

  // Image handling
  useEffect(() => {
    const uploadFile = () => {
      const fileName = new Date().getTime() + profilePic.name;
      const storageRef = ref(storage, fileName);

      const uploadTask = uploadBytesResumable(storageRef, profilePic);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPercent(progress);
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
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setUpdateValues((prev) => ({
              ...prev,
              profilePic: downloadURL,
            }));
            // console.log(downloadURL);
          });
        }
      );
    };
    profilePic && uploadFile();
  }, [profilePic]);

  // update function
  const handleUpdate = () => {
    const updateRef = doc(db, "users", signedInUserID);
    updateDoc(updateRef, updateValues)
      .then((updateRef) => {
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

  // WAREHOUSE ***********************************************************
  const store = {
    loginDetails,
    handleChange,
    handleSubmit,
    registerDetails,
    handleRegInput,
    handleRegSubmit,
    error,
    currentUser,
    handleLogOut,
    loading,
    profilePic,
    setProfilePic,
    percent,
    signedInUser,
    handleUpdate,
    handleUpdateInput,
    updateValues,
  };
  return (
    <BlogProvider.Provider value={store}>{children}</BlogProvider.Provider>
  );
};

export default BlogContext;
