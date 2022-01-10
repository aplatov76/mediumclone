import authApi from "@/api/auth";
import { setItem } from "@/helpers/persistanceStorage";

const state = {
  isSubmitting: false,
  isLoading: false,
  currentUser: null,
  validationErrors: null,
  isLoggedIn: null,
};

export const mutationTypes = {
  registerStart: "[Auth] registerStart",
  registerSuccess: "[Auth] registerSuccess",
  registerFailed: "[Auth] registerFailed",

  loginStart: "[Auth] loginStart",
  loginSuccess: "[Auth] loginSuccess",
  loginFailed: "[Auth] loginFailed",

  getCurrentUserStart: "[Auth] getCurrentUserStart",
  getCurrentUserSuccess: "[Auth] getCurrentUserSuccess",
  getCurrentUserFailed: "[Auth] getCurrentUserFailed",

  updateCurrentUserStart: "[Auth] updateCurrentUserStart",
  updateCurrentUserSuccess: "[Auth] updateCurrentUserSuccess",
  updateCurrentUserFailed: "[Auth] updateCurrentUserFailed",

  logout: "[Auth] logout",
};

export const actionTypes = {
  register: "[Auth] register",
  login: "[Auth] login",
  getCurrentUser: "[Auth] getCurrentUser",
  updateCurrentUser: "[Auth] updateCurrentUser",
  logout: "[Auth] logout",
};

export const getterTypes = {
  currentUser: "[auth] currentUser",
  isLoggedIn: "[auth] isLoggedIn",
  isAnonimus: "[auth] isAnonimus",
};

const mutations = {
  [mutationTypes.registerStart](state) {
    state.isSubmitting = true;
    state.validationErrors = null;
  },
  [mutationTypes.registerSuccess](state, payload) {
    state.isSubmitting = false;
    state.currentUser = payload;
    state.isLoggedIn = true;
  },
  [mutationTypes.registerFailed](state, payload) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  },
  [mutationTypes.loginStart](state) {
    state.isSubmitting = true;
    state.validationErrors = null;
  },
  [mutationTypes.loginSuccess](state, payload) {
    state.isSubmitting = false;
    state.currentUser = payload;
    state.isLoggedIn = true;
  },
  [mutationTypes.loginFailed](state, payload) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  },

  [mutationTypes.getCurrentUserStart](state) {
    state.isLoading = true;
  },
  [mutationTypes.getCurrentUserSuccess](state, payload) {
    state.isLoading = false;
    state.currentUser = payload;
    state.isLoggedIn = true;
  },
  [mutationTypes.getCurrentUserFailed](state) {
    state.isLoading = false;
    state.isLoggedIn = false;
    state.currentUser = null;
    //state.validationErrors = payload;
  },

  [mutationTypes.updateCurrentUserSuccess](state, payload) {
    state.currentUser = payload;
  },

  [mutationTypes.logout](state) {
    state.currentUser = null;
    state.isLoggedIn = false;
  },
};

const getters = {
  [getterTypes.currentUser]: (state) => {
    return state.currentUser;
  },
  [getterTypes.isLoggedIn]: (state) => {
    return Boolean(state.isLoggedIn);
  },
  [getterTypes.isAnonimus]: (state) => state.isLoggedIn === false,
};

const actions = {
  [actionTypes.register](context, credentials) {
    context.commit(mutationTypes.registerStart);
    return new Promise((resolve) => {
      authApi
        .register(credentials)
        .then((response) => {
          context.commit(mutationTypes.registerSuccess, response.data.user);
          setItem("accessToken", response.data.user.token);
          resolve(response.data.user);
        })
        .catch((err) => {
          context.commit(
            mutationTypes.registerFailed,
            err.response.data.errors
          );
          console.log(err);
        });
    });
  },
  [actionTypes.login](context, credentials) {
    context.commit(mutationTypes.loginStart);
    return new Promise((resolve) => {
      authApi
        .login(credentials)
        .then((response) => {
          context.commit(mutationTypes.loginSuccess, response.data.user);
          setItem("accessToken", response.data.user.token);
          resolve(response.data.user);
        })
        .catch((err) => {
          context.commit(mutationTypes.loginFailed, err.response.data.errors);
          console.log(err);
        });
    });
  },
  [actionTypes.getCurrentUser](context) {
    context.commit(mutationTypes.getCurrentUserStart);
    return new Promise((resolve) => {
      authApi
        .getCurrentUser()
        .then((response) => {
          context.commit(
            mutationTypes.getCurrentUserSuccess,
            response.data.user
          );
          setItem("accessToken", response.data.user.token);
          resolve(response.data.user);
        })
        .catch(() => {
          context.commit(mutationTypes.getCurrentUserFailed);
        });
    });
  },
  [actionTypes.updateCurrentUser](context, { currentUserInput }) {
    context.commit(mutationTypes.updateCurrentUserStart);
    return new Promise((resolve) => {
      authApi
        .updateCurrentUser(currentUserInput)
        .then((user) => {
          context.commit(mutationTypes.updateCurrentUserSuccess, user);
          //setItem("accessToken", response.data.user.token);
          resolve(user);
        })
        .catch((result) => {
          context.commit(
            mutationTypes.updateCurrentUserFailed,
            result.response.data.errors
          );
        });
    });
  },
  [actionTypes.logout](context) {
    return new Promise((resolve) => {
      setItem("accessToken", "");
      context.commit(mutationTypes.logout);
      resolve();
    });
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
