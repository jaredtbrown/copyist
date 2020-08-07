import React from 'react';
import Paper from '../Paper';
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
    }
}));

const RecordList = (props) => {
    const classes = useStyles();
    const theme = useTheme();

    const renderRecord = (record) => (
        <TableRow key={record.id} onDoubleClick={() => props.onClick(record)}>
            <TableCell>{`${record.createdAt.toDate().toLocaleDateString()} ${record.createdAt.toDate().toLocaleTimeString()}`}</TableCell>
            <TableCell>{(record.updatedAt) ? `${record.updatedAt.toDate().toLocaleDateString()} ${record.updatedAt.toDate().toLocaleTimeString()}` : ''}</TableCell>
            <TableCell>
                {record.firstName}
            </TableCell>
            <TableCell>
                {record.lastName}
            </TableCell>
            <TableCell>
                {record.streetAddress1}
            </TableCell>
            <TableCell>
                {record.streetAddress2}
            </TableCell>
            <TableCell>
                {record.city}
            </TableCell>
            <TableCell>
                {record.region}
            </TableCell>
            <TableCell>
                {record.postcode}
            </TableCell>
            <TableCell>
                {record.phone}
            </TableCell>
        </TableRow>
    )

    return (
        <div className={classes.root}>
            <TableContainer component={Paper}>
                <Toolbar>
                    <Typography variant="h5" className={classes.flex}>
                        Records
                    </Typography>
                    {
                        (useMediaQuery(theme.breakpoints.up('lg'))) &&
                        <Button color="secondary" variant="contained">
                            Add
                        </Button>
                    }
                </Toolbar>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Created At</TableCell>
                            <TableCell>Updated At</TableCell>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Street Address 1</TableCell>
                            <TableCell>Street Address 2</TableCell>
                            <TableCell>City</TableCell>
                            <TableCell>Region</TableCell>
                            <TableCell>Postcode</TableCell>
                            <TableCell>Phone</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.records.map(renderRecord)}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
 
export default RecordList;