import { createStore, compose } from 'redux';
import rootReducer from '../reducers/index';

export default function configureStore() {
    const store = createStore(rootReducer, compose(
      window.devToolsExtension ? window.devToolsExtension() : f => f
    ));
    return store;
}
