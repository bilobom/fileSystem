import { combineReducers } from 'redux';

const currentListingsReducer = (currentListings = {}, action) => {
    switch (action.type) {
        case 'ADD_LISTING':
            return {
                ...currentListings,
                name: [...currentListings.names, action.payload.name],
                [action.payload.name]: {
                    type: action.payload.type,
                    meta: {
                        extension: action.payload.extension
                    }
                }
            };
        default:
            return currentListings;
    }
};

const rootReducer = combineReducers({
    currentListings: currentListingsReducer,
});
export default rootReducer
