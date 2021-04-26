import { createStore } from 'redux'
import reducer from './redux/reducers'

// this would be store.reducer.${value}
// const reducers = combineReducers({ reducer })

export default createStore(reducer)