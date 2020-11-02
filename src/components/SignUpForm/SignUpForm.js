import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '../Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.primary.main,
        display: 'flex',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: theme.zIndex.appBar + 1,
        position: 'relative',
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        '& .MuiTextField-root': {
            marginBottom: theme.spacing(2),
        },
    },
    signUpCard: {
        margin: '0 auto',
        padding: theme.spacing(3),
        maxWidth: 400,
    },
}));

const SignUpForm = (props) => {
    const [signUpData, setSignUpData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        teamName: ''
    });

    const handleInputChange = (event) => {
        const newSignUpData = {...signUpData};
        newSignUpData[event.target.name] = event.target.value;
        setSignUpData(newSignUpData);
    }

    const handleSignUpClick = () => {
        props.onSignUpClick(signUpData);
    }

    const classes = useStyles(props);
    return (
        <div className={classes.root}>
            <Card className={classes.signUpCard}>
                <CardHeader title="Sign Up" />
                <CardContent>
                    <TextField
                        label="First Name"
                        variant="outlined"
                        name="firstName"
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <TextField
                        label="Last Name"
                        variant="outlined"
                        name="lastName"
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <TextField
                        label="Email"
                        variant="outlined"
                        type="email"
                        name="email"
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        type="password"
                        name="password"
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <TextField
                        label="Team Name"
                        variant="outlined"
                        name="teamName"
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <Button 
                        variant="contained" 
                        size="large"
                        color="secondary"
                        fullWidth
                        onClick={handleSignUpClick}
                    >
                        Sign Up
                    </Button>
                    <Typography variant="caption" align="center" paragraph>
                        Already a user? <Link to="/login">Login</Link>
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
};

SignUpForm.props = {
    onSignUpClick: PropTypes.func.isRequired,
}

export default SignUpForm;