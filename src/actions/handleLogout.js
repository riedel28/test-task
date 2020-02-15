export const LOG_OUT = 'LOG_OUT';

export const handleLogout = () => {
  return async (dispatch) => {
    const auth2 = await window.gapi.auth2.getAuthInstance();

    auth2.signOut().then(() => {
      dispatch({ type: LOG_OUT });
    });
  };
};
