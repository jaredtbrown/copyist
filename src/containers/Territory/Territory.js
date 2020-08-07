import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RecordList from '../../components/RecordList';
import { getTerritoryRecords, createTerritoryRecord } from '../../actions/territoryRecords';
import { connect } from 'react-redux';
import AddTerritoryRecordForm from '../../components/AddTerritoryRecordForm';

const Territory = (props) => {
    const { dispatch } = props;
    const { territoryId } = useParams();
    const [addRecordDialogOpen, setAddRecordDialogOpen] = useState(false);

    useEffect(() => {
        dispatch(getTerritoryRecords(territoryId))
    }, [territoryId, dispatch]);

    const handleOnAddTerritoryRecordClick = () => {
        setAddRecordDialogOpen(true);
    }

    const handleOnAddTerritoryRecordClose = () => {
        setAddRecordDialogOpen(false);
    }

    const addNewTerriotryRecord = async (record) => {
        await dispatch(createTerritoryRecord({
            firstName: record.firstName,
            lastName: record.lastName,
            territoryId: territoryId,
            teamId: props.currentUser.teamId,
            streetAddress1: record.streetAddress1,
            streetAddress2: record.streetAddress2,
            city: record.city,
            region: record.region,
            postcode: record.postcode,
            phone: record.phone,
        }));
        setAddRecordDialogOpen(false);
    }

    return (
        <React.Fragment>
            <RecordList
                records={props.records[territoryId] || []}
                onCreateClick={handleOnAddTerritoryRecordClick}
            />
            <AddTerritoryRecordForm
                open={addRecordDialogOpen}
                onCreateClick={addNewTerriotryRecord}
                handleClose={handleOnAddTerritoryRecordClose} 
            />
        </React.Fragment>
    );
}

const mapStateToProps = (state) => {
    const { territoryRecords, currentUser } = state;
    return {
        isFetching: territoryRecords.isFetching,
        records: territoryRecords.territoryRecords,
        currentUser,
    }
}

export default connect(mapStateToProps)(Territory);