import {dummyData} from 'UgandaTrees/src/assets/data/dummy-data';

// Action Types
export const UPDATE_SEARCH = 'UPDATE_SEARCH';
export const ADD_FAVORITE = 'ADD_FAVORITE';
export const DELETE_FAVORITE = 'DELETE_FAVORITE';

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
  const treeInfo = dummyData.find((tree) => tree.name===treeName);
  return {
    type: ADD_FAVORITE,
    payload: {
      name: treeInfo.name,
      image_src: treeInfo.image_src,
    }
  }
}

export function deleteFavorite(treeName) {
  return {
    type: DELETE_FAVORITE,
    payload: treeName,
  }
}