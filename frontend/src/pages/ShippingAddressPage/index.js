import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../../components/CheckoutSteps";
import FormInput from "../../components/FormInput";
import { saveShippingAddress } from "../../redux/cart/actions";

const ShippingAddressPage = (props) => {
  const { userInfo } = useSelector((state) => state.userInfo);

  if (!userInfo) {
    props.history.push("/signin");
  }

  const { shippingAddress } = useSelector((state) => state.cartList);

  const [fullName, setFullName] = useState(shippingAddress.fullName || '');
  const [street, setStreet] = useState(shippingAddress.street || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
  const [country, setCountry] = useState(shippingAddress.country || '');

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      saveShippingAddress({ fullName, street, city, postalCode, country })
    );
    props.history.push("/payment");
  };

  return (
    <>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <div className="row">
        <div className="card no-flex">
          <div className="card-body">
            <h1>Shipping Address</h1>
            <form className="form" onSubmit={handleSubmit}>
              <FormInput
                type="text"
                name="fullName"
                value={fullName}
                label="Full name:"
                placeholder="Enter full name"
                onChange={(e) => setFullName(e.target.value)}
                required
              />
              <FormInput
                type="text"
                name="street"
                value={street}
                label="Street:"
                placeholder="Enter street"
                onChange={(e) => setStreet(e.target.value)}
                required
              />
              <FormInput
                type="text"
                name="city"
                value={city}
                label="City:"
                placeholder="Enter city"
                onChange={(e) => setCity(e.target.value)}
                required
              />
              <FormInput
                type="text"
                name="postalCode"
                value={postalCode}
                label="Postal code:"
                placeholder="Enter postal code"
                onChange={(e) => setPostalCode(e.target.value)}
                required
              />
              <FormInput
                type="text"
                name="country"
                value={country}
                label="Country:"
                placeholder="Enter country"
                onChange={(e) => setCountry(e.target.value)}
                required
              />
              <button className="block primary" type="submit">
                Continue
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShippingAddressPage;
