<template>
  <v-text-field
    v-model="newUserName"
    @keyup.enter="addUser"
    class="pa-3"
    outlined
    color="teal"
    label="Username"
    hide-details
    clearable
  >
    <template v-slot:append-outer>
      <v-icon
        @click="addUser"
        color="teal"
        :disabled="newUserNameInvalid"
      >
        mdi-login
      </v-icon>
    </template>
  </v-text-field>
</template>

<script>
export default {
  data() {
    return {
      newUserName: ''
    }
  },
  computed: {
    newUserNameInvalid() {
      return !this.newUserName;
    }
  },
  methods: {
    addUser() {
      if (!this.newUserNameInvalid) {
        this.$store.dispatch('login', this.newUserName);
        this.newUserName = '';
        this.$router.push('/');
      }
    }
  }
}
</script>