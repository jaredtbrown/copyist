import currentUser from './currentUser';
import team from './team';
import territories from './territories';
import territoryRecords from './territoryRecords';
import { combineReducers } from 'redux';

const app = combineReducers({
  currentUser,
  team,
  territories,
  territoryRecords
});

export default app;
