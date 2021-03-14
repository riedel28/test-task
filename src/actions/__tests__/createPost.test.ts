import api from '../../api';
import configureMockStore from 'redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';

import {
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,
  createPost
} from '../createPost';
import { RootState } from '../../configureStore';
import { AuthAction } from '../../reducers/auth';

type DispatchExts = ThunkDispatch<RootState, void, AuthAction>;

const middleWare = [thunk];
const mockStore = configureMockStore<RootState, DispatchExts>(middleWare);
const fakeAxios = new MockAdapter(api);

const store = mockStore({
  auth: {
    user: {
      name: 'John Doe',
      token: 'abc12345'
    },
    isLoggedIn: false,
    isLoading: false
  },
  feed: {
    isLoading: false,
    posts: [],
    error: null
  }
});

describe('createPost action', () => {
  beforeEach(() => {
    store.clearActions();
  });

  test('dispatches CREATE_POST_SUCCESS', async () => {
    fakeAxios.onPost('/feeds').reply(200, {
      feed: {
        title: 'Some title',
        content: 'Some content'
      }
    });

    await store.dispatch(
      createPost({
        title: 'Some title',
        content: 'Some content'
      })
    );

    const expectedActions = [
      { type: CREATE_POST_REQUEST },
      {
        type: CREATE_POST_SUCCESS,
        payload: {
          feed: {
            title: 'Some title',
            content: 'Some content'
          }
        }
      }
    ];

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('dispatches CREATE_POST_FAILURE', async () => {
    fakeAxios.onPost(`/feeds`).reply(400, {
      error: {
        message: 'Request failed with status code 400'
      }
    });

    await store.dispatch(
      createPost({ title: 'Some title', content: 'Some content' })
    );

    const expectedActions = [
      { type: CREATE_POST_REQUEST },
      {
        type: CREATE_POST_FAILURE,
        payload: new Error('Request failed with status code 400')
      }
    ];

    expect(store.getActions()).toEqual(expectedActions);
  });
});
