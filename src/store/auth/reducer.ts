// import _ from "lodash";

import { Reducer } from "redux";

import Immutable, { ImmutableObjectMixin } from "seamless-immutable";

import { AuthState, AuthTypes } from "./actionTypes";

import { ApplicationStore } from "../index";

import { getToken, setToken, removeToken } from "../../services/auth";

console.log("getToken()getToken()getToken()", getToken());
const store = Immutable.from<AuthState>({
  auth: {},
  error: false,
  isAuth: getToken() !== null,
  loading: false,
});

const reducer: Reducer<ImmutableObjectMixin<AuthState> & AuthState> = (
  state = store,
  action
) => {
  switch (action.type) {
    case AuthTypes.AUTH_SIGN_IN:
      setToken(action.payload);
      return state.merge({
        auth: {},
        isAuth: true,
        loading: false,
      });

    case AuthTypes.AUTH_SIGN_OUT:
      removeToken();
      return state.merge({
        isAuth: false,
        loading: false,
        auth: {},
      });

    case AuthTypes.AUTH_LOADING:
      return state.merge({
        loading: action.payload,
      });

    default:
      return state;
  }
};

export default reducer;

export function getAuth(state: ApplicationStore) {
  return state.auth;
}

export function isAuth(state: ApplicationStore) {
  return state.auth.isAuth;
}
