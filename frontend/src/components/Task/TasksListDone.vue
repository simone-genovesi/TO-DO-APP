<template>
    <v-list
      class="pt-0"
      flat
    >
      <task 
        v-for="task in tasks"
        :key="task.id"
        :task="task"
      />
    </v-list>
  </template>
  
  <script>
  export default {
    props: ['tasks'],
    components: {
      'task': require('@/components/Task/OneTask.vue').default
    }
  }
  </script>