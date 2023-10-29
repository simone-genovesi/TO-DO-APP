<template>
  <div class="home">

    <v-text-field
      v-model="newTaskTitle"
      @click:append="addTask"
      @keyup.enter="addTask"
      class="pa-3"
      outlined
      label="Inserisci qualcosa da fare"
      append-icon="mdi-plus"
      hide-details
      clearable
    ></v-text-field>

    <v-list
      class="pt-0"
      flat
    >
    <div 
      v-for="task in tasks"
      :key="task.id">
      <v-list-item
        @click="doneTask(task.id)"
        :class="{ 'teal lighten-5' : task.done }"  
      >
          <template v-slot:default>
            <v-list-item-action>
              <v-checkbox
                :input-value="task.done"
                color="teal"
              ></v-checkbox>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title
                :class="{ 'text-decoration-line-through' : task.done }"
              >
                {{ task.title }}
              </v-list-item-title>
            </v-list-item-content>
              <v-list-item-action>
              <v-btn
                @click.stop="deleteTask(task.id)"
                icon
              >
                <v-icon color="teal">mdi-delete</v-icon>
              </v-btn>
            </v-list-item-action>
          </template>
        </v-list-item>
        <v-divider></v-divider>
      </div>
    </v-list>
  </div>
</template>

<script>

  export default {
    name: 'HomeToDo',
    data() {
      return {
        newTaskTitle: '',
        tasks: [
          {
            id: 1,
            title: "Fare la spesa",
            done: false
          },
          {
            id: 2,
            title: "Andare in farmacia",
            done: false
          },
          {
            id: 3,
            title: "Ritirare il pacco alle poste",
            done: false
          },
        ]
      }
    },
    methods: {
      addTask() {

        

        let newTask = {
          id: Date.now(),
          title: this.newTaskTitle,
          done: false
        };
        this.tasks.push(newTask);
        this.newTaskTitle = '';
      },
      doneTask(id) {
        let task = this.tasks.find(task => task.id === id);
        task.done = !task.done;
      },
      deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id)
      }
    }
  }
</script>
