import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../Store/auth-context";

import classes from "./Profile.module.css";
import UpdateProfileForm from "./UpdateProfileForm";

const Profile = (props) => {
  const [updateVisible, setUpdateVisible] = useState(false);
  const authCtx = useContext(AuthContext);

  const updateVisibleHandler = () => {
    setUpdateVisible(true);
}
return (
  <div className={classes.proCon}>
    <div className={classes.header}>
      <p>Welcome to Expense tracker</p>
      <span className={classes.incomplete}>
        {!updateVisible
          ? "Your Profile is incomplete. "
          : <React.Fragment>Your profile <strong>x%</strong> completed.</React.Fragment>}
        <Link onClick={updateVisibleHandler}>Complete now</Link>
      </span>

    </div>
    {updateVisible && <UpdateProfileForm />}
  </div>
);
};

export default Profile;