import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FormInput from "../../components/FormInput";

import { signin } from "../../redux/user/actions";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";

const SigninPage = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const dispatch = useDispatch();
  const { info, loading, userInfo } = useSelector((state) => state.userInfo);

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(signin(email, password));
  };

  return (
    <>
      <div className="row">
        <div className="card no-flex">
          <div className="card-body">
            <h1>Sign In</h1>
            {loading && <LoadingBox />}
            {info && (
              <MessageBox variant={info.type}>{info.message}</MessageBox>
            )}
            <form className="form" onSubmit={handleSubmit}>
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
              <button className="block primary" type="submit">
                Signin
              </button>
              <div style={{ marginTop: "2rem" }}>
                New account?{" "}
                <Link to={`/register?redirect=${redirect}`}>
                  Create an account
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SigninPage;
