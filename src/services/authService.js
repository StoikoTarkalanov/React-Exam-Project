const serverURL = 'https://parseapi.back4app.com';

export const login = async (username, password) => {
  const response = await fetch(`${serverURL}/login`, {
    method: 'POST',
    headers: {
      'X-Parse-Application-Id': 'd5M3jeFeVm9hVWtZUSE5zfv5vjW5LTGy7mYetitg',
      'X-Parse-REST-API-Key': 'JoszzkAhfbRqQKCiNGreC1evfFf4JF5S9tGjazvE',
      'X-Parse-Revocable-Session': 1,
    },
    body: JSON.stringify({ username, password }),
  });

  const result = await response.json();
  return result;
};

export const logout = () => {
  localStorage.removeItem('username');
};

export const getUser = () => {
  let username = localStorage.getItem('username');
  return username;
};

export const isAuthenticated = () => {
  return Boolean(getUser());
};
