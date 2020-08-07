import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RecordList from '../../components/RecordList';
import { getTerritoryRecords } from '../../actions/territoryRecords';
import { connect } from 'react-redux';

const Territory = (props) => {
    const { dispatch } = props;
    const { territoryId } = useParams();

    useEffect(() => {
        dispatch(getTerritoryRecords(territoryId))
    }, [territoryId, dispatch]);

    return (
        <RecordList
            records={props.records[territoryId] || []}
        />
    );
}

const mapStateToProps = (state) => {
    const { territoryRecords } = state;
    return {
        isFetching: territoryRecords.isFetching,
        records: territoryRecords.territoryRecords,
    }
}

export default connect(mapStateToProps)(Territory);