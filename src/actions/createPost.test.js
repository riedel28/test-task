import api from '../api';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';

import {
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,
  createPost,
} from './createPost';

const middleWare = [thunk];
const mockStore = configureMockStore(middleWare);
const fakeAxios = new MockAdapter(api);
const store = mockStore({
  auth: {
    user: {
      token: 'abc12345',
    },
  },
});

describe('createPost action', () => {
  beforeEach(() => {
    store.clearActions();
  });

  test('dispatches CREATE_POST_SUCCESS', async () => {
    fakeAxios.onPost('/feeds').reply(200, {
      feed: {
        title: 'Some title',
        content: 'Some content',
      },
    });

    await store.dispatch(
      createPost({
        title: 'Some title',
        content: 'Some content',
      })
    );

    const expectedActions = [
      { type: CREATE_POST_REQUEST },
      {
        type: CREATE_POST_SUCCESS,
        payload: {
          feed: {
            title: 'Some title',
            content: 'Some content',
          },
        },
      },
    ];

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('dispatches CREATE_POST_FAILURE', async () => {
    fakeAxios.onPost(`/feeds`).reply(400, {
      error: {
        message: 'Request failed with status code 400',
      },
    });

    await store.dispatch(createPost());

    const expectedActions = [
      { type: CREATE_POST_REQUEST },
      {
        type: CREATE_POST_FAILURE,
        payload: new Error('Request failed with status code 400'),
      },
    ];

    expect(store.getActions()).toEqual(expectedActions);
  });
});
