import { types, flow } from 'mobx-state-tree';
import axiosInstance from '../utils/axios';
import { logOut } from './helpers';

export const UserModel = types.model({
  username: types.identifier,
  firstName: types.string,
  lastName: types.string,
});

export const UserStore = types
  .model('UserStore', {
    users: types.array(UserModel),
    currentUser: types.maybeNull(types.reference(UserModel)),
  })
  .actions((store) => ({
    setUsers(newUsers) {
      store.users = newUsers;
    },
    setCurrentUser(user) {
      store.currentUser = user;
    },
    logoutUser() {
      store.setCurrentUser(null);
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    },
    loginUser: flow(function* (user) {
      try {
        const response = yield axiosInstance.post('users/token/', user);
        if (response.status === 200) {
          localStorage.setItem('access_token', response.data.access);
          localStorage.setItem('refresh_token', response.data.refresh);
          axiosInstance.defaults.headers['Authorization'] =
            'JWT ' + localStorage.getItem('access_token');
          const userInfo = yield axiosInstance.get('users/user-info/');
          const user = {
            username: userInfo.data.username,
            firstName: userInfo.data.first_name,
            lastName: userInfo.data.last_name,
          };
          store.addUser(user);
          store.setCurrentUser(store.getUserByUsername(user.username));
          window.location.replace(process.env.REACT_APP_WEB_URL);
        }
      } catch (e) {
        console.log('ERROR:', e);
        if (e.response.status === 401) logOut();
      }
    }),
    fetchUsers: flow(function* () {
      try {
        const response = yield axiosInstance.get('/users/users/');
        const newUsers = response.data.map((user) => ({
          username: user.username,
          firstName: user.first_name,
          lastName: user.last_name,
        }));
        store.setUsers(newUsers);
        const userInfo = yield axiosInstance.get('users/user-info/');
        store.setCurrentUser(store.getUserByUsername(userInfo.data.username));
      } catch (e) {
        console.log(e.message);
        if (e.response.status === 401) logOut();
      }
    }),
    addUser(user) {
      store.setUsers([...store.users, user]);
    },
  }))
  .views((store) => ({
    getUserByUsername(username) {
      return store.users.find((user) => user.username === username);
    },
  }));
