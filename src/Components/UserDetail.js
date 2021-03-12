import React from 'react'
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
    paper: {
        height: "max-content",
        // width: 500,
        padding: "20px",
        padding: theme.spacing(2),
    },
    control: {
        padding: theme.spacing(2),
    },
}));

function UserDetail(props) {
    let { users } = props
    let { id } = useParams();
    const classes = useStyles();
    let history = useHistory()

    let info = [...users].find((user) => user.id == id)
    // console.log("Info", info)

    return (
        <div>
            {info?.name ?
                <Grid container className={classes.grid} justify="center" spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Paper className={classes.paper}>
                            <ArrowBackIcon style={{ cursor: 'pointer' }} onClick={() => history.push("./")} />
                            {/* <Grid> */}
                            <Typography variant="h5">{info.name}</Typography>
                            <Typography variant="subtitle1" gutterBottom>{info.username}</Typography>
                            {/* </Grid> */}
                            <div className="para">
                                <Typography variant="subtitle2"><b>Personal Info</b></Typography>
                                <p>phone: &nbsp;&nbsp;{info.phone}</p>
                                <p>Email: &nbsp;&nbsp; {info.email}</p>
                            </div>
                            <div className="para">
                                <Typography variant="subtitle2"><b>Address</b></Typography>
                                <p>Street:&nbsp;&nbsp;{info.address.street}</p>
                                <p>Suite: &nbsp;&nbsp;{info.address.suite}</p>
                                <p>City: &nbsp;&nbsp;{info.address.city}</p>
                                <p>Zipcode: &nbsp;&nbsp;{info.address.zipcode}</p>
                                <p>Location: latitude{info.address.geo.lat}, Langitude{info.address.geo.lng}</p>
                            </div>
                            <div className="para">
                                <Typography variant="subtitle2"><b>Company</b></Typography>
                                <p>Name:&nbsp;&nbsp;{info.company.name}</p>
                                <p>Catch Phrase: &nbsp;&nbsp;{info.company.catchPhrase}</p>
                                <p>BS: &nbsp;&nbsp;{info.company.bs}</p>
                            </div>
                            <div className="para">
                                <p><b>Website:</b> &nbsp;&nbsp;{info.website}</p>
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
                : <h2>No data to Show</h2>
            }
        </div >
    )
}

const mapStateToProps = (state) => ({
    users: state.api.users,
    posts: state.api.posts,
})

const mapDispatchToProps = dispatch => {
    return {
        // fetchUsers: () => dispatch(fetchApi()),
        // fetchUsersPost: () => dispatch(fetchPost()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail);
