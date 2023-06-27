export const setLocalStorage = (name, data) =>
  localStorage.setItem(name, JSON.stringify(data));

export const getLocalStorage = name => JSON.parse(localStorage.getItem(name));

export const removeLocalStorage = name => localStorage.removeItem(name);
