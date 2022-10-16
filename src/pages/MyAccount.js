import { useSelector } from "react-redux";
import classes from "./MyAccount.module.css";
import profileImage from "../assets/profile-template.jpg";

const MyAccount = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className={classes["my-account"]}>
      <h1>My Account</h1>
      <div className={classes["account-info"]}>
        <div className={classes["account-info__left"]}>
          <span>My Name:</span>
          <span>My E-Mail: {user}</span>
        </div>
        <div>
          <img alt="My Photo" src={profileImage}/>
        </div>
      </div>
      <h3>Change My Account Information</h3>
      <div className={classes["account-edit"]}>
        <span>Change my password</span>
        <span>Change my photo</span>
        <span>Delete my account</span>
      </div>
    </div>
  );
};

export default MyAccount;
