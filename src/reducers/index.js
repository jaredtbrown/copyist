import currentUser from './currentUser';
import team from './team';
import { combineReducers } from 'redux';

const app = combineReducers({
  currentUser,
  team,
});

export default app;
