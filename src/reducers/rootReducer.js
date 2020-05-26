export default (state={ 
  username: '',
  token: ''
}, action) => {

  switch (action.type) {
    case 'STORE_USERNAME':
      return { 
        username: action.username, 
        token: state.token
      }

    case 'CLEAR_USERNAME':
      return { 
        username: '',
        token: state.token
      }

    case 'STORE_TOKEN':
      return { 
        username: state.username,
        token: action.token
      }

    case 'CLEAR_TOKEN':
      return { 
        username: state.username,
        token: '' 
      }

    default:
      return state;
  }

}