import {FETCH_ITEMS, UPDATE_ITEM, CREATE_ITEM} from '../actions/items';

const initialState = {
  items: [],
};

const itemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ITEMS:
      return {
        items: action.data,
      };
    case UPDATE_ITEM:
      return {
        items: {
          ...state.items,
          [action.id]: {
            title: action.title,
            isChecked: action.isChecked,
          },
        },
      };
    case CREATE_ITEM:
      return {
        items: {
          ...state.items,
          [action.id]: {
            title: action.title,
            isChecked: action.isChecked,
          },
        },
      };
    default:
      return state;
  }
};

export default itemsReducer;
