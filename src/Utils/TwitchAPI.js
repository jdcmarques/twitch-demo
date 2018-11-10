import axios from "axios";

const api = 'https://api.twitch.tv/kraken/';

const headers = {
  'Client-ID': 'f5cqgzpt5gk27ka40s0xnhkzngff6p',
  'Accept': 'application/vnd.twitchtv.v5+json',
}

export const searchChannels = (query,limit) =>
axios.get(`${api}search/channels?query=${query}&limit=${limit}`,{
  method: 'GET',
  headers: {
    ...headers,
  },
}).then(res => res.data)
.catch(err => err);

export const searchGames = (query,limit) =>
axios.get(`${api}search/games?query=${query}&limit=${limit}`,{
  method: 'GET',
  headers: {
    ...headers,
  },
}).then(res => res.data)
.catch(err => err);


export const searchStreams = (query,limit) =>
  axios.get(`${api}search/streams?query=${query}&limit=${limit}`,{
    headers: {
      ...headers,
    },
  }).then(res => res.data)
  .catch(err => err);

export const getStreamById = (query) =>
  axios.get(`${api}streams/${query}`,{
    headers: {
      ...headers,
    },
  }).then(res=> res.data)
  .catch(err => err);