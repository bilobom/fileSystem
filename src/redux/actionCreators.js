// import { createAFolder} from '../api.js'

// export const addFolder = (name) => async dispatch=>{
//     try {
//         const response = await createAFolder(name);
//         dispatch(updateFolderListings(response.data));
//     } catch (error) {
//         dispatch(
//             error({
//                 message: "Something went wrong, please try again !"
//             })
//         );
//     }
// }
// export const updateFolderListings=(folderListings)=>{
//     return{
//         type:'UPDATE_FOLDER',
//         payload: folderListings
//     }
// }
// export const error=(error)=>{
//     return{
//         type:'ERROR',
//         payload:error.message
//     }
// }
export const addListing = (name, type, pathArray)=>{
    return{
        type:'ADD_LISTING',
        payload:{
            name,
            type,
            pathArray
        }
    }
}
export const deleteListing = (name, pathArray) => {
    return {
        type: 'DELETE_LISTING',
        payload: { name, pathArray}
    }
}
export const renameListing = (name, newName, pathArray)=>{
    return {
        type: 'RENAME_LISTING',
        payload: { name, newName, pathArray}
    }
}