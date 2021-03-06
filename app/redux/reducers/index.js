import I from 'immutable';
import { combineReducers } from 'redux-immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import account from './account';
import user from './user';

let initialState = I.fromJS({
    locationBeforeTransitions: undefined
});

let router = (state = initialState, action) => {
    if (action.type === LOCATION_CHANGE) {
        return state.merge({
            locationBeforeTransitions: action.payload
        });
    }

    return state;
};

export default combineReducers({
    router,
    account,
    user
});
