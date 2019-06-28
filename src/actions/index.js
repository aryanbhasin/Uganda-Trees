import {firebaseApp} from 'UgandaTrees/App'

// Action Types
export const UPDATE_SEARCH = 'UPDATE_SEARCH';
export const GET_SEARCH_DATA = 'GET_SEARCH_DATA';
export const ADD_FAVORITE = 'ADD_FAVORITE';
export const DELETE_FAVORITE = 'DELETE_FAVORITE';
export const GET_LOCATION = 'GET_LOCATION';
export const GEOLOCATION_DENIED = 'GEOLOCATION_DENIED';
export const SET_PIC_URI = 'SET_PIC_URI';
export const RESET_LOCATION = 'RESET_LOCATION';
export const SET_SPECIES = 'SET_SPECIES';
export const SET_REGION = 'SET_REGION';
export const CHANGE_REGION = 'CHANGE_REGION';
export const LOCATION_DENIED = 'LOCATION_DENIED';

// **************************************** ACTION CREATORS FOR SEARCH ****************************************

// uses thunk
export function getSearchData() {
  return dispatch => {
    var dataRef = firebaseApp.database().ref('tree-data');
    dataRef.on('value', (snapshot) => {
      var initJsonData = {}
      var initTreeData = [];
      snapshot.forEach((child) => {
        let data = child.val()
        initJsonData[child.key] = data
        initTreeData.push(data)
      })
      dispatch ({
        type: GET_SEARCH_DATA,
        payload: {
          data: initTreeData,
          jsonData: initJsonData,
          isLoading: false
        }
      });
    })
  }
}

export function updateSearch(text, initTreeData) {
  let searchData;
  (text === '') 
    ? searchData = initTreeData
    : searchData = initTreeData.filter((card) => {
        const searchTerm = text.toUpperCase();
        const name = card.Names.Primary_Name
        const scientificName = card.Names.Scientific_Name
        return (name.toUpperCase().indexOf(searchTerm) > -1) || (scientificName.toUpperCase().indexOf(searchTerm) > -1) ;
      })
  
  return {
    type: UPDATE_SEARCH,
    payload: {
      text: text,
      results: searchData
    },
  }
}

// **************************************** ACTION CREATORS FOR FAVORITES ****************************************

export function addFavorite(treeData) {
  return {
    type: ADD_FAVORITE,
    payload: treeData,
  }
}

export function deleteFavorite(treeData) {
  return {
    type: DELETE_FAVORITE,
    payload: treeData.Names.Primary_Name,
  }
}

// **************************************** ACTION CREATORS FOR TAG INFO ****************************************

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
      },
      {enableHighAccuracy: true}
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

export function setSpecies(species, curationRequired) {
  return {
    type: SET_SPECIES,
    payload: {
      species,
      curationRequired
    }
  }
}

// **************************************** ACTION CREATORS FOR MAP VIEW ****************************************

// uses thunk
export function setMapRegion() {
  return dispatch => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        dispatch({
          type: SET_REGION,
          payload: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
        });
      },
      (error) => {
        if (error.code === 1) {
          dispatch({
            type: LOCATION_DENIED,
          });
        }
      },
      {enableHighAccuracy: true}
    );
  }
}

export function changeMapRegion(region) {
  return {
    type: CHANGE_REGION,
    payload: region
  }
}
