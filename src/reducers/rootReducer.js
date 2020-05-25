export default (state={ 
  username: '',
  token: ''
}, action) => {

  switch (action.type) {
    case 'STORE_USERNAME':
      return { username: action.username }

    case 'CLEAR_USERNAME':
      return { username: '' }

    case 'STORE_TOKEN':
      return { token: action.token }

    case 'CLEAR_TOKEN':
      return { token: '' }

    default:
      return state;
  }

}