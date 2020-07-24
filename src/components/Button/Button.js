import React from 'react';
import MuiButton from '@material-ui/core/Button';

const Button = (props) => {
    return (
        <MuiButton disableElevation {...props}>
            {props.children}
        </MuiButton>
    );
}
 
export default Button;
