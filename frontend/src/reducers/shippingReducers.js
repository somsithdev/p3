import { SAVE_SHIPPING_ADDRESS } from "../constants/shippingConstants";

export const ShippingAddressReducer = (state = {}, action) => {
  switch (action.type) {
    case SAVE_SHIPPING_ADDRESS:
      console.log("save that info alredy");
      return { ...state, addressInfo: action.payload };
    default:
      return state;
  }
};
