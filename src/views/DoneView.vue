<template>
  <v-container fluid>
    <data-iterator/>
  </v-container>
</template>

<script>
export default {
  components: {
    'data-iterator': require('@/components/Task/DataIterator.vue').default
  }
}
</script>