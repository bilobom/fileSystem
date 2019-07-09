import { combineReducers } from 'redux';
import { createReducer } from 'redux-starter-kit'

// const currentListingsReducer = (currentListings = {}, action) => {
//     switch (action.type) {
//         case 'ADD_LISTING':
//             return {
//                 ...currentListings,
//                 subListings: [...currentListings.subListings, action.payload.name],
//                 [action.payload.name]: {
//                     type: action.payload.type,
//                     meta: {
//                         extension: action.payload.extension
//                     }
//                 }
//             };
//         case 'DELETE_LISTING':
//             return{
//                 ...currentListings,
//             }
//         default:
//             return currentListings;
//     }
// };
const currentListingsReducer = createReducer([], {
    "ADD_LISTING": (currentListings, action) => {
        currentListings.subListings.push(action.payload.name);
        currentListings[action.payload.name] = {
            listingName: action.payload.name,
            type: action.payload.type,
            meta: {
                extension: action.payload.extension
            }
        }
    },

    "DELETE_LISTING": (currentListings, action) => {
        currentListings.subListings = currentListings.subListings.filter(el => el !== action.payload)
        delete currentListings[action.payload]
    },
    "RENAME_LISTING": (currentListings, action) => {
        //rename it
        currentListings.subListings = currentListings.subListings.map(name => {
            if (name == action.payload.name) return action.payload.newName
            else return name
        })
        //add new entry with the new name
        currentListings[action.payload.newName] = currentListings[action.payload.name]

        //delete the old entry
        delete currentListings[action.payload.name]



    },
})
const rootReducer = combineReducers({
    currentListings: currentListingsReducer,
});
export default rootReducer
