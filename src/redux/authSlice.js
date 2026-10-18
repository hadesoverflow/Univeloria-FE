// Redux slice pattern for UniVeloria State
export const initialAuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

export const authActions = {
  setUser: (user) => ({ type: 'auth/setUser', payload: user }),
  setToken: (token) => ({ type: 'auth/setToken', payload: token }),
  logout: () => ({ type: 'auth/logout' }),
};

export function authReducer(state = initialAuthState, action) {
  switch (action.type) {
    case 'auth/setUser':
      return { ...state, user: action.payload, isAuthenticated: Boolean(action.payload) };
    case 'auth/setToken':
      return { ...state, token: action.payload };
    case 'auth/logout':
      return { ...state, user: null, token: null, isAuthenticated: false };
    default:
      return state;
  }
}
