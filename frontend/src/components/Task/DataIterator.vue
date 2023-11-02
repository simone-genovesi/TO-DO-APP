<template>
      <v-data-iterator
        :items="filteredTasks"
        :search="search"
        :sort-by="sortBy.toLowerCase()"
        hide-default-footer
      >
        <template v-slot:header>
          <v-toolbar dark color="teal darken-3" class="mb-1">
            <v-text-field
              v-model="search"
              color="teal"
              clearable
              flat
              solo-inverted
              hide-details
              prepend-inner-icon="mdi-magnify"
              label="Cerca"
            ></v-text-field>
              <v-spacer></v-spacer>
              <v-select
                v-model="sortBy"
                color="teal"
                flat
                solo-inverted
                hide-details
                :items="nameUsers()"
                prepend-inner-icon="mdi-magnify"
                label="Filtrato per"
              ></v-select>
              <v-spacer></v-spacer>
          </v-toolbar>
        </template>
  
        <template v-slot:default="props">
            <tasks-list-done
                :tasks="props.items"
            />
        </template>
  
      </v-data-iterator>
  </template>
  
  <script>
  export default {
    name: 'DoneView',
    data () {
        return {
          search: '',
          sortBy: ''
        }
      },
      computed: {
        filteredTasks() {
          let tasks = this.$store.getters.completedTasks;
          if (this.sortBy) {
            return tasks.filter(task => task.author === this.sortBy);
          }
          return tasks;
        }
      },
      methods: {
        nameUsers () {
          let users = JSON.parse(localStorage.getItem('users')) || [];
          return users.map(user => user.name);
        }
      },
    components: {
        'tasks-list-done': require('@/components/Task/TasksListDone.vue').default
    }
  }
  </script>