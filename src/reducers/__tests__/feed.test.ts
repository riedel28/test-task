import {
  FETCH_FEED_REQUEST,
  FETCH_FEED_SUCCESS,
  FETCH_FEED_FAILURE
} from '../../actions/fetchFeed';
import {
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE
} from '../../actions/createPost';
import {
  EDIT_POST_REQUEST,
  EDIT_POST_SUCCESS,
  EDIT_POST_FAILURE
} from '../../actions/editPost';
import {
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE
} from '../../actions/deletePost';
import feed, {
  initialState,
  FetchFeedRequestAction,
  FetchFeedSuccessAction,
  FetchFeedFailureAction,
  CreatePostRequestAction,
  CreatePostSuccessAction,
  CreatePostFailureAction,
  EditPostRequestAction,
  EditPostSuccessAction,
  EditPostFailureAction,
  DeletePostRequestAction,
  DeletePostSuccessAction,
  DeletePostFailureAction
} from '../feed';

describe('Feed reducer', () => {
  test('FETCH_FEED_REQUEST', () => {
    const action = {
      type: FETCH_FEED_REQUEST
    } as FetchFeedRequestAction;

    expect(feed(initialState, action)).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  test('FETCH_FEED_SUCCESS ', () => {
    const posts = [
      {
        _id: '1',
        title: 'Some title',
        content: 'Some content',
        creator: {
          _id: '22',
          displayName: 'John Doe'
        },
        __v: '0',
        createDate: ''
      },
      {
        _id: '2',
        title: 'Some title',
        content: 'Some content',
        creator: {
          _id: '23',
          displayName: 'Jane Doe'
        },
        __v: '0',
        createDate: ''
      }
    ];

    const action = {
      type: FETCH_FEED_SUCCESS,
      payload: posts
    } as FetchFeedSuccessAction;

    expect(feed(initialState, action)).toEqual({
      ...initialState,
      posts: posts
    });
  });

  test('FETCH_FEED_FAILURE', () => {
    const errorMessage = 'Something went wrong';

    const action = {
      type: FETCH_FEED_FAILURE,
      payload: {
        message: errorMessage
      }
    } as FetchFeedFailureAction;

    expect(feed(initialState, action)).toEqual({
      ...initialState,
      error: {
        message: errorMessage
      }
    });
  });

  test('FETCH_FEED_REQUEST with inital error', () => {
    const initialStateWithError = {
      error: { message: 'Unknown error' },
      posts: [],
      isLoading: false
    };

    const action = {
      type: FETCH_FEED_REQUEST
    } as FetchFeedRequestAction;

    expect(feed(initialStateWithError, action)).toEqual({
      ...initialStateWithError,
      isLoading: true,
      error: null
    });
  });

  test('CREATE_POST_REQUEST', () => {
    const action = {
      type: CREATE_POST_REQUEST
    } as CreatePostRequestAction;

    expect(feed(initialState, action)).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  test('CREATE_POST_SUCCESS', () => {
    const post = {
      _id: '1',
      title: 'Some title',
      content: 'Some content',
      creator: {
        _id: '22',
        displayName: 'John Doe'
      },
      __v: '0',
      createDate: ''
    };
    const action = {
      type: CREATE_POST_SUCCESS,
      payload: {
        feed: post
      }
    } as CreatePostSuccessAction;

    expect(feed(initialState, action)).toEqual({
      ...initialState,
      isLoading: false,
      posts: [...initialState.posts, post]
    });
  });

  test('CREATE_POST_FAILURE ', () => {
    const action = {
      type: CREATE_POST_FAILURE,
      payload: { message: 'Error' }
    } as CreatePostFailureAction;

    expect(feed(initialState, action)).toEqual({
      ...initialState,
      isLoading: false,
      error: { message: 'Error' }
    });
  });

  test('EDIT_POST_REQUEST', () => {
    const action = {
      type: EDIT_POST_REQUEST
    } as EditPostRequestAction;

    expect(feed(initialState, action)).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  test('EDIT_POST_SUCCESS ', () => {
    const posts = [
      {
        _id: '1',
        title: 'Some title',
        content: 'Some content',
        creator: {
          _id: '22',
          displayName: 'John Doe'
        },
        __v: '0',
        createDate: ''
      },
      {
        _id: '2',
        title: 'Some title',
        content: 'Some content',
        creator: {
          _id: '23',
          displayName: 'Jane Doe'
        },
        __v: '0',
        createDate: ''
      }
    ];

    const initialStateWithPosts = {
      ...initialState,
      posts: posts
    };

    const action = {
      type: EDIT_POST_SUCCESS,
      payload: {
        _id: '100',
        title: 'Some title',
        content: 'Some content',
        creator: {
          _id: '23',
          displayName: 'Jane Doe'
        },
        __v: '0',
        createDate: ''
      }
    } as EditPostSuccessAction;

    const actionsWithNewPostTitle = {
      type: EDIT_POST_SUCCESS,
      payload: {
        _id: '1',
        title: 'New title',
        content: 'Some content',
        creator: {
          _id: '22',
          displayName: 'John Doe'
        },
        __v: '0',
        createDate: ''
      }
    } as EditPostSuccessAction;

    expect(feed(initialStateWithPosts, action)).toEqual({
      ...initialStateWithPosts,
      isLoading: false
    });

    expect(feed(initialStateWithPosts, actionsWithNewPostTitle)).toEqual({
      ...initialStateWithPosts,
      isLoading: false,
      posts: [
        {
          _id: '1',
          title: 'New title',
          content: 'Some content',
          creator: {
            _id: '22',
            displayName: 'John Doe'
          },
          __v: '0',
          createDate: ''
        },
        {
          _id: '2',
          title: 'Some title',
          content: 'Some content',
          creator: {
            _id: '23',
            displayName: 'Jane Doe'
          },
          __v: '0',
          createDate: ''
        }
      ]
    });
  });

  test('EDIT_POST_FAILURE ', () => {
    const action = {
      type: EDIT_POST_FAILURE,
      payload: { message: 'Error' }
    } as EditPostFailureAction;

    expect(feed(initialState, action)).toEqual({
      ...initialState,
      isLoading: false,
      error: { message: 'Error' }
    });
  });

  test('DELETE_POST_REQUEST', () => {
    const action = {
      type: DELETE_POST_REQUEST
    } as DeletePostRequestAction;

    expect(feed(initialState, action)).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  test('DELETE_POST_SUCCESS', () => {
    const initialStateWithPosts = {
      ...initialState,
      posts: [
        {
          _id: '1',
          title: 'New title',
          content: 'Some content',
          creator: {
            _id: '22',
            displayName: 'John Doe'
          },
          __v: '0',
          createDate: ''
        },
        {
          _id: '2',
          title: 'Some title',
          content: 'Some content',
          creator: {
            _id: '23',
            displayName: 'Jane Doe'
          },
          __v: '0',
          createDate: ''
        }
      ]
    };

    const action = {
      type: DELETE_POST_SUCCESS,
      payload: { _id: '1' }
    } as DeletePostSuccessAction;

    const actionWithWrondId = {
      type: DELETE_POST_SUCCESS,
      payload: { _id: '100' }
    } as DeletePostSuccessAction;

    expect(feed(initialStateWithPosts, actionWithWrondId)).toEqual({
      ...initialStateWithPosts,
      isLoading: false
    });
    expect(feed(initialStateWithPosts, action)).toEqual({
      ...initialStateWithPosts,
      isLoading: false,
      posts: [
        {
          _id: '2',
          title: 'Some title',
          content: 'Some content',
          creator: {
            _id: '23',
            displayName: 'Jane Doe'
          },
          __v: '0',
          createDate: ''
        }
      ]
    });
  });

  test('DELETE_POST_FAILURE', () => {
    const action = {
      type: DELETE_POST_FAILURE,
      payload: { message: 'Error' }
    } as DeletePostFailureAction;

    expect(feed(initialState, action)).toEqual({
      ...initialState,
      isLoading: false,
      error: { message: 'Error' }
    });
  });
});
