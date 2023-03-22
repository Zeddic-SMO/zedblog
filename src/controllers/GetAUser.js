import { doc, getDoc } from "firebase/firestore";
import { db } from "../fire-base/FireBase";

// FETCH A USER DETAILS AND DISPLAY IN THE PROFILE PAGE *********************************************************
export const getAUser = async (id) => {
  let data = {};
  try {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      //   console.log("Document data:", docSnap.data());
      data = { ...docSnap.data() };
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  } catch (error) {
    console.log(error.message);
  }
  return data;
};

export default getAUser;
