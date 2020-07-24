import React, { useState } from 'react';
import 'firebase/firestore';
import AppBar from '@material-ui/core/AppBar';
import MuiToolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import Menu from '@material-ui/core/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import firebase from 'firebase/app';
import 'firebase/auth';

const useStyles = makeStyles((theme) => ({
    flex: {
        flexGrow: 1,
    },
}));

const Toolbar = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        try {
            await firebase.auth().signOut();
            handleClose();
        } catch (error) {
            console.log(error);
        }
    };

    const classes = useStyles();
    return (
        <AppBar position="fixed">
            <MuiToolbar>
                <Typography variant="h6" className={classes.flex}>
                    {props.team.name}
                </Typography>
                <IconButton color="inherit" onClick={handleClick}>
                    <AccountCircleIcon />
                </IconButton>
                <Menu
                    id="user-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <List>
                        <ListSubheader>Account</ListSubheader>
                        <ListItem onClick={handleClose} button>
                            <ListItemIcon>
                                <AccountCircleIcon />
                            </ListItemIcon>
                            <ListItemText primary={`${props.currentUser.firstName} ${props.currentUser.lastName}`} />
                        </ListItem>
                        <ListItem onClick={handleClose} button>
                            <ListItemIcon>
                                <EmailIcon />
                            </ListItemIcon>
                            <ListItemText primary={props.currentUser.email} />
                        </ListItem>
                        <ListItem>
                            <Button 
                                variant="outlined"
                                onClick={handleLogout} 
                                fullWidth
                                color="secondary"
                            >
                                Log Out
                            </Button>
                        </ListItem>
                    </List>
                </Menu>
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
