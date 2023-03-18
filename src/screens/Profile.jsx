import React, { useContext } from "react";
import { ImFolderUpload } from "react-icons/im";
import { BlogProvider } from "../BlogContext";
import Spinner from "../components/Spinner/Spinner";

const Profile = () => {
  const {
    setProfilePic,
    percent,
    handleUpdate,
    handleUpdateInput,
    updateValues,
  } = useContext(BlogProvider);

  const { firstName, lastName, email, profilePic } = updateValues;

  return (
    <div className="Container">
      <div className="profileContainer">
        <div className="profile-image">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {percent && (
              <h6
                style={{
                  fontWeight: "600",
                  margin: "10px 0px",
                  boxShadow: "2px 2px 2px 2px #ccc",
                  padding: "5px",
                }}
              >
                {percent && percent < 100
                  ? "Uploading ..." + Math.floor(percent) + "%"
                  : ""}
              </h6>
            )}
            <img
              src={
                profilePic
                  ? profilePic
                  : require("../assets/images/svg/user.gif")
              }
              alt="Profile"
            />
          </div>

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
            <input
              type="file"
              name="profilePic"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => setProfilePic(e.target.files[0])}
            />
          </div>
        </div>

        <div className="profile-details">
          {updateValues ? (
            <>
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                onChange={handleUpdateInput}
                value={firstName}
              />

              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                onChange={handleUpdateInput}
                value={lastName}
              />

              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                name="email"
                value={email}
                readOnly
                disabled
              />

              <div className="update">
                {percent && percent < 100 ? (
                  <Spinner />
                ) : (
                  <button onClick={handleUpdate}>UPDATE</button>
                )}
              </div>
            </>
          ) : (
            <Spinner />
          )}
        </div>
      </div>
      <div className="posts-headings">
        <h1>Recent Posts</h1>
      </div>
    </div>
  );
};

export default Profile;
