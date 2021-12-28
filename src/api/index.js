import { responseHandler, errorHandler } from './helpers'

const HEADERS = {
  Authorization: `Basic YWRtaW5AeXVyYWx5c3lzaGFrOjU5MDhmNjFkZDE`
}

export const getProducts = () => {
  return fetch(`https://online.moysklad.ru/api/remap/1.2/entity/assortment`, {headers: HEADERS})
    .then(responseHandler)
    .catch(errorHandler)
}

export const getImages = (url) => {
  return fetch(url, {headers: HEADERS})
    .then(responseHandler)
    .catch(errorHandler)
}