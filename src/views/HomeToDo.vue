<template>
  <div class="home">

    <field-add-task />

    <tasks-list
      v-if="$store.state.tasks.length"
    />

    <no-tasks
      v-else
    />
    
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
  },
  components: {
    
    'field-add-task': require('@/components/Task/FieldAddTask.vue').default,
    'tasks-list': require('@/components/Task/TasksList.vue').default,
    'no-tasks': require('@/components/Task/NoTasks.vue').default,
  }
}
</script>