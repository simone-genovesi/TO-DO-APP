<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      :mobile-breakpoint="768"
      app
    >
      <v-img
        class="pa-4 pt-7"
        src="beach.jpg"
        height="170"
        gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
      >
      <v-avatar
              color="brown"
              size="48"
            >
              <span class="white--text text-h5">{{ currentUser ? riduciAIniziali() : 'ND' }}</span>
            </v-avatar>
        <div class="white--text text-subtitle-1 font-weight-bold">
          {{ currentUser ? currentUser.name : 'Nessun utente corrente' }}
        </div>
      </v-img>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.to"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="teal"
      dark
      src="beach.jpg"
      prominent
      height="170"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
        ></v-img>
      </template>

      <v-container class="header-container pa-0">
        <v-row>
          <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
          <v-spacer></v-spacer>
        </v-row>
        <v-row>
          <v-toolbar-title class="text-h4 ml-4">
            {{ $store.state.appTitle }}
          </v-toolbar-title>
        </v-row>
        <v-row>
        </v-row>
      </v-container>

    </v-app-bar>

    <v-main>
      <router-view></router-view>
      <snackbar-component />
    </v-main>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      drawer: null,
      items: [
        { title: 'Login', icon: 'mdi-login', to: '/login'},
        { title: 'Task', icon: 'mdi-format-list-checks', to: '/' },
        { title: 'Completati', icon: 'mdi-check', to: '/done' },
      ],
      currentUser: JSON.parse(localStorage.getItem('currentUser')) || null,
    }),
    mounted() {
      this.$store.dispatch('getTasks')
    },
    methods: {
      trasformaInStringaConUnderscore() {
        const parole = this.currentUser.name.split(' '); // Dividi la stringa in parole usando lo spazio come separatore
        const stringaConUnderscore = parole.map(parola => parola.toLowerCase()).join('_');
        return stringaConUnderscore;
      },
      riduciAIniziali() {
        const parole = this.currentUser.name.split(' '); // Dividi la stringa in parole usando lo spazio come separatore
        const iniziali = parole.map(parola => parola[0].toUpperCase()); // Estrai le iniziali e convertile in maiuscolo
        return iniziali.join(''); // Unisci le iniziali in una nuova stringa
      }
    },
    components: {
      'snackbar-component': require('@/components/Shared/SnackbarComponent.vue').default
    }
  }
</script>

<style>
  .header-container {
    max-width: none;
  }
</style>