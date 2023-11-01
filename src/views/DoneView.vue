<template>
  <v-container fluid>
    <v-data-iterator
      :items="filteredTasks"
      :page.sync="page"
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
        <v-row>
          <v-col
            class="pt-5"
            v-for="item in props.items"
            :key="item.id"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >

            <v-card 
              class="mx-auto" 
              max-width="344" 
              outlined>
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="text-overline mb-4">
                    Completato
                  </div>
                  <v-list-item-title class="text-h5 mb-1">
                    {{ item.title }}
                  </v-list-item-title>
                  <v-list-item-subtitle
                    >Autore: {{ item.author }}</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>

              <v-card-actions>
                <v-btn outlined rounded text> Button </v-btn>
              </v-card-actions>
            </v-card>

          </v-col>
        </v-row>
      </template>

    </v-data-iterator>
  </v-container>
</template>

<script>
export default {
  name: 'DoneView',
  data () {
      return {
        search: '',
        filter: {},
        sortBy: ''
      }
    },
    computed: {
      filteredKeys () {
        return this.nameUsers();
      },
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
  }
}
</script>