import { comments, add, addPost } from "../action/action"

const InitialState = {
    name: "Hassan",
    users: [],
    posts: [],
    comments: []
}



export default function appReducer(state = InitialState, action) {
    // console.log("appReducer_action ==>", action)
    switch (action.type) {
        case add:
            // console.log("add", action)
            return { ...state, users: action.payload }
        case addPost:
            // console.log("addPost", action)
            return { ...state, posts: action.payload }
        case comments:
            // console.log("addComments", action)
            return { ...state, comments: action.payload }
        default:
            return state
    }
}