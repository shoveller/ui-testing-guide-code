import axios from 'axios'
import { useReducer } from 'react';

export async function authenticate(user) {
  try {
    const { data } = await axios.post('/authenticate', {
      data: user
    })

    return data;
  } catch (e) {
    throw e
  }
}

const reducer = (user, action) => {
  switch (action.type) {
    case 'LOG_IN':
      return action.user;
    case 'LOG_OUT':
      return null;
    default:
      return user;
  }
};

export function useAuth() {
  const [user, dispatch] = useReducer(reducer, null);

  const logIn = async ({ username, password }) => {
    try {
      const body = JSON.stringify({ username, password })
      const { user } = await authenticate(body)
      dispatch({ type: 'LOG_IN', user });
    } catch(error) {
      console.log(error);
    }
  };

  return [user, logIn];
}
