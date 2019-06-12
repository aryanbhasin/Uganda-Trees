// Reducer
export default function reducer(state={searchTerm: ''}, action) {
  switch (action.type) {
    case 'UPDATE_SEARCHTERM':
      return {...state, searchTerm: action.payload};
    default:
      return state;
  }
}

// Action Creator
export function updateSearchTerm(text) {
  return {
    type: 'UPDATE_SEARCHTERM',
    payload: text,
  }
}