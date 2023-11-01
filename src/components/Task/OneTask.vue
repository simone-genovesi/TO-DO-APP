<template>
    <div>
      <v-list-item
        @click="$store.dispatch('doneTask', task.id)"
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
          
          Autore: {{ task.author }}
          <v-list-item-action>
            <menu-task :task="task" />
          </v-list-item-action>
        </template>
  
      </v-list-item>
      <v-divider></v-divider>
  
    </div>
  </template>
  
  <script>  
  export default {
    props: ['task'],
    components: {
        'menu-task': require('@/components/Task/MenuTask.vue').default
    }
  }
  </script>