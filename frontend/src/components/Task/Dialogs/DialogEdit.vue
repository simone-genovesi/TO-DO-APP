<template>
  <v-dialog
    :value="true"
    persistent
    max-width="290"
  >
    <v-card>
      <v-card-title class="headline">
        Modifica task
      </v-card-title>
      <v-card-text>
        Modifica il nome di task:
        <v-text-field
          v-model="taskTitle"
          @keyup.enter="saveTask"
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          @click="$emit('close')"
          text
        >
          Annulla
        </v-btn>
        <v-btn
          @click="saveTask"
          :disabled="taskTitleInvalid"
          color="teal darken-1"
          text
        >
          Salva
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['task'],
  data() {
    return {
      taskTitle: null
    }
  },
  computed: {
    taskTitleInvalid() {
      return !this.taskTitle || this.taskTitle === this.task.title
    }
  },
  methods: {
    saveTask() {
      if (!this.taskTitleInvalid) {
        let payload = {
          id: this.task.id,
          title: this.taskTitle
        }
        this.$store.dispatch('updateTaskTitle', payload)
        this.$emit('close')
      }
    }
  },
  mounted() {
    this.taskTitle = this.task.title
  }
}
</script>

<style>

</style>