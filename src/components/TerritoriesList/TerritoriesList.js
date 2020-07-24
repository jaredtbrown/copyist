import React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import MapIcon from '@material-ui/icons/Map';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '../Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.mixins.toolbar.minHeight + theme.spacing(3),
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3)
    },
    flex: {
        flexGrow: 1,
    }
}));

const TerritoriesList = (props) => {
    const handleViewExternalLinkClick = (url) => {
        window.open(url, '_blank');
    }

    const renderTerritory = (territory) => (
        <TableRow key={territory.id}>
            <TableCell>{territory.number}</TableCell>
            <TableCell>{new Date(territory.createdAt.nanoseconds).toLocaleTimeString()}</TableCell>
            <TableCell>{(territory.updatedAt) ? new Date(territory.updatedAt.nanoseconds).toLocaleTimeString() : ''}</TableCell>
            <TableCell align="right">
                <IconButton onClick={() => handleViewExternalLinkClick(territory.externalLink)}>
                    <MapIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    );

    const classes = useStyles();

    return (  
        <div className={classes.root}>
            <TableContainer component={Paper}>
                <Toolbar>
                    <Typography variant="h5" className={classes.flex}>
                        Territories
                    </Typography>
                    <Button color="secondary" variant="contained">
                        Create
                    </Button>
                </Toolbar>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Created At</TableCell>
                            <TableCell>Updated At</TableCell>
                            <TableCell align="right">Territory Helper Link</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.territories.map(renderTerritory)}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
 
export default TerritoriesList;