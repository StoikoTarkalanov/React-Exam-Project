const serverURL = 'https://parseapi.back4app.com';

const createPointer = (objectId) => {
  return {
    __type: 'Pointer',
    className: '_User',
    objectId: objectId,
  };
};

export const getAllCars = async () => {
  const response = await fetch(`${serverURL}/classes/Cars`, {
    method: 'GET',
    headers: {
      'X-Parse-Application-Id': 'd5M3jeFeVm9hVWtZUSE5zfv5vjW5LTGy7mYetitg',
      'X-Parse-REST-API-Key': 'JoszzkAhfbRqQKCiNGreC1evfFf4JF5S9tGjazvE',
      'Content-Type': 'application/json',
    },
  });

  const result = await response.json();
  return result;
};

export const getUserCars = async ({ objectId }) => {
  const owner = createPointer(objectId);
  const query = JSON.stringify({ owner });

  const response = await fetch(`${serverURL}/classes/Cars?where=${encodeURIComponent(query)}`, {
    method: 'GET',
    headers: {
      'X-Parse-Application-Id': 'd5M3jeFeVm9hVWtZUSE5zfv5vjW5LTGy7mYetitg',
      'X-Parse-REST-API-Key': 'JoszzkAhfbRqQKCiNGreC1evfFf4JF5S9tGjazvE',
      'Content-Type': 'application/json',
    },
  });

  const result = await response.json();
  return result;
};

export const getCarById = async (id) => {
  const response = await fetch(`${serverURL}/classes/Cars/${id}`, {
    method: 'GET',
    headers: {
      'X-Parse-Application-Id': 'd5M3jeFeVm9hVWtZUSE5zfv5vjW5LTGy7mYetitg',
      'X-Parse-REST-API-Key': 'JoszzkAhfbRqQKCiNGreC1evfFf4JF5S9tGjazvE',
      'Content-Type': 'application/json',
    },
  });

  const result = await response.json();
  return result;
};

export const create = async (createData, sessionToken, objectId, username) => {
  const data = Object.assign({}, createData);
  data.owner = createPointer(objectId);
  data.createdBy = username;
  data.likes = [];

  const response = await fetch(`${serverURL}/classes/Cars`, {
    method: 'POST',
    headers: {
      'X-Parse-Application-Id': 'd5M3jeFeVm9hVWtZUSE5zfv5vjW5LTGy7mYetitg',
      'X-Parse-REST-API-Key': 'JoszzkAhfbRqQKCiNGreC1evfFf4JF5S9tGjazvE',
      'Content-Type': 'application/json',
      'X-Parse-Session-Token': sessionToken,
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  return result;
};

export const edit = async (objectId, sessionToken, data) => {
  const response = await fetch(`${serverURL}/classes/Cars/${objectId}`, {
    method: 'PUT',
    headers: {
      'X-Parse-Application-Id': 'd5M3jeFeVm9hVWtZUSE5zfv5vjW5LTGy7mYetitg',
      'X-Parse-REST-API-Key': 'JoszzkAhfbRqQKCiNGreC1evfFf4JF5S9tGjazvE',
      'Content-Type': 'application/json',
      'X-Parse-Session-Token': sessionToken,
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  return result;
};

export const destroy = async (objectId, sessionToken) => {
  const response = await fetch(`${serverURL}/classes/Cars/${objectId}`, {
    method: 'DELETE',
    headers: {
      'X-Parse-Application-Id': 'd5M3jeFeVm9hVWtZUSE5zfv5vjW5LTGy7mYetitg',
      'X-Parse-REST-API-Key': 'JoszzkAhfbRqQKCiNGreC1evfFf4JF5S9tGjazvE',
      'X-Parse-Session-Token': sessionToken,
    },
  });

  const result = await response.json();
  return result;
};