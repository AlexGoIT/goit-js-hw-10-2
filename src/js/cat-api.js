import axios from 'axios';

const API_KEY =
  'live_BrZTxXKdouTcFlFfm6xqJSntL6oB8oYnAENBbMKjIUsIM7yPFjegNXrpTFc0i1tm';

const instance = axios.create({
  baseURL: 'https://api.thecatapi.com/v1/',
  headers: {
    'x-api-key': API_KEY,
  },
});

export function fetchBreeds(breedId) {
  if (!breedId) {
    return instance.get('breeds');
  } else {
    return instance.get(`breeds/${breedId}`);
  }
}

export function fetchCatByBreed(breedId) {
  const params = {
    breed_ids: breedId,
  };

  return instance.get(`images/search`, params);
}
