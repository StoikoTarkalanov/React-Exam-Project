export const login = async (username, password) => {
  try {
    const response = await fetch('https://parseapi.back4app.com/login', {
      method: 'Post',
      headers: {
        'X-Parse-Application-Id': 'd5M3jeFeVm9hVWtZUSE5zfv5vjW5LTGy7mYetitg',
        'X-Parse-REST-API-Key': 'JoszzkAhfbRqQKCiNGreC1evfFf4JF5S9tGjazvE',
        'X-Parse-Revocable-Session': 1,
      },
      body: JSON.stringify({ username, password }),
    });

    try {
      const data = await response.json();
      return data;
    } catch (err) {
      alert(err);
      return response;
    }
  } catch (error) {
    alert(error);
  }
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
