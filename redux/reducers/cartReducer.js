let defaultState = {
  selectedItems: {items: [], tablename: ''},
};

let cartReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      let newState = {...state};
      if (action.payload.checkboxValue) {
        newState.selectedItems = {
          items: [...newState.selectedItems.items, action.payload],
          tablename: action.payload.tablename,
        };
      } else {
        newState.selectedItems = {
          items: [
            ...newState.selectedItems.items.filter(
              item => item.title !== action.payload.title,
            ),
          ],
          tablename: action.payload.tablename,
        };
      }
      // console.log(newState, "->");
      return newState;
    }
    case 'DESTROY_SESSION': {
        let newState = {...state};
        return newState;
    }
    default:
      return state;
  }
};

export default cartReducer;
