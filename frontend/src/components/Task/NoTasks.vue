<template>
  <div
    class="no-tasks"
  >
    <v-icon
      size="100"
      color="teal"
    >
      mdi-check
    </v-icon>
    <div class="text-h5 teal--text">No tasks</div>
  </div>
</template>

<style>
  .no-tasks {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    opacity: 0.5;
  }
</style>