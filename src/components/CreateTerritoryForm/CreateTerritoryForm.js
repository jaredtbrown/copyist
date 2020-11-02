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

const CreateTerritoryForm = (props) => {
    const [newTerritory, setNewTerritory] = useState({
        number: '',
        externalLink: '',
    })

    const handleInputChange = (event) => {
        const newTerritoryData = {...newTerritory};
        newTerritoryData[event.target.name] = event.target.value;
        setNewTerritory(newTerritoryData);
    }

    const handleOnCreateClick = () => {
        props.onCreateClick(newTerritory);
    }

    const classes = useStyles();
    return (
        <Dialog open={props.open} onClose={props.handleClose} classes={{ paper: classes.paper, }}>
            <DialogTitle>Create Territory</DialogTitle>
            <DialogContent>
                <TextField
                    label="Number"
                    variant="outlined"
                    type="number"
                    name="number"
                    onChange={handleInputChange}
                    fullWidth
                    className={classes.textFields}
                />
                <TextField
                    label="External Link"
                    variant="outlined"
                    type="text"
                    name="externalLink"
                    onChange={handleInputChange}
                    fullWidth
                    className={classes.textFields}
                />
            </DialogContent>
            <DialogActions>
            <Button onClick={handleOnCreateClick} fullWidth color="secondary" variant="contained">Create</Button>
            </DialogActions>
        </Dialog>
    );
}
 
export default CreateTerritoryForm;
