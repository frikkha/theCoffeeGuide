export const GET_ALL_COFFEES = `http://192.168.0.31:5000/api/coffee/`;
export const SEARCH_FOR_COFFEE =  searchString => {return `http://192.168.0.31:5000/api/coffee/q=name&name=${searchString}`};
