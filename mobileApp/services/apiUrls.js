const ip = '192.168.1.110';
export const GET_ALL_COFFEES = `http://${ip}:5000/api/coffee/`;
export const SEARCH_FOR_COFFEE = (searchString) => `http://${ip}:5000/api/coffee/q=name&name=${searchString}`;
