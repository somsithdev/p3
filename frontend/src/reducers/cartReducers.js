import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

export const cartReducers = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload; // ໃຫ້ item ເກັບຄ່າຂອງ payload(ຫຼື)
      const existItem = state.cartItems.find((x) => x.product === item.product); //ກວດສອບ item ທີ່ຈະ add ວ່າມີໃນ cartItems ຫຼືຍັງ ຖ້າວ່າມີຈະ return object ຖ້າວ່າບໍ່ ຈະ return undefined

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.product !== action.payload
        ),
      }; 
    default:
      return state;
  }
};
