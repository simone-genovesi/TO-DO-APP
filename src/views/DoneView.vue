<template>
  <v-container fluid>
    <v-data-iterator
      :items="filteredTasks"
      :items-per-page.sync="itemsPerPage"
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

      <template v-slot:footer>
        <v-row class="mt-2 pl-4 pr-4" align="center" justify="center">
          <span class="grey--text">Items per page</span>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                dark
                text
                color="teal"
                class="ml-2"
                v-bind="attrs"
                v-on="on"
              >
                {{ itemsPerPage }}
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(number, index) in itemsPerPageArray"
                :key="index"
                @click="updateItemsPerPage(number)"
              >
                <v-list-item-title>{{ number }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-spacer></v-spacer>

          <span class="mr-4 grey--text">
            Page {{ page }} of {{ numberOfPages }}
          </span>
          <v-btn
            fab
            dark
            color="teal darken-3"
            class="mr-1"
            @click="formerPage"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn fab dark color="teal darken-3" class="ml-1" @click="nextPage">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
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
        itemsPerPageArray: [3, 6, 9, 12, 15, 17, 20],
        search: '',
        filter: {},
        page: 1,
        itemsPerPage: 3,
        sortBy: ''
      }
    },
    computed: {
      numberOfPages () {
        return Math.ceil(this.$store.getters.completedTasks.length / this.itemsPerPage)
      },
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

      nextPage () {
        if (this.page + 1 <= this.numberOfPages) this.page += 1
      },
      formerPage () {
        if (this.page - 1 >= 1) this.page -= 1
      },
      updateItemsPerPage (number) {
        this.itemsPerPage = number
      },
      nameUsers () {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        return users.map(user => user.name);
      },

    },
  components: {
  }
}
</script>