import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FormInput from "../../components/FormInput";

import { register, setUserInfo } from "../../redux/user/actions";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";

const RegisterPage = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const dispatch = useDispatch();
  const { info, loading } = useSelector((state) => state.userRegister);
  const { userInfo } = useSelector((state) => state.userInfo);

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      dispatch(setUserInfo({ type: "error", message: "Passwords not match" }));
    } else dispatch(register(name, email, password));
  };

  return (
    <>
      <div className="row">
        <div className="card no-flex">
          <div className="card-body">
            <h1>Register</h1>
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
                onChange={(e) => setName(e.target.value)}
                required
              />
              <FormInput
                type="email"
                name="email"
                label="Email:"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <FormInput
                type="password"
                name="password"
                label="Password:"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <FormInput
                type="password"
                name="confirmpassword"
                label="ConfirmPassword:"
                placeholder="Confirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button className="block primary" type="submit">
                Register
              </button>
              <div style={{ marginTop: "2rem" }}>
                Have an account?{" "}
                <Link to={`/signin?redirect=${redirect}`}>Sign In</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
