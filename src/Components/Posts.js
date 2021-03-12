import React, { useState, useEffect } from 'react'
import { connect } from "react-redux"
import { useHistory, useParams } from "react-router-dom";
import "./mainStyle.css"
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { addComments } from '../store/action/action'

const useStyles = makeStyles((theme) => ({
    grid: {
        width: '100%',
        margin: "30px 0 0 0",
    },
    paper: {
        height: "max-content",
        // width: 500,
        padding: theme.spacing(2),
    }

}));

function UserPosts(props) {
    let { posts, addComments } = props
    let { Id } = useParams();
    const classes = useStyles();
    let history = useHistory()

    const [state, setstate] = useState([])
    useEffect(() => {
        let getPosts = (id) => {
            let postFilter = [...posts].filter((user) => user.userId == Id)
            addComments(postFilter)
            setstate(postFilter)
        }
        getPosts()
    }, [])

    return (
        <div>
            {state.length > 0 ?
                <Grid container className={classes.grid} justify="center" spacing={1}>
                    {state.map((post, i) => {
                        return <Grid item xs={12} sm={10} md={8} key={post.id}>
                            <Paper className={classes.paper} >
                                <ArrowBackIcon style={{ cursor: 'pointer' }} onClick={() => history.push("./")} />
                                <Typography variant="h5" >{i + 1}) {post.title}</Typography>
                                <Typography style={{ marginLeft: 15 }} variant="subtitle2" >{post.body}</Typography>
                                <Button style={{ margin: "5px 0 0 15px" }} variant="outlined" color="primary"
                                    onClick={() => history.push("./comments" + post.id)}>Comments</Button>
                            </Paper>
                        </Grid>
                    })}
                </Grid>
                : <h2>Sorry!!!</h2>
            }
        </div>
    )
}

const mapStateToProps = (state) => ({
    users: state.api.users,
    posts: state.api.posts,
})

const mapDispatchToProps = dispatch => {
    return {
        addComments: (a) => dispatch(addComments(a)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPosts);
