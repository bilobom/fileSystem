import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'


let middleWares = [thunk]
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const initialState = {
    currentListings: {
        folderName: "FileSystem",
        names: ["folder1", "folder2", "folder3", "file1.txt", "file2.pdf"],
        "folder1": {
            type: "folder",
            meta: {}
        },
        "folder2": {
            type: "folder",
            meta: {}
        },
        "folder3": {
            type: "folder",
            meta: {}
        },
        "file1.txt": {
            type: "file",
            meta: {
                fileSize: "",
                extension: "txt"
            }
        },
        "file2.pdf": {
            type: "file",
            meta: {
                fileSize: "",
                extension: "pdf"
            }
        }

    }
}
const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(...middleWares)))



export default store;