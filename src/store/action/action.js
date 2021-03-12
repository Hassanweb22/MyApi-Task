let fullData = "fullData"
let add = "add"
let addPost = "addPost"
let comments = "comments"


const fetchApi = () => {
    return async (dispatch) => {
        let res = await fetch(`https://jsonplaceholder.typicode.com/users`)
        let json = await res.json()
        // console.log("json", json)
        dispatch({
            type: add,
            payload: json
        })
    }
}

const fetchPost = () => {
    return async (dispatch) => {
        let res = await fetch(`https://jsonplaceholder.typicode.com/posts`)
        let post = await res.json()
        // console.log("json", json)
        dispatch({
            type: addPost,
            payload: post
        })
    }
}
const addComments = (post) => {
    return (dispatch) => {
        dispatch({
            type: comments,
            payload: post
        })
    }
}

export {
    fetchApi,
    fetchPost,
    addComments,
    fullData,
    comments,
    add,
    addPost
}