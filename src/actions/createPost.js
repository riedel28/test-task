import rootApiUrl from './../helpers/rootApiUrl.js';

export const CREATE_POST_REQUEST = 'CREATE_POST_REQUEST';
export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS';
export const CREATE_POST_FAILURE = 'CREATE_POST_FAILURE';

export const createPost = (post) => {
  return (dispatch, getState) => {
    dispatch({ type: CREATE_POST_REQUEST });

    const token = getState().auth.user.token;

    console.log(token);

    fetch(`${rootApiUrl}/feeds`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'x-access-token': token,
      },

      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((body) => {
        console.log(body);
      });
    // .catch((error) => {
    //   dispatch({ type: CREATE_POST_FAILURE, payload: error });
    // });
  };
};
