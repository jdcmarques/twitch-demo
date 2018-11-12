import axios from "axios";

// Twitch API -> And needed Headers
const api = 'https://api.twitch.tv/kraken/';
const headers = {
  'Client-ID': 'f5cqgzpt5gk27ka40s0xnhkzngff6p',
  'Accept': 'application/vnd.twitchtv.v5+json',
}

// NOT USED!!! -> Searches for channels
export const searchChannels = (query,limit) =>
  axios.get(`${api}search/channels?query=${query}&limit=${limit}`,{
    headers: {
      ...headers,
    },
  }).then(res => res.data)
  .catch(err => err);

// NOT USED!!! -> Search for games
export const searchGames = (query,limit) =>
  axios.get(`${api}search/games?query=${query}&limit=${limit}`,{
    headers: {
      ...headers,
    },
  }).then(res => res.data)
  .catch(err => err);
  
//Search for Streams based on a query and user defined input
export const searchStreams = (query,limit) =>
  axios.get(`${api}search/streams?query=${query}&limit=${limit}`,{
    headers: {
      ...headers,
    },
  });

//Get specif stream information based on channel ID
export const getStreamById = (query) =>
  axios.get(`${api}streams/${query}`,{
    headers: {
      ...headers,
    },
  });