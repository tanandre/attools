<template>
  <v-textarea @blur="onTextAreaBlur()" class="textarea" :class="{nowrap: !wordWrap}" full-width v-show="showTextarea" autofocus auto-grow></v-textarea>
</template>

<script>
  import {
    mapState
  } from 'vuex';

  export default {
    name: 'editor',
    data() {
      return {
        showTextarea: false,
        showCopy: false,
      }
    },
    computed: {
      ...mapState({
        wordWrap: state => state.settings.wordWrap
      }),
    },
    mounted() {
      this.resizeTextArea();
      setTimeout(() => {
        this.getTextArea().focus();
      }, 0);
    },
    methods: {
      getTextArea() {
        return this.$el;
      },

      resizeTextArea() {
        // let ta = this.getTextArea();
        // ta.setAttribute('style', 'height:' + ta.parentNode.clientHeight + 'px');
        this.showTextarea = true;
      },

      onTextAreaBlur() {
        const ta = this.getTextArea();
        setTimeout(() => {
          ta.focus();
        }, 100);
      },
    }
  }
</script>

<style scoped>
  textarea,
  pre {
    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;
  }

  /* turn off chrome textarea highlight */
  .textarea:focus {
    outline: none;
  }

  .textarea {
    width: 100%;
    height: 100%;
    font-family: Consolas, Lucida Console, Courier New, monospace;
font-size: 10pt;
  }

  textarea.nowrap {
    white-space: pre;
  }

  .edge textarea.nowrap {
    white-space: nowrap;
  }
</style>
