const ip = '128.39.122.76';
export const GET_ALL_COFFEES = `http://${ip}:5000/api/coffee/`;
export const SEARCH_FOR_COFFEE =  searchString => {return `http://${ip}:5000/api/coffee/q=name&name=${searchString}`};
