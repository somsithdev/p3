import { SAVE_SHIPPING_ADDRESS } from "../constants/shippingConstants";

export const saveShippingAddress =
  (fullname, address, city, phone, postal, country) => async (dispatch) => {
    const data = { fullname, address, city, phone, postal, country };
    dispatch({
      type: SAVE_SHIPPING_ADDRESS,
      payload: data,
    });
    localStorage.setItem("addressInfo", JSON.stringify(data));
  };
