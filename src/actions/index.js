import {dummyData} from 'UgandaTrees/src/assets/data/dummy-data';

// Action Types
export const UPDATE_SEARCH = 'UPDATE_SEARCH';
export const ADD_FAVORITE = 'ADD_FAVORITE';
export const DELETE_FAVORITE = 'DELETE_FAVORITE';
export const GET_LOCATION = 'GET_LOCATION';
export const GET_LOCATION_ERROR = 'GET_LOCATION_ERROR';
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


export function getLocation() {
  var coords, error = null;
  
  // do the location authorization request beforehand to prevent both camera and location requesting simultaneously
  // navigator.geolocation.requestAuthorization();
  
  navigator.geolocation.getCurrentPosition (
    (currPosition) => {coords = currPosition.coords},
    (err) => {error = err},
    {enableHighAccuracy: true}
  );
  
                // dummy coordinates just for testing
  var coordsDummy = {
    latitude: 40.350043,
    longitude: -74.659131
  }
  
  console.log(coords);
  
  // if (error !== null) {
  //   alert('Error: ' + error);
  //   return {
  //     type: GET_LOCATION_ERROR,
  //     payload: {
  //       latitude: coordsDummy.latitude,
  //       longitude: coordsDummy.longitude
  //     }
  //   }
  // }
                // change coordsDummy to coords while testing on actual device
  return {
    type: GET_LOCATION,
    payload: {
      latitude: coordsDummy.latitude,
      longitude: coordsDummy.longitude
    }
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

