import { LOAD_TOKEN, LOAD_USERID, USER_LOG_OUT } from '../actions/types';
import update from 'react-addons-update';

var defaultValues = {
  token: '',
  userID: ''
}

export default function(state = defaultValues , action) {
  var newState;
  switch (action.type){
    case LOAD_TOKEN:
      newState = update(state, {token: {$set: action.payload}});
      return newState;
    case LOAD_USERID:
      newState = update(state, {userID: {$set: action.payload}});
      return newState;
    case USER_LOG_OUT:
      newState = update(state, {$set: defaultValues});
      return newState;
    default:
      return state;
  }
}