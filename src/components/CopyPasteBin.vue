<template>
  <div>
     <v-btn small fab @click="copyToClipboard"><v-icon>file_copy</v-icon></v-btn>
   <textarea v-show="false" ref="textareaContainer" :value="$store.state.text.calculatedValue"></textarea>
   <v-snackbar v-model="showCopy" top :timeout=1000>
   <span><v-icon class="snackbarIcon">content_copy</v-icon><small>Text copied...</small></span>
  </v-snackbar>
 </div>
</template>

<script>

export default {
  data() {
    return {
      showCopy: false,
    };
  },
  methods: {
    copyToClipboard() {
      const ta = this.$refs.textareaContainer;
      ta.blur();
      ta.focus();
      ta.select();
      const outcome = document.execCommand('copy');
      if (outcome) {
        this.showCopy = true;
      }
      // navigator.clipboard.writeText(value).then(() => {
      //   console.log('Async: Copying to clipboard was successful!');
      //   this.showCopy = true;
      // }, (err) => {
      //   console.error('Async: Could not copy text: ', err);
      // });
    },
  },
  watch: {
    '$store.state.text.calculatedValue': function (value) {
      this.copyToClipboard();
    },
  },
};
</script>

<style scoped>
</style>
