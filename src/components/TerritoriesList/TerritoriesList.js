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
import Fab from '@material-ui/core/Fab';
import CreateIcon from '@material-ui/icons/Create';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.mixins.toolbar.minHeight + theme.spacing(3),
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3)
    },
    flex: {
        flexGrow: 1,
    },
    fabIcon: {
        marginRight: theme.spacing(1),
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing(3),
        right: theme.spacing(3)
    },
    tableRow: {
        cursor: 'pointer',
    },
}));

const TerritoriesList = (props) => {
    const classes = useStyles();
    const theme = useTheme();

    const renderTerritory = (territory) => (
        <TableRow className={classes.tableRow} key={territory.id} onDoubleClick={() => props.onClick(territory)}>
            <TableCell>{territory.number}</TableCell>
            <TableCell>{`${territory.createdAt.toDate().toLocaleDateString()} ${territory.createdAt.toDate().toLocaleTimeString()}`}</TableCell>
            <TableCell>{(territory.updatedAt) ? `${territory.updatedAt.toDate().toLocaleDateString()} ${territory.updatedAt.toDate().toLocaleTimeString()}` : ''}</TableCell>
        </TableRow>
    );
    
    return (  
        <div className={classes.root}>
            <TableContainer component={Paper}>
                <Toolbar>
                    <Typography variant="h5" className={classes.flex}>
                        Territories
                    </Typography>
                    {
                        (useMediaQuery(theme.breakpoints.up('lg'))) &&
                        <Button color="secondary" variant="contained" onClick={props.onCreateClick}>
                            Create
                        </Button>
                    }
                </Toolbar>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Created At</TableCell>
                            <TableCell>Updated At</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.territories.map(renderTerritory)}
                    </TableBody>
                </Table>
            </TableContainer>

            {
                (useMediaQuery(theme.breakpoints.down('md'))) &&
                <Fab variant="extended" color="secondary" className={classes.fab} onClick={props.onCreateClick}>
                    <CreateIcon className={classes.fabIcon} />
                    Create
                </Fab>
            }
        </div>
    );
}
 
export default TerritoriesList;