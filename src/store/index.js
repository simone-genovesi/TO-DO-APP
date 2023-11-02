/* eslint-disable no-undef */
import Vue from 'vue'
import Vuex from 'vuex'
import Localbase from 'localbase'
import axios from 'axios'

let db = new Localbase('db')
db.config.debug = false

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appTitle: process.env.VUE_APP_TITLE,
    tasks: [],
    snackbar: {
      show: false,
      text: ''
    },
    comic: null
  },
  mutations: {
    setComic(state, comic) {
      state.comic = comic;
    },
    addTask(state, newTask) {
      state.tasks.push(newTask);
    },
    doneTask(state, id) {
      let task = state.tasks.filter(task => task.id === id)[0];
      task.done = !task.done;
    },
    deleteTask(state, id) {
      state.tasks = state.tasks.filter(task => task.id !== id);
    },
    updateTaskTitle(state, payload) {
      let task = state.tasks.filter(task => task.id === payload.id)[0];
      task.title = payload.title;
    },
    setTasks(state, tasks) {
      state.tasks = tasks;
    },
    showSnackbar(state, text) {
      let timeout = 0;
      if (state.snackbar.show) {
        state.snackbar.show = false;
        timeout = 300;
      }
      setTimeout(() => {
        state.snackbar.show = true;
        state.snackbar.text = text;
      }, timeout)
    },
    hideSnackbar(state) {
      state.snackbar.show = false;
    },
  },
  actions: {
    fetchComic({ commit }, num) {
      const comicURL = `https://cors-anywhere.herokuapp.com/https://xkcd.com/${num}/info.0.json`;
      axios.get(comicURL)
        .then((response) => {
          commit('setComic', response.data);
        })
        .catch((error) => {
          console.error('Errore nella richiesta XKCD:', error);
        });
    },
    login({ commit }, username) {
      let users = JSON.parse(localStorage.getItem('users')) || [];
      const existingUser = users.find(user => user.name === username);
    
      if (existingUser) {
        // Utente già esistente
        localStorage.removeItem('currentUser');
        commit('showSnackbar', 'Autenticato con un utente già esistente');
        localStorage.setItem('currentUser', JSON.stringify(existingUser));
        console.log(users);
      } else {
        // Nuovo utente
        localStorage.removeItem('currentUser');
        const newUser = {
          id: Date.now(),
          name: username,
        };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users)); // Salva l'array aggiornato nel localStorage
        console.log(users);
        commit('showSnackbar', 'Nuovo utente creato');
        localStorage.setItem('currentUser', JSON.stringify(newUser));
      }
    },

    addTask({ state, commit }, newTaskTitle) {
      const currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
      const author = currentUser.name;
      let newTask = {
        id: Date.now(),
        title: newTaskTitle,
        done: false,
        author: author,
      }
      db.collection('tasks').add(newTask).then(() => {
        commit('addTask', newTask);
        commit('showSnackbar', 'Task aggiunto!');
      });
      console.log(state.tasks)
    },
    doneTask({ state, commit }, id) {
      let task = state.tasks.filter(task => task.id === id)[0];
      db.collection('tasks').doc({ id: id }).update({
        done: !task.done
      }).then(() => {
        commit('doneTask', id);
      })
    },
    deleteTask({ commit }, id) {
      db.collection('tasks').doc({ id: id }).delete().then(() => {
        commit('deleteTask', id);
        commit('showSnackbar', 'Task cancellato!');
      })
    },
    updateTaskTitle({ commit }, payload) {
      db.collection('tasks').doc({ id: payload.id }).update({
        title: payload.title
      }).then(() => {
        commit('updateTaskTitle', payload);
        commit('showSnackbar', 'Task modificato!');
      })
    },
    setTasks({ commit }, tasks) {
      db.collection('tasks').set(tasks)
      commit('setTasks', tasks);
    },
    getTasks({ commit }) {
      db.collection('tasks').get().then(tasks => {
        commit('setTasks', tasks);
      })
    }
  },
  getters: {
    completedTasks: (state) => {
      return state.tasks.filter(task => task.done);
    },
    notCompletedTasks: (state) => {
      return state.tasks.filter(task => !task.done);
    }
  }
})
 