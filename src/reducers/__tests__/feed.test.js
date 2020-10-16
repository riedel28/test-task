import feed, { initialState } from '../feed';
import {
  FETCH_FEED_REQUEST,
  FETCH_FEED_SUCCESS,
  FETCH_FEED_FAILURE,
} from '../../actions/fetchFeed';
import {
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,
} from '../../actions/createPost';
import {
  EDIT_POST_REQUEST,
  EDIT_POST_SUCCESS,
  EDIT_POST_FAILURE,
} from '../../actions/editPost';
import {
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE,
} from '../../actions/deletePost';

describe('Feed reducer', () => {
  test('FETCH_FEED_REQUEST', () => {
    const action = {
      type: FETCH_FEED_REQUEST,
    };

    expect(feed(initialState, action)).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  test('FETCH_FEED_SUCCESS ', () => {
    const posts = [
      {
        id: 1,
        content: 'Some content',
      },
      {
        id: 2,
        content: 'More content',
      },
    ];

    const action = {
      type: FETCH_FEED_SUCCESS,
      payload: posts,
    };

    expect(feed(initialState, action)).toEqual({
      ...initialState,
      posts: posts,
    });
  });

  test('FETCH_FEED_FAILURE', () => {
    const errorMessage = 'Something went wrong';

    const action = {
      type: FETCH_FEED_FAILURE,
      payload: errorMessage,
    };

    expect(feed(initialState, action)).toEqual({
      ...initialState,
      error: errorMessage,
    });
  });

  test('FETCH_FEED_REQUEST with inital error', () => {
    const initialStateWithError = {
      error: 'Unknown error',
      posts: [],
      isLoading: false,
    };

    const action = {
      type: FETCH_FEED_REQUEST,
    };

    expect(feed(initialStateWithError, action)).toEqual({
      ...initialStateWithError,
      isLoading: true,
      error: null,
    });
  });

  test('CREATE_POST_REQUEST', () => {
    const action = {
      type: CREATE_POST_REQUEST,
    };

    expect(feed(initialState, action)).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  test('CREATE_POST_SUCCESS', () => {
    const action = {
      type: CREATE_POST_SUCCESS,
      payload: {
        feed: { id: 1, content: 'Some content' },
      },
    };

    expect(feed(initialState, action)).toEqual({
      ...initialState,
      isLoading: false,
      posts: [...initialState.posts, { id: 1, content: 'Some content' }],
    });
  });

  test('CREATE_POST_FAILURE ', () => {
    const action = {
      type: CREATE_POST_FAILURE,
      payload: { message: 'Error' },
    };

    expect(feed(initialState, action)).toEqual({
      ...initialState,
      isLoading: false,
      error: { message: 'Error' },
    });
  });

  test('EDIT_POST_REQUEST', () => {
    const action = {
      type: EDIT_POST_REQUEST,
    };

    expect(feed(initialState, action)).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  test('EDIT_POST_SUCCESS ', () => {
    const initialStateWithPosts = {
      ...initialState,
      posts: [
        { _id: 1, content: 'Old content' },
        { _id: 2, content: 'Some content' },
      ],
    };

    const action = {
      type: EDIT_POST_SUCCESS,
      payload: { _id: 1, content: 'New content' },
    };

    expect(feed(initialStateWithPosts, { _id: 100, content: '' })).toEqual({
      ...initialStateWithPosts,
      isLoading: false,
    });
    expect(feed(initialStateWithPosts, action)).toEqual({
      ...initialStateWithPosts,
      isLoading: false,
      posts: [
        { _id: 1, content: 'New content' },
        { _id: 2, content: 'Some content' },
      ],
    });
  });

  test('EDIT_POST_FAILURE ', () => {
    const action = {
      type: EDIT_POST_FAILURE,
      payload: { message: 'Error' },
    };

    expect(feed(initialState, action)).toEqual({
      ...initialState,
      isLoading: false,
      error: { message: 'Error' },
    });
  });

  test('DELETE_POST_REQUEST', () => {
    const action = {
      type: DELETE_POST_REQUEST,
    };

    expect(feed(initialState, action)).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  test('DELETE_POST_SUCCESS', () => {
    const initialStateWithPosts = {
      ...initialState,
      posts: [
        { _id: 1, content: 'Old content' },
        { _id: 2, content: 'Some content' },
        { _id: 3, content: 'Some more content' },
      ],
    };

    const action = {
      type: DELETE_POST_SUCCESS,
      payload: { _id: 2, content: 'Some content' },
    };

    expect(
      feed(initialStateWithPosts, {
        _id: 99,
      })
    ).toEqual({
      ...initialStateWithPosts,
      isLoading: false,
    });
    expect(feed(initialStateWithPosts, action)).toEqual({
      ...initialStateWithPosts,
      isLoading: false,
      posts: [
        { _id: 1, content: 'Old content' },
        { _id: 3, content: 'Some more content' },
      ],
    });
  });

  test('DELETE_POST_FAILURE', () => {
    const action = {
      type: DELETE_POST_FAILURE,
      payload: { message: 'Error' },
    };

    expect(feed(initialState, action)).toEqual({
      ...initialState,
      isLoading: false,
      error: { message: 'Error' },
    });
  });
});
