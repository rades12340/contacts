import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from "../types";
import uuid from 'uuid'

const contactReducer = (state, action) => {
  switch (action.type) {
      
    case 'ADD_CONTACT':
    const cont = {
          ...action.payload,
          id: uuid()
      }
      return {
          ...state,
          contacts: [
              ...state.contacts,
              cont 
          ]
      };
    default:
      return state
  }
}

export default contactReducer