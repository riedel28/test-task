import api from '../api';
import configureMockstore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';

import {
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE,
  deletePost,
} from './deletePost';

const middleware = [thunk];
const mockStore = configureMockstore(middleware);
const fakeAxios = new MockAdapter(api);
const store = mockStore({
  feed: {
    posts: [{ _id: '30', title: 'Some title', content: 'Some content' }],
  },
  auth: {
    user: {
      token: 'abc12345',
    },
  },
});

describe('deletePost action', () => {
  beforeEach(() => {
    store.clearActions();
  });

  test('dispatches DELETE_POST_SUCCESS', async () => {
    fakeAxios.onDelete(`/feeds/${30}`).reply(200, {
      _id: '30',
    });

    await store.dispatch(deletePost('30'));

    const expectedActions = [
      { type: DELETE_POST_REQUEST },
      {
        type: DELETE_POST_SUCCESS,
        payload: {
          _id: '30',
        },
      },
    ];

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('dispatches DELETE_POST_FAILURE', async () => {
    fakeAxios.onDelete(`/feeds/${20}`).reply(404, {
      error: {
        message: 'Request failed with status code 404',
      },
    });

    await store.dispatch(deletePost('20'));

    const expectedActions = [
      { type: DELETE_POST_REQUEST },
      {
        type: DELETE_POST_FAILURE,
        payload: new Error('Request failed with status code 404'),
      },
    ];

    expect(store.getActions()).toEqual(expectedActions);
  });
});
