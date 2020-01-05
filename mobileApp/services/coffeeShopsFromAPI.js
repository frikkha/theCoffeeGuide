import axios from 'axios';

const YELP_API_KEY = 'zCQlxoA20XmDUAoMyQvF6p4jW78bmVTrv0gQ15oxFoHh34S_7i--kNpHf4Bj_mGSBPj5uurCNqOhxTVG0ROdlS7B-6PaJQqk2b7EAHi243MxSlU3wl66LZTtcAH0XXYx';

const api = axios.create({
  baseURL: 'https://api.yelp.com/v3',
  headers: {
    Authorization: `Bearer ${YELP_API_KEY}`,
  },
});

const getCoffeeShops = (userLocation) => api
  .get('/businesses/search', {
    params: {
      limit: 20,
      categories: 'coffee,coffeeroasteries,coffeeshops',
      ...userLocation,
    },
  })
  .then((res) => res.data.businesses.map((business) => ({
    name: business.name,
    coords: business.coordinates,
  })))
  .catch((error) => console.error(error));

export default {
  getCoffeeShops,
};
