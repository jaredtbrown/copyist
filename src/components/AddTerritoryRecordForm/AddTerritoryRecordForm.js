import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '../Button';
import DialogActions from '@material-ui/core/DialogActions';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    textFields: {
        marginBottom: theme.spacing(2),
    },
    paper: {
        padding: theme.spacing(3)
    },
}));

const AddTerritoryRecordForm = (props) => {
    const [newTerritoryRecord, setNewTerritoryRecord] = useState({
        firstName: '',
        lastName: '',
        streetAddress1: '',
        streetAddress2: '',
        city: '',
        region: '',
        postcode: '',
        phone: ''
    });

    const handleInputChange = (event) => {
        const newTerritoryRecordData = {...newTerritoryRecord};
        newTerritoryRecordData[event.target.name] = event.target.value;
        setNewTerritoryRecord(newTerritoryRecordData);
    }

    const handleOnCreateClick = () => {
        props.onCreateClick(newTerritoryRecord);
    }

    const classes = useStyles();
    return (
        <Dialog open={props.open} onClose={props.handleClose} classes={{ paper: classes.paper, }}>
            <DialogTitle>Add Record</DialogTitle>
            <DialogContent>
                <TextField
                    label="First Name"
                    variant="outlined"
                    type="text"
                    name="firstName"
                    onChange={handleInputChange}
                    fullWidth
                    className={classes.textFields}
                />
                <TextField
                    label="Last Name"
                    variant="outlined"
                    type="text"
                    name="lastName"
                    onChange={handleInputChange}
                    fullWidth
                    className={classes.textFields}
                />
                <TextField
                    label="Street Address 1"
                    variant="outlined"
                    type="text"
                    name="streetAddress1"
                    onChange={handleInputChange}
                    fullWidth
                    className={classes.textFields}
                />
                <TextField
                    label="Street Address 2"
                    variant="outlined"
                    type="text"
                    name="stretAddress2"
                    onChange={handleInputChange}
                    fullWidth
                    className={classes.textFields}
                />
                <TextField
                    label="City"
                    variant="outlined"
                    type="text"
                    name="city"
                    onChange={handleInputChange}
                    fullWidth
                    className={classes.textFields}
                />
                <TextField
                    label="Region"
                    variant="outlined"
                    type="text"
                    name="region"
                    onChange={handleInputChange}
                    fullWidth
                    className={classes.textFields}
                />
                <TextField
                    label="Postcode"
                    variant="outlined"
                    type="text"
                    name="postcode"
                    onChange={handleInputChange}
                    fullWidth
                    className={classes.textFields}
                />
                <TextField
                    label="Phone"
                    variant="outlined"
                    type="text"
                    name="phone"
                    onChange={handleInputChange}
                    fullWidth
                    className={classes.textFields}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleOnCreateClick} fullWidth color="secondary" variant="contained">Add</Button>
            </DialogActions>
        </Dialog>
    );
}
 
export default AddTerritoryRecordForm;
