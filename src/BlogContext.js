import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "./fire-base/FireBase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./fire-base/FireBase";

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
      });
  };

  // REGISTER *************************************************************
  const [registerDetails, setRegisterDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

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

      // Add a new document in collection "cities"
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
  };
  return (
    <BlogProvider.Provider value={store}>{children}</BlogProvider.Provider>
  );
};

export default BlogContext;
