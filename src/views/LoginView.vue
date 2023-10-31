<template>
    <div class="login pa-8">
      <form ref="form" @submit.prevent="login()">
        <v-text-field
          v-model="username"
          name="username"
          label="Username"
          type="text"
          placeholder="username"
          required
        ></v-text-field>
  
        <v-btn type="submit" class="mt-4" color="teal" value="log in"
          >Login</v-btn
        >
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LoginView',
    data() {
        return {
            username: ''
        };
    },
    methods: {
        login() {
            this.$store.dispatch('login', this.username)
              .then(() => {
                this.$router.push({ name: 'Home' });
              });
            this.username = '';
        }
    }
  }
  </script>