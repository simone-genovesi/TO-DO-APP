<template>
    <v-list
      class="pt-0"
      flat
    >
      <task 
        v-for="task in $store.getters.notCompletedTasks"
        :key="task.title"
        :task="task"
      />
    </v-list>
  </template>
  
  <script>
  export default {
    components: {
      'task': require('@/components/Task/OneTask.vue').default
    }
  }
  </script>