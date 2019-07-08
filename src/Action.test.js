import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import LoginCheck from '../actions';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("check action", () => {
  it('should execute fetch data', async () => {
    const store = mockStore()
    await store.dispatch(LoginCheck());
    const actions = store.getActions();
    expect(actions[0]).toEqual({type: "FETCHING"});
    expect(actions[1]).toEqual({type: "FETCH", payload: ""});
    expect(actions[2]).toEqual({type: "FETCH_ERROR"});
  })
})