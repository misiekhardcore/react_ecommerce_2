import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchUser,
  setUserFetchInfo,
  updateUser,
} from "../../redux/user/actions";

import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import FormInput from "../../components/FormInput";

const UserPage = (props) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading, info, user } = useSelector((state) => state.userFetch);
  const { userInfo } = useSelector((state) => state.userInfo);

  const [name, setName] = useState(() => "");
  const [email, setEmail] = useState(() => "");
  const [password, setPassword] = useState(() => "");
  const [confirmPassword, setConfirmPassword] = useState(() => "");

  useEffect(() => {
    if (!userInfo) {
      props.history.push("/signin");
    }
  }, [props.history, userInfo]);

  useEffect(() => {
    if (!user) {
      dispatch(fetchUser(id));
    } else {
      setName(user.name || "");
      setEmail(user.email || "");
    }
  }, [dispatch, id, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      dispatch(
        setUserFetchInfo({ type: "error", message: "Passwords not match" })
      );
    } else {
      dispatch(updateUser({ id, name, email, password }));
    }
  };

  return (
    <div>
      <div className="row top">
        <div className="card no-flex">
          <div className="card-body">
            <h1>Update user info</h1>
            {loading && <LoadingBox />}
            {info && (
              <MessageBox variant={info.type}>{info.message}</MessageBox>
            )}
            <form className="form" onSubmit={handleSubmit}>
              <FormInput
                type="text"
                name="name"
                label="Name:"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <FormInput
                type="email"
                name="email"
                label="Email:"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <FormInput
                type="password"
                name="password"
                label="Password:"
                placeholder="Enter your password"
                value={password || ""}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormInput
                type="password"
                name="confirmpassword"
                label="ConfirmPassword:"
                placeholder="Confirm password"
                value={confirmPassword || ""}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button className="block primary" type="submit">
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
