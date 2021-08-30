import React, { useEffect, useState } from 'react';
import { Avatar, Box, Paper, Typography, Container } from '@material-ui/core';
import axios from 'axios';
import { Pagination } from '@material-ui/lab';

const PaginationComponent = () => {
    const [data, setData] = useState([]);
    const [totalPage, setTotalPage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(null)

    const fetchData = async (pageNumber) => {
        const res = await axios.get(`https://reqres.in/api/users?page=${pageNumber}`);
        setData(res.data.data);
        setTotalPage(res.data.total_pages);
        setPage(res.data.page);
    }
    useEffect(() => {
        fetchData(1);
        setLoading(false);
    }, [])

    const cardStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: 'wrap'
    }

    const pagination = {
        padding:'10px',
        display:'flex',
        justifyContent:"center"
    }

    return (
        <Container maxWidth="lg">

            {
                loading ? <Loading message="Please wait..." /> : (
                    <div>
                        <div style={cardStyle}>
                            {
                                data.map((item, index) => (
                                    <UserCard user={item} key={index} />
                                ))
                            }
                        </div>
                        <div style={pagination}>
                            <Pagination
                                onChange={(e, val) => fetchData(val)}
                                page={page}
                                count={totalPage}
                                shape="rounded"
                                color="primary"
                                showFirstButton
                                showLastButton
                            />
                        </div>
                    </div>
                )
            }


            <Box component={Paper} p={1} mt={2} display="flex" justifyContent="center">
                <Typography variant="subtitle1">Design By Suraj Prakash</Typography>
            </Box>

        </Container>
    )
}


const Loading = (props) => {
    const loading = {
        height: '100vh',
        backgroundColor: 'white',
        opacity: '0.3',
        color: 'black',

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
    return (
        <div style={loading}>
            <h4>{props.message}</h4>
        </div>
    )
}


const UserCard = (props) => {
    const { first_name, last_name, avatar, email, id } = props.user;
    const getName = (first, second) => {
        let name = first + ' ' + second
        return name;
    }
    const avat = {
        height: '100px',
        width: '100px',
        marginRight: "20px"
    }
    return (
        <Paper component={Box} p={2} m={2} width="330px" display="flex" alignItems="center" justifyContent="space-between">
            <Box display="flex" alignItems="center">
                <Avatar src={avatar} style={avat} />
            </Box>

            <Box>
                <Box display="flex" alignItems="center">
                    <Typography variant="body1" style={{ fontWeight: '700' }} gutterBottom>ID:{id}</Typography>
                </Box>

                <Box display="flex" alignItems="center">
                    <Typography variant="body1">{getName(first_name, last_name)}</Typography>
                </Box>

                <Box display="flex" alignItems="center">
                    <Typography variant="body1" gutterBottom>{email}</Typography>
                </Box>
            </Box>


        </Paper>
    )
}


export default PaginationComponent
