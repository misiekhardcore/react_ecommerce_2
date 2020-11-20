import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormInput from "../../components/FormInput";
import { savePaymentMethod } from "../../redux/cart/actions";
import CheckoutSteps from "./../../components/CheckoutSteps";

const PaymentScreen = (props) => {
  const { shippingAddress } = useSelector((state) => state.cartList);
  const { userInfo } = useSelector((state) => state.userInfo);

  if (!shippingAddress.street || !userInfo) {
    props.history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    props.history.push("/placeorder");
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <div className="row">
        <div className="card no-flex">
          <div className="card-body">
            <h1>Payment</h1>
            <form className="form" onSubmit={handleSubmit}>
              <FormInput
                type="radio"
                id="paypal"
                value="PayPal"
                name="paymentMethod"
                label="PayPal"
                required
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <FormInput
                type="radio"
                id="stripe"
                value="Stripe"
                name="paymentMethod"
                label="Stripe"
                required
                onChange={(e) => setPaymentMethod(e.target.value)}
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

export default PaymentScreen;
