import {combineReducers} from 'redux';
import {ADD_FAVORITE, DELETE_FAVORITE, UPDATE_SEARCH, GET_SEARCH_DATA} from '../actions'
import {SET_PIC_URI, GET_LOCATION, GEOLOCATION_DENIED, RESET_LOCATION, SET_SPECIES} from '../actions'


// **************************************** REDUCER FOR SEARCH ****************************************
const initialSearchState = {
  searchTerm: '',
  searchResults: null,
  dummyData: null,
  isLoading: true,
}

function search(state = initialSearchState, action) {
  switch (action.type) {
    case GET_SEARCH_DATA:
      const {data, isLoading} = action.payload
      return {...state, dummyData: data, isLoading: isLoading, searchResults: data}
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
  imageUri: ''
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
      return {...state, species: action.payload}
    default:
      return state;
  }
}

// combines the reducers
export default combineReducers({
  search,
  favorites,
  newTagInfo,
});
