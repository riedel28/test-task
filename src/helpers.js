export const checkCredentials = (username, password) => {
  return username.trim() === 'Admin' && password.trim() === '12345';
};
