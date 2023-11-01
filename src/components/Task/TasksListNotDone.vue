<template>
    <v-list
      class="pt-0"
      flat
    >
      <task 
        v-for="task in $store.getters.notCompletedTasks"
        :key="task.id"
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