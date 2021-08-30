import React, { useEffect, useState } from 'react';
import { Box, Paper, Button, Typography, TextField } from '@material-ui/core';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const ToDoAppMain = () => {
    const [toDoItem, setToDoItem] = useState('');
    const [isEdit, setEdit] = useState({
        isEditTrue: false,
        id: null,
        value: '',
    })

    const [toDoListItems, setToDoListItems] = useState(() => localStorage.getItem('toDoListItems') ? JSON.parse(localStorage.getItem('toDoListItems')) : []
    );

    const toDoPush = (item) => {
        if (!item) {
            alert('Please fill to do');
        }
        else {
            setToDoListItems(toDoListItems => [...toDoListItems, item]);
            setToDoItem('');
        }
    }

    const deleteToDo = (index) => {
        if (window.confirm("Are you sure to delete ?")) {
            let duplicate = toDoListItems;
            duplicate.splice(index, 1);
            setToDoListItems([...duplicate]);
            localStorage.setItem('toDoListItems', JSON.stringify(duplicate))
        }
       
    }

    const saveEdit = (text, index) => {
        if (window.confirm("You want to update ?")) {
            let duplicateArray = [...toDoListItems];
            duplicateArray[index] = text
            setToDoListItems([...duplicateArray]);
            localStorage.setItem('toDoListItems', JSON.stringify(duplicateArray));
            setEdit({
                isEditTrue: false,
                id: null,
                value: '',
            })
        }
      
    }

    useEffect(() => {
        if (toDoListItems.length > 0) {
            localStorage.setItem('toDoListItems', JSON.stringify(toDoListItems))
        }
    }, [toDoListItems])

    return (
        <div width="455px">
            <Box component={Paper} p={2}>
                <Box mb={3}>
                    <Typography variant="h4">To Do Application</Typography>
                    <Typography variant="body2"> - Developed By Suraj Prakash</Typography>
                </Box>
                <Box width="400px" display="flex" alignItems="center">

                    <Box mr={2}>
                        <TextField
                            name="toDoName"
                            value={toDoItem}
                            fullWidth
                            margin="dense"
                            variant="outlined"
                            placeholder="Enter Task..."
                            label="Enter To Do Name"
                            onChange={(e) => setToDoItem(e.target.value)}
                        />
                    </Box>

                    <Box>
                        <Button
                            type="button"
                            variant="contained"
                            onClick={() => toDoPush(toDoItem)}
                            color="primary">
                            Add To Do
                        </Button>
                    </Box>
                </Box>
            </Box>

            <Box mt={2}>
                {
                    toDoListItems.length === 0 ? (
                        <Paper component={Box} p={2} elevation={0}>
                            <Typography variant="body2">No Task Found.</Typography>
                        </Paper>) : (

                        <div>
                            {
                                toDoListItems.map((item, index) => (
                                    <Paper component={Box} width="100%" key={index} p={2} my={1}>

                                        <Box>
                                            {

                                                isEdit.id === index ? (
                                                    <Box width="400px" display="flex" alignItems="center">

                                                        <Box mr={2}>
                                                            <TextField
                                                                name="toDoName"
                                                                value={isEdit.value}
                                                                fullWidth
                                                                margin="dense"
                                                                variant="outlined"
                                                                placeholder="Enter Task..."
                                                                label="Enter To Do Name"
                                                                onChange={(e) => setEdit({
                                                                    ...isEdit,
                                                                    value: e.target.value
                                                                })}
                                                            />
                                                        </Box>

                                                        <Box>
                                                        <Button
                                                            type="button"
                                                            variant="contained"
                                                            onClick={() => saveEdit(isEdit.value, index)}
                                                            color="primary">
                                                            Save Changes
                                                        </Button>
                                                            
                                                        </Box>
                                                    </Box>
                                                ) : (
                                                    <Box display="flex" alignItems="center" justifyContent="flex-start">
                                                        <Box flexGrow="1" display="flex" alignItems="center" style={{ marginRight: "20px" }}>
                                                            <Typography variant="subtitle1">{item}</Typography>
                                                        </Box>

                                                        <Box pr={4}>
                                                            <IconButton onClick={() => deleteToDo(index)} aria-label="delete">
                                                                <DeleteIcon />
                                                            </IconButton>

                                                            <IconButton aria-label="edit" onClick={() => setEdit({
                                                                isEditTrue: true,
                                                                id: index,
                                                                value: item
                                                            })}>
                                                                <EditIcon />
                                                            </IconButton>
                                                        </Box>
                                                    </Box>
                                                )
                                            }
                                        </Box>
                                    </Paper>
                                ))
                            }
                        </div>

                    )
                }
            </Box>
        </div>
    )
}




export default ToDoAppMain
