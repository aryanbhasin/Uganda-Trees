import {combineReducers} from 'redux';
import {dummyData} from 'UgandaTrees/src/assets/data/dummy-data';

const initialState = {
  searchTerm: '',
  searchResults: dummyData,
}

// Reducer
function search(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_SEARCH':
      return {...state, searchTerm: action.payload.text, searchResults: action.payload.results};
    default:
      return state;
  }
}

export default combineReducers({
  search
});

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
    type: 'UPDATE_SEARCH',
    payload: {
      text: text,
      results: searchData
    },
  }
}

// export function updateSearchResults(newResults) {
//   return {
//     type: 'UPDATE_SEARCH_RESULTS',
//     payload: newResults
//   }
// }