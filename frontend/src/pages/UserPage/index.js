import React, { useEffect } from "react";
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

  useEffect(() => {
    dispatch(fetchUser(id));
  }, [dispatch]);

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
        <div>
          <form className="form" onSubmit={handleSubmit}>
            <FormInput
              type="text"
              name="name"
              label="Name:"
              placeholder="Enter your name"
              value={user.name}
              required
            />
            <FormInput
              type="email"
              name="email"
              label="Email:"
              placeholder="Enter your email"
              value={user.email}
              required
            />
            <FormInput
              type="password"
              name="password"
              label="Password:"
              placeholder="Enter your password"
              required
            />
            <FormInput
              type="password"
              name="confirmpassword"
              label="ConfirmPassword:"
              placeholder="Confirm password"
              required
            />
            <button className="block primary" type="submit">
              Update
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserPage;
