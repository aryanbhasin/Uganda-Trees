import {combineReducers} from 'redux';
import {ADD_FAVORITE, DELETE_FAVORITE, UPDATE_SEARCH, GET_SEARCH_DATA} from '../actions'
import {SET_PIC_URI, GET_LOCATION, GEOLOCATION_DENIED, RESET_LOCATION, SET_SPECIES} from '../actions'
import {SET_REGION, LOCATION_DENIED, CHANGE_REGION} from '../actions'
import {SCREEN_WIDTH, SCREEN_HEIGHT} from 'UgandaTrees/src/styles/globalStyles'

// **************************************** REDUCER FOR SEARCH ****************************************
const initialSearchState = {
  searchTerm: '',
  searchResults: null,
  initTreeData: null,
  isLoading: true,
  initJsonData: null,
}

function search(state = initialSearchState, action) {
  switch (action.type) {
    case GET_SEARCH_DATA:
      const {data, isLoading, jsonData} = action.payload
      return {...state, initTreeData: data, initJsonData: jsonData, isLoading: isLoading, searchResults: data}
    case UPDATE_SEARCH:
      return {...state, searchTerm: action.payload.text, searchResults: action.payload.results};
    default:
      return state;
  }
}

// **************************************** REDUCER FOR FAVORITES ****************************************
const initialState = {
  favList: [],
  numFavorites: 0,
};

function favorites(state = initialState, action) {
  var newfavList;
  switch(action.type) {
    case ADD_FAVORITE:
      newfavList = [...state.favList, action.payload]
      return {...state, numFavorites: state.numFavorites + 1, favList: newfavList};
    case DELETE_FAVORITE:
      newfavList = state.favList.filter((tree) => {
        // payload for DELETE_FAVORITE is just the tree name
        return (tree.Names.Primary_Name !== action.payload)
      });
      return {...state, numFavorites: state.numFavorites - 1, favList: newfavList};;
    default:
      return state;
  }
}

// **************************************** REDUCER FOR NEW TAG INFO ****************************************

const initTagInfo = {
  coords: {
    latitude: 100.000000,
    longitude: 100.000000,
  },
  species: '',
  imageUri: '',
  curationRequired: false
}

function newTagInfo(state = initTagInfo, action) {
  switch(action.type) {
    case GET_LOCATION:
      const coords = {
        latitude: parseFloat(action.payload.latitude),
        longitude: parseFloat(action.payload.longitude),
      } 
      return {...state, coords: coords}
    case GEOLOCATION_DENIED:
      alert('This app needs to use your location to tag a tree')
      return state;
    case RESET_LOCATION: 
      return {...state, coords: {latitude: 100.000000, longitude: 100.000000}}
    case SET_PIC_URI:
      return {...state, imageUri: action.payload}
    case SET_SPECIES:
      return {...state, species: action.payload.species, curationRequired: action.payload.curationRequired}
    default:
      return state;
  }
}

// **************************************** REDUCER FOR MAP DISPLAY ****************************************
const ASPECT_RATIO = SCREEN_WIDTH / (SCREEN_HEIGHT * 0.9);
const LAT_DELTA = 0.0222;
const LON_DELTA = LAT_DELTA * ASPECT_RATIO;

initialRegion = {
  latitude: 0.046778,
  longitude: 32.463196,
  latitudeDelta: LAT_DELTA,
  longitudeDelta: LON_DELTA
}

function mapDisplay(state = initialRegion, action) {
  switch(action.type) {
    case SET_REGION:
      return {...state, latitude: action.payload.latitude, longitude: action.payload.longitude}
    case CHANGE_REGION:
      // action.payload has new region
      return action.payload
    case LOCATION_DENIED:
      alert('This app needs to use your location to tag a tree')
      return state;
    default:
      return state;
  }
}

// combines the reducers
export default combineReducers({
  search,
  favorites,
  newTagInfo,
  mapDisplay,
});
