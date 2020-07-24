import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { connect } from 'react-redux'
import { setTerritories } from '../../actions/terrtories';
import TerritoriesList from '../../components/TerritoriesList';
import CreateTerritoryForm from '../../components/CreateTerritoryForm';

const Territories = (props) => {
    const { currentUser, dispatch } = props;
    const [newTerritoryDialogOpen, setNewTerritoryDialogOpen] = useState(false);

    useEffect(() => {
        const database = firebase.firestore();
        try {
            database.collection('territories')
                .where('teamId', '==', currentUser.teamId)
                .onSnapshot(snapShot => {
                    const territories = [];
                    snapShot.forEach(document => {
                        const territory = {
                            id: document.id,
                            ...document.data(),
                        }
                        territories.push(territory);
                    });
                    dispatch(setTerritories(territories));
                });
        } catch (error) {
            console.log(error);
        }
    }, [currentUser.teamId, dispatch]);

    const handleOnCreateTerritoryClick = () => {
        setNewTerritoryDialogOpen(true);
    }

    const handleOnCreateTerritoryClose = () => {
        setNewTerritoryDialogOpen(false);
    }

    const createNewTerritory = async (territory) => {
        const database = firebase.firestore();
        try {
            await database.collection('territories').add({
                number: territory.number,
                createdAt: firebase.firestore.Timestamp.now(),
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
            <TerritoriesList territories={props.territories} onCreateClick={handleOnCreateTerritoryClick} />
            <CreateTerritoryForm open={newTerritoryDialogOpen} onCreateClick={createNewTerritory} handleClose={handleOnCreateTerritoryClose} />
        </React.Fragment>
    );
}
 
const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser,
        territories: state.territories,
    }
}

export default connect(mapStateToProps)(Territories);