import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import TerritoriesList from '../../components/TerritoriesList';
import CreateTerritoryForm from '../../components/CreateTerritoryForm';
import firebaseWrapper from '../../helpers/firebaseWrapper';
import { getTerrritories } from '../../actions/terrtories';

const Territories = (props) => {
    const { currentUser, dispatch } = props;
    const [newTerritoryDialogOpen, setNewTerritoryDialogOpen] = useState(false);

    useEffect(() => {
        dispatch(getTerrritories(currentUser.teamId))
    }, [currentUser.teamId, dispatch]);

    const handleOnCreateTerritoryClick = () => {
        setNewTerritoryDialogOpen(true);
    }

    const handleOnCreateTerritoryClose = () => {
        setNewTerritoryDialogOpen(false);
    }

    const createNewTerritory = async (territory) => {
        const database = firebaseWrapper.firestore();
        try {
            await database.collection('territories').add({
                number: territory.number,
                createdAt: firebaseWrapper.firestore.Timestamp.now(),
                teamId: currentUser.teamId,
                externalLink: territory.externalLink,
            });
            setNewTerritoryDialogOpen(false);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <React.Fragment>
            <TerritoriesList territories={props.territoriesState.territories} onCreateClick={handleOnCreateTerritoryClick} />
            <CreateTerritoryForm open={newTerritoryDialogOpen} onCreateClick={createNewTerritory} handleClose={handleOnCreateTerritoryClose} />
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