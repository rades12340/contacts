// import { OPEN_MODAL, CLOSE_MODAL } from "../types";

const userReducer = (state, action) => {
  switch (action.type) {
    case "OPEN_MODAL":
      return {
        ...state,
        open_modal: true
      };
    case "CLOSE_MODAL":
      return {
        ...state,
        open_modal: false
      };

    default:
      return state;
  }
};

export default userReducer;
