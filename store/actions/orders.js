import Order from "../../models/order";
export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDERS = "SET_ORDERS";

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;

    console.log('userId: ', userId);

    try {
      const response = await fetch(
        `https://laptopsrnproject.firebaseio.com/orders/${userId}.json`
      );

      if (!response.ok) {
        const errData = await response.json();
        console.log('errData: ', errData);
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();
      const loadedOrders = [];

      for (const key in resData) {
        loadedOrders.push(
          new Order(
            key,
            resData[key].cartItems,
            resData[key].totalAmount,
            new Date(resData[key].date),
            resData[key].locationAddress
          )
        );
      }
      console.log("orders: ", loadedOrders);
      dispatch({ type: SET_ORDERS, orders: loadedOrders });
    } catch (err) {
      throw err;
    }
  };
};

export const addOrder = (cartItems, totalAmount, locationAddress) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const date = new Date();
    const response = await fetch(
      `https://laptopsrnproject.firebaseio.com/orders/${userId}.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItems,
          totalAmount,
          locationAddress,
          date: date.toISOString(),
        }),
      }
    );

    if (!response.ok) {
      // const errData = await response.json();
      // console.log('errData: ', errData);
      throw new Error("Something went wrong!");
    }

    const resData = await response.json();

    dispatch({
      type: ADD_ORDER,
      orderData: {
        id: resData.name,
        items: cartItems,
        amount: totalAmount,
        date: date,
        locationAddress: locationAddress
      },
    });
  };
};
