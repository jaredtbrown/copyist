import React, { useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { connect } from 'react-redux'
import { setTerritories } from '../../actions/terrtories';
import TerritoriesList from '../../components/TerritoriesList';

const Territories = (props) => {
    const { currentUser, dispatch } = props;
    useEffect(() => {
        const database = firebase.firestore();
        try {
            database.collection('territories')
                .where('teamId', '==', currentUser.teamId)
                .onSnapshot(snapShot => {
                    const territories = [];
                    snapShot.forEach(document => {
                        territories.push(document.data());
                    });
                    dispatch(setTerritories(territories));
                });
        } catch (error) {
            console.log(error);
        }
    }, [currentUser.teamId, dispatch]);

    return (
        <TerritoriesList territories={props.territories} />
    );
}
 
const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser,
        territories: state.territories,
    }
}

export default connect(mapStateToProps)(Territories);