import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'


let middleWares = [thunk]
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const initialState = {
    currentListings: {
        listingName: "/MyFileSystem",
        subListings: ["folder1", "folder2", "folder3", "file1.txt", "file2.pdf"],
        "folder1": {
            listingName: "folder1",
            type: "folder",
            meta: {},
            subListings: ["folder1-1", "folder1-2", "folder1-3", "file1-1.txt", "file1-2.pdf"],
            "folder1-1": {
                listingName: "folder1-1",
                subListings: ["folder1-1", "folder1-2", "folder1-3", "file1-1.txt", "file1-2.pdf"],
                type: "folder",
                meta: {}
            },
            "folder1-2": {
                listingName: "folder1-2",
                type: "folder",
                meta: {}
            },
            "folder1-3": {
                listingName: "folder1-3",
                type: "folder",
                meta: {}
            },
            "file1-1.txt": {
                listingName: "file1-1.txt",
                type: "file",
                meta: {
                    fileSize: "",
                    extension: "txt"
                }
            },
            "file1-2.pdf": {
                listingName: "file1-2.txt",
                type: "file",
                meta: {
                    fileSize: "",
                    extension: "pdf"
                }
            },

        },
        "folder2": {
            listingName: "folder2",
            type: "folder",
            meta: {}
        },
        "folder3": {
            listingName: "folder3",
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