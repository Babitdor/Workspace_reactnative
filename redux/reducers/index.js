import { combineReducers } from 'redux';
import cartReducer from './cartReducer'

let reducers = combineReducers({
    cartReducer: cartReducer,
})

const rootReducer = (state, action) => {

    if(action.type === 'DESTORY_SESSION'){
        state = undefined;
    }

    return reducers(state,action);
};

export default rootReducer;