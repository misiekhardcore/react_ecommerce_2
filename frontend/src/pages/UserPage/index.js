import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchUser } from "../../redux/user/actions";

import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import FormInput from "../../components/FormInput";

const UserPage = (props) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading, info, user } = useSelector((state) => state.userFetch);

  const [name, setName] = useState(() => "");
  const [email, setEmail] = useState(() => "");
  const [password, setPassword] = useState(() => "");
  const [confirmPassword, setConfirmPassword] = useState(() => "");

  useEffect(() => {
    dispatch(fetchUser(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      {loading ? (
        <LoadingBox />
      ) : info ? (
        <MessageBox variant={info.type}>{info.type}</MessageBox>
      ) : (
        <div className="row top">
          <div className="card no-flex">
            <div className="card-body">
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
                  required
                />
                <FormInput
                  type="password"
                  name="confirmpassword"
                  label="ConfirmPassword:"
                  placeholder="Confirm password"
                  value={confirmPassword || ""}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button className="block primary" type="submit">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPage;
