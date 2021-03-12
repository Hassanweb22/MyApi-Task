import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import { connect } from "react-redux"
import { fetchApi, fetchPost } from '../store/action/action'
import { useHistory } from 'react-router-dom'


const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
        textAlign: "right"
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    }
});


function MediaCard(props) {
    let { fetchUsers, fetchUsersPost, users, posts } = props
    let history = useHistory()

    useEffect(() => {
        fetchUsers()
        fetchUsersPost()
        // console.log("fetchApi", fetchUsers(fetchApi()))
    }, [])

    const classes = useStyles();

    let getPosts = (id) => {
        let postFilter = [...posts].filter((user) => user.userId === id)
        return postFilter.length
    }

    return (
        <div>
            {users.length > 0 ?
                <Container maxWidth="md">
                    <h1>Table</h1>
                    <TableContainer style={{ marginBottom: 20 }} component={Paper}>
                        <Table size={'medium'} className={classes.table} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="right">ID</StyledTableCell>
                                    <StyledTableCell align="right">Name</StyledTableCell>
                                    <StyledTableCell align="right">Username</StyledTableCell>
                                    <StyledTableCell align="right">Posts</StyledTableCell>
                                    <StyledTableCell align="right">Details</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((row) => (
                                    <StyledTableRow key={row.id}>
                                        <StyledTableCell component="th" scope="row">
                                            {row.id}
                                        </StyledTableCell>
                                        <StyledTableCell >{row.name}</StyledTableCell>
                                        <StyledTableCell >{row.username}</StyledTableCell>
                                        <StyledTableCell >
                                            <Button variant="outlined" color="primary"
                                                onClick={() => history.push("./posts" + row.id)}>{getPosts(row.id)}
                                            </Button>
                                        </StyledTableCell>
                                        <StyledTableCell align="left">
                                            <Button variant="outlined" color="primary"
                                                onClick={() => history.push("./user" + row.id)}>Details</Button>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
                : <h1 style={{ textAlign: "center" }}>Loading</h1>
            }
        </div>
    );
}

const mapStateToProps = (state) => ({
    name: state.api.name,
    users: state.api.users,
    posts: state.api.posts,
})

const mapDispatchToProps = dispatch => {
    return {
        fetchUsers: () => dispatch(fetchApi()),
        fetchUsersPost: () => dispatch(fetchPost()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MediaCard);