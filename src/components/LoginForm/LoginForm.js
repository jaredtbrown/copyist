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
        borderRadius: 16,
        maxWidth: 400,
    },
}));

const LoginForm = (props) => {
    const [login, setLogin] = useState({
        email: '',
        password: '',
    });

    const handleInputChange = (event) => {
        const loginData = {...login};
        loginData[event.target.name] = event.target.value;
        setLogin(loginData);
    }

    const handleLoginClick = () => {
        props.onLoginClick(login.email, login.password);
    }

    const classes = useStyles(props);
    return (
        <div className={classes.root}>
            <Card className={classes.signUpCard} classes={{ paper: classes.signUpCardPaper }}>
                <CardHeader title="Login" />
                <CardContent>
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
                    <Button 
                        variant="contained" 
                        size="large"
                        color="secondary"
                        fullWidth
                        onClick={handleLoginClick}
                    >
                        Login
                    </Button>
                    <Typography variant="caption" align="center" paragraph>
                        New? <Link to="/signup">Sign Up</Link>
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
};

LoginForm.props = {
    onLoginClick: PropTypes.func.isRequired,
}

export default LoginForm;