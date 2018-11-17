<template>
  <div v-show="false">
   <textarea :value="calculatedValue"></textarea>
 </div>
</template>

<script>
import { mapState } from 'vuex';


export default {
  computed: {
    ...mapState({
      calculatedValue: state => state.text.calculatedValue,
    }),
  },
  mounted() {

  },
  destroyed() {

  },
};
</script>

<style scoped>
</style>
