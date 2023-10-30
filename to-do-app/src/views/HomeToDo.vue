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

    <v-list class="pt-0" flat>
      <div v-for="task in tasks" :key="task.id">
        <v-list-item
          @click="doneTask(task.id)"
          :class="{ 'teal lighten-5' : task.done }"
        >
          <template v-slot:default>
            <v-list-item-action>
              <v-checkbox :input-value="task.done" color="teal"></v-checkbox>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title
                :class="{ 'text-decoration-line-through' : task.done }"
              >
                {{ task.title }}
              </v-list-item-title>
            </v-list-item-content>

            <v-dialog v-model="task.dialogSave" persistent max-width="600px">
              <template v-slot:activator="{ on, attrs }">
                <v-list-item-action>
                  <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon color="teal">mdi-pencil</v-icon>
                  </v-btn>
                </v-list-item-action>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">Modifica il task</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          label="Nuovo task"
                          required
                          v-model="newTaskTitleEdit"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="teal" text @click="task.dialogSave = false">
                    Chiudi
                  </v-btn>
                  <v-btn
                    color="teal"
                    text
                    @click.stop="editTask(task.id)"
                    @click="task.dialogSave = false"
                  >
                    Salva
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-dialog v-model="task.dialogDelete" persistent max-width="450">
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon dark v-bind="attrs" v-on="on">
                  <v-icon color="teal">mdi-delete</v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-card-title class="text-h5">
                  Sei sicuro di voler cancellare il task?
                </v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="teal darken-1"
                    text
                    @click="task.dialogDelete = false"
                  >
                    Annulla
                  </v-btn>
                  <v-btn
                    color="teal darken-1"
                    text
                    @click.stop="deleteTask(task.id)"
                    @click="task.dialogDelete = false"
                  >
                    Cancella
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
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
      newTaskTitleEdit: '',
      tasks: [
        {
          id: 1,
          title: "Fare la spesa",
          done: false,
          dialogSave: false,
          dialogDelete: false,
        },
        {
          id: 2,
          title: "Andare in farmacia",
          done: false,
          dialogSave: false,
          dialogDelete: false,
        },
        {
          id: 3,
          title: "Ritirare il pacco alle poste",
          done: false,
          dialogSave: false,
          dialogDelete: false,
        },
      ]
    }
  },
  methods: {
    addTask() {
      if (this.newTaskTitle !== ''){
        let newTask = {
        id: Date.now(),
        title: this.newTaskTitle,
        done: false
      };
      this.tasks.push(newTask);
      this.newTaskTitle = '';
      }
    },
    doneTask(id) {
      let task = this.tasks.find(task => task.id === id);
      task.done = !task.done;
    },
    editTask(id) {
      let task = this.tasks.find(task => task.id === id);
      task.title = this.newTaskTitleEdit;
      this.newTaskTitleEdit = '';
    },
    deleteTask(id) {
      this.tasks = this.tasks.filter(task => task.id !== id)
    }
  }
}
</script>