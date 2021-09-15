export const FETCH_ITEMS = 'FETCH_ITEMS';
export const UPDATE_ITEM = 'UPDATE_ITEM';
export const CREATE_ITEM = 'CREATE_ITEM';

export const fetchItems = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    try {
      const res = await fetch(
        `https://dummy-list-rn-default-rtdb.firebaseio.com/items.json?auth=${token}`,
      );
      if (!res.ok) {
        throw new Error('Something went wrong');
      }
      const resData = await res.json();
      dispatch({type: FETCH_ITEMS, data: resData});
    } catch (err) {
      throw err;
    }
  };
};

export const updateItem = (id, title, isChecked) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    try {
      const response = await fetch(
        `https://dummy-list-rn-default-rtdb.firebaseio.com/items/${id}.json?auth=${token}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title,
            isChecked,
          }),
        },
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      dispatch({
        type: UPDATE_ITEM,
        id,
        title,
        isChecked,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const createItem = (title, isChecked) => {
  return async (dispatch, getState) => {
    // any async code you want!
    const token = getState().auth.token;
    try {
      const response = await fetch(
        `https://dummy-list-rn-default-rtdb.firebaseio.com/items.json?auth=${token}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title,
            isChecked,
          }),
        },
      );

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const resData = await response.json();

      dispatch({
        type: CREATE_ITEM,
        id: resData.name,
        title,
        isChecked,
      });
    } catch (err) {
      throw err;
    }
  };
};
