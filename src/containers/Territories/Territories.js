import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import TerritoriesList from '../../components/TerritoriesList';
import CreateTerritoryForm from '../../components/CreateTerritoryForm';
import { getTerrritories, createTerritory } from '../../actions/terrtories';

const Territories = (props) => {
    const { currentUser, dispatch } = props;
    const [newTerritoryDialogOpen, setNewTerritoryDialogOpen] = useState(false);

    useEffect(() => {
        dispatch(getTerrritories(currentUser.teamId))
    }, [currentUser.teamId, dispatch]);

    const handleOnClick = (territory) => {
        props.history.push(`/territories/${territory.id}`);
    };

    const handleOnCreateTerritoryClick = () => {
        setNewTerritoryDialogOpen(true);
    }

    const handleOnCreateTerritoryClose = () => {
        setNewTerritoryDialogOpen(false);
    }

    const createNewTerritory = async (territory) => {
        await dispatch(createTerritory({
            number: territory.number,
            teamId: currentUser.teamId,
            externalLink: territory.externalLink,
        }));
        setNewTerritoryDialogOpen(false);
    }

    return (
        <React.Fragment>
            <TerritoriesList 
                territories={props.territoriesState.territories} 
                onClick={handleOnClick}
                onCreateClick={handleOnCreateTerritoryClick} 
            />
            <CreateTerritoryForm 
                open={newTerritoryDialogOpen} 
                onCreateClick={createNewTerritory} 
                handleClose={handleOnCreateTerritoryClose} 
            />
        </React.Fragment>
    );
}
 
const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser,
        territoriesState: state.territories,
    }
}

export default connect(mapStateToProps)(Territories);