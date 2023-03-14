import React, { useState } from "react";
import { ImFolderUpload } from "react-icons/im";

const Profile = () => {
  const [profilePic, setProfilePic] = useState();

  return (
    <div className="Container">
      <div className="profileContainer">
        <div className="profile-image">
          <img
            src={profilePic || require("../assets/images/svg/user.gif")}
            alt="Profile"
          />
          <div>
            <label
              htmlFor="file"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <ImFolderUpload style={{ fontSize: "30px" }} />
              <h3>UPLOAD</h3>
            </label>
            <input type="file" name="profilePic" id="file" hidden />
          </div>
        </div>

        <div className="profile-details">
          <label htmlFor="firstName">First Name:</label>
          <input type="text" name="firstName" value="Samuel" disabled />

          <label htmlFor="lastName">Last Name:</label>
          <input type="text" name="lastName" disabled />

          <label htmlFor="email">Email:</label>
          <input type="text" name="email" disabled />
        </div>
      </div>
      <div className="posts-headings">
        <h1>Recent Posts</h1>
      </div>
    </div>
  );
};

export default Profile;
