import React, { useEffect, useState } from 'react'
import { connect } from "react-redux"
import { useHistory, useParams } from "react-router-dom";
import "./mainStyle.css"
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles((theme) => ({
    grid: {
        width: '100%',
        margin: "30px 0 0 0",
    },
    grid1: {
        backgroundColor: "#FFFFFF",
        margin: theme.spacing(1)
    },
    paper: {
        height: "max-content",
        // width: 500,
        padding: theme.spacing(1),
    }

}));

function Comments(props) {
    let { posts, comments } = props
    let { postId } = useParams();
    const classes = useStyles();
    let history = useHistory()

    const [state, setstate] = useState([])
    const [postComm, setCom] = useState({})

    
    useEffect(() => {
        let getPosts = async () => {
            let data = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
            let com = await data.json()
            setstate(com)
        }
        getPosts()
    }, [])
    console.log("Comments", state)
    // console.log("post", post)

    let getComment = () => {
        let find = [...comments].find((com) => com.id == postId)
        return find
    }

    return (
        <div>
            <Grid container className={classes.grid} justify="center" spacing={2}>
                <Grid item className={classes.grid1} xs={12} md={8} >
                    {state.length > 0 ?
                        <Grid>
                            <ArrowBackIcon style={{ cursor: 'pointer' }} onClick={() => history.goBack()} />
                            <div className={classes.paper} onClick={() => console.log(getComment())}>
                                <Typography variant="h4" style={{ marginLeft: 15 }}>{getComment().id}. {getComment().title}</Typography>
                                <Typography style={{ marginLeft: 15 }} variant="subtitle1" >{getComment().body}</Typography>
                            </div>
                            <hr />
                            <h2 style={{ textAlign: "center" }}>Comments</h2>
                            {state.map((comment, i) => {
                                return <div className={classes.paper} key={comment.id}>
                                    <Typography variant="h5" style={{ marginLeft: 15 }}>{comment.name}</Typography>
                                    <Typography color="secondary" style={{ marginLeft: 15 }} variant="subtitle2" >{comment.email}</Typography>
                                    <Typography style={{ marginLeft: 15 }} variant="subtitle1" >{comment.body}</Typography>
                                    <hr />
                                </div>

                            })}
                        </Grid>
                        : <h2>Loading!!!</h2>
                    }
                </Grid>
            </Grid>
        </div>
    )
}

const mapStateToProps = (state) => ({
    users: state.api.users,
    posts: state.api.posts,
    comments: state.api.comments,
})

const mapDispatchToProps = dispatch => {
    return {
        // fetchUsers: () => dispatch(fetchApi()),
        // fetchUsersPost: () => dispatch(fetchPost()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments);