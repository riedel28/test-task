export const FETCH_NEWS_REQUEST = 'FETCH_NEWS_REQUEST';
export const FETCH_NEWS_SUCCESS = 'FETCH_NEWS_SUCCESS';
export const FETCH_NEWS_FAILURE = 'FETCH_NEWS_FAILURE';
export const FETCH_USER_INFO_FAILURE = 'FETCH_USER_INFO_FAILURE';

export const fetchNews = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_NEWS_REQUEST });

    fetch(`https://mysterious-reef-29460.herokuapp.com/api/v1/news`)
      .then((response) => response.json())
      .then((body) => {
        if (body.status === 'ok') {
          dispatch({ type: FETCH_NEWS_SUCCESS, payload: body.data });
        }

        if (body.status === 'err') {
          dispatch({ type: FETCH_USER_INFO_FAILURE, payload: body.message });
        }
      })
      .catch((error) => {});
  };
};
