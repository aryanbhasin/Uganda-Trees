import {dummyData} from 'UgandaTrees/src/assets/data/dummy-data';

// Action Types
export const UPDATE_SEARCH = 'UPDATE_SEARCH';
export const ADD_FAVORITE = 'ADD_FAVORITE';
export const DELETE_FAVORITE = 'DELETE_FAVORITE';
export const GET_LOCATION = 'GET_LOCATION';
export const GEOLOCATION_DENIED = 'GEOLOCATION_DENIED';
export const SET_PIC_URI = 'SET_PIC_URI';
export const RESET_LOCATION = 'RESET_LOCATION';

// Action Creators
export function updateSearch(text) {
  let searchData;
  
  (text === '') 
    ? searchData = dummyData
    : searchData = dummyData.filter((card) => {
        const searchTerm = text.toUpperCase();
        return card.name.toUpperCase().indexOf(searchTerm) > -1;
      })
  
  return {
    type: UPDATE_SEARCH,
    payload: {
      text: text,
      results: searchData
    },
  }
}

export function addFavorite(treeName) {
  return {
    type: ADD_FAVORITE,
    payload: treeName,
  }
}

export function deleteFavorite(treeName) {
  return {
    type: DELETE_FAVORITE,
    payload: treeName,
  }
}

// uses thunk
export function getLocation() {
  return dispatch => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        dispatch({
          type: 'GET_LOCATION',
          payload: {
            latitude: position.coords.latitude.toFixed(6),
            longitude: position.coords.longitude.toFixed(6)
          }
        });
      },
      (error) => {
        if (error.code === 1) {
          dispatch({
            type: 'GEOLOCATION_DENIED',
          });
        }
      }
    );
  }
}

export function resetLocation() {
  return {
    type: RESET_LOCATION,
  }
}

export function setPicURI(image_uri) {
  return {
    type: SET_PIC_URI,
    payload: image_uri
  }
}

