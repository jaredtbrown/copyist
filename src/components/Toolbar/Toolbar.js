import React from 'react';
import 'firebase/firestore';
import AppBar from '@material-ui/core/AppBar';
import MuiToolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux';

const useStyles = makeStyles(() => ({
    flex: {
        flexGrow: 1,
    },
}));

const Toolbar = (props) => {
    const classes = useStyles();
    return (
        <AppBar position="absolute">
            <MuiToolbar>
                <Typography variant="h6" className={classes.flex}>
                    {props.team.name}
                </Typography>
                <IconButton color="inherit">
                    <AccountCircleIcon />
                </IconButton>
            </MuiToolbar>
        </AppBar>
    )
};

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser,
        team: state.team,
    }
}

export default connect(mapStateToProps)(Toolbar);
