import {combineReducers} from 'redux';
import {dummyData} from 'UgandaTrees/src/assets/data/dummy-data';
import {ADD_FAVORITE, DELETE_FAVORITE, UPDATE_SEARCH} from '../actions'
import {SET_PIC_URI, GET_LOCATION, GEOLOCATION_DENIED, RESET_LOCATION, SET_SPECIES} from '../actions'
const initialSearchState = {
  searchTerm: '',
  searchResults: dummyData,
}

// Reducers
function search(state = initialSearchState, action) {
  switch (action.type) {
    case UPDATE_SEARCH:
      return {...state, searchTerm: action.payload.text, searchResults: action.payload.results};
    default:
      return state;
  }
}

var initFavStatus = [];
// initializes initialFavStatus by pushing each tree with isFavorited set to false
dummyData.forEach(tree => initFavStatus.push({name: tree.name, isFavorited: false, image_src: tree.image_src}))

const initialState = {
  favStatus: initFavStatus,
  numFavorites: 0,
};

function favorites(state = initialState, action) {
  var newFavStatus;
  switch(action.type) {
    case ADD_FAVORITE:
      newFavStatus = state.favStatus.map((tree) => {
        var returnVal = {...tree};
        if (tree.name === action.payload) {
          returnVal.isFavorited = true;
        }
        return returnVal
      });
      return {...state, numFavorites: state.numFavorites + 1, favStatus: newFavStatus};
    case DELETE_FAVORITE:
      newFavStatus = state.favStatus.map((tree) => {
        var returnVal = {...tree};
        if (tree.name === action.payload) {
          returnVal.isFavorited = false;
        }
        return returnVal
      });
      return {...state, numFavorites: state.numFavorites - 1, favStatus: newFavStatus};;
    default:
      return state;
  }
}

const initTagInfo = {
  coords: {
    latitude: 100.000000,
    longitude: 100.000000,
  },
  species: '',
  imageUri: ''
}

function tagInfo(state = initTagInfo, action) {
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
      return {...state, species: action.payload}
    default:
      return state;
  }
}

// combines the reducers
export default combineReducers({
  search,
  favorites,
  tagInfo,
});
