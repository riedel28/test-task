import api from '../api';
import configureMockstore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';

import {
  EDIT_POST_REQUEST,
  EDIT_POST_SUCCESS,
  EDIT_POST_FAILURE,
  editPost,
} from './editPost';

const middleware = [thunk];
const mockStore = configureMockstore(middleware);
const fakeAxios = new MockAdapter(api);
const store = mockStore({
  feed: {
    posts: [{ _id: 30, title: 'Some title', content: 'Some content' }],
  },
  auth: {
    user: {
      token: 'abc12345',
    },
  },
});

describe('editPost action', () => {
  beforeEach(() => {
    store.clearActions();
  });

  test('dispatches EDIT_POST_SUCCESS', async () => {
    fakeAxios.onPut(`/feeds/${30}`).reply(
      200,
      {
        feed: {
          title: 'New title',
          content: 'New content',
        },
      },
      {
        'x-access-token': 'abc12345',
      }
    );

    await store.dispatch(
      editPost('30', {
        title: 'New title',
        content: 'New content',
      })
    );

    const expectedActions = [
      { type: EDIT_POST_REQUEST },
      {
        type: EDIT_POST_SUCCESS,
        payload: {
          title: 'New title',
          content: 'New content',
        },
      },
    ];

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('dispatches EDIT_POST_FAILURE', async () => {
    fakeAxios.onPut(`/feeds/${30}`).reply(
      400,
      {
        error: {
          message: 'Request failed with status code 400',
        },
      },
      {
        'x-access-token': 'abc12345',
      }
    );

    await store.dispatch(
      editPost('30', {
        title: 'New title',
        content: 'New content',
      })
    );

    const expectedActions = [
      { type: EDIT_POST_REQUEST },
      {
        type: EDIT_POST_FAILURE,
        payload: new Error('Request failed with status code 400'),
      },
    ];

    expect(store.getActions()).toEqual(expectedActions);
  });
});
