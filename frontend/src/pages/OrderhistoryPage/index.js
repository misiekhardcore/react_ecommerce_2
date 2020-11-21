import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderAll } from "../../redux/order/actions";

import LoadingBox from "./../../components/LoadingBox";
import MessageBox from "./../../components/MessageBox";

const OrderhistoryPage = (props) => {
  const { loading, info, orders } = useSelector((state) => state.orderFetchAll);
  const { userInfo } = useSelector((state) => state.userInfo);

  const dispatch = useDispatch();

  if (!userInfo) {
    props.history.push("/signin");
  }

  useEffect(() => {
    dispatch(fetchOrderAll());
  }, [dispatch]);

  return (
    <div>
      <h1>Order history</h1>
      {loading ? (
        <LoadingBox />
      ) : info && info.type === "error" ? (
        <MessageBox variant={info.type}>{info.message}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt}</td>
                <td>{order.totalPrice.toFixed(2)}</td>
                <td>
                  {order.isPaid ? (
                    <MessageBox variant="success">
                      {order.paidAt.substring(0, 10)}
                    </MessageBox>
                  ) : (
                    <MessageBox variant="error">Not Paid</MessageBox>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    <MessageBox variant="success">
                      {order.deliveredAt.substring(0, 10)}
                    </MessageBox>
                  ) : (
                    <MessageBox variant="error">Not Delivered</MessageBox>
                  )}
                </td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() => {
                      props.history.push(`orders/${order._id}`);
                    }}
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderhistoryPage;
