import React from 'react';
import MuiPaper from '@material-ui/core/Paper';

const Paper = (props) => {
    return (
        <MuiPaper style={{ borderRadius: 16 }} {...props} />
    );
}
 
export default Paper;
