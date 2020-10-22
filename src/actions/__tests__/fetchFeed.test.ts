import api from '../../api';
import configureMockStore from 'redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';

import {
  FETCH_FEED_REQUEST,
  FETCH_FEED_SUCCESS,
  FETCH_FEED_FAILURE,
  fetchFeed,
} from '../fetchFeed';
import { RootState } from '../../configureStore';
import { FeedAction } from '../../reducers/feed';

type DispatchExts = ThunkDispatch<RootState, void, FeedAction>;

const middleware = [thunk];
const mockStore = configureMockStore<RootState, DispatchExts>(middleware);
const fakeAxios = new MockAdapter(api);
const store = mockStore();

describe('fetchFeed action', () => {
  beforeEach(() => {
    store.clearActions();
  });

  test('dispatches FETCH_FEED_SUCCESS', async () => {
    fakeAxios.onGet('/feeds').reply(200, {
      feeds: [
        { _id: '1', content: 'Some content' },
        { _id: '2', content: 'Some more content' },
      ],
    });

    await store.dispatch(fetchFeed());

    const expectedActions = [
      { type: FETCH_FEED_REQUEST },
      {
        type: FETCH_FEED_SUCCESS,
        payload: [
          { _id: '1', content: 'Some content' },
          { _id: '2', content: 'Some more content' },
        ],
      },
    ];

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('dispatches FETCH_FEED_FAILURE', async () => {
    fakeAxios.onGet('/feeds').reply(400, {
      error: {
        message: 'Request failed with status code 400',
      },
    });

    await store.dispatch(fetchFeed());

    const expectedActions = [
      { type: FETCH_FEED_REQUEST },
      {
        type: FETCH_FEED_FAILURE,
        payload: new Error('Request failed with status code 400'),
      },
    ];

    expect(store.getActions()).toEqual(expectedActions);
  });
});
