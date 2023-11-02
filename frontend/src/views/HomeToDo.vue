<template>
  <div class="home">

    <field-add-task />

    <tasks-list-not-done
      v-if="$store.getters.notCompletedTasks.length"
    />

    <no-tasks
      v-else
    />
    
  </div>
</template>

<script>
export default {
  name: 'HomeToDo',
  components: {
    
    'field-add-task': require('@/components/Task/FieldAddTask.vue').default,
    'tasks-list-not-done': require('@/components/Task/TasksListNotDone.vue').default,
    'no-tasks': require('@/components/Task/NoTasks.vue').default,
  }
}
</script>