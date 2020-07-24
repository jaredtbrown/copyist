import currentUser from './currentUser';
import team from './team';
import territories from './territories';
import { combineReducers } from 'redux';

const app = combineReducers({
  currentUser,
  team,
  territories,
});

export default app;
