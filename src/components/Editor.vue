<template>
<v-textarea @blur="onTextAreaBlur()" class="textarea" :class="{'nowrap':  !wordWrap}" full-width autofocus auto-grow v-model="textValue"></v-textarea>
</template>

<script>
import {
  mapState,
} from 'vuex';

export default {
  name: 'editor',
  data() {
    return {
      showCopy: false,
    };
  },
  computed: {
    ...mapState({
      wordWrap: state => state.settings.wordWrap,
    }),
    textValue: {
      get() {
        return this.$store.state.textValue;
      },
      set(value) {
        this.$store.commit('textValue', value);
      },
    },
  },
  mounted() {
    setTimeout(() => {
      this.getTextArea().focus();
    }, 0);
  },
  methods: {
    getTextArea() {
      return this.$el;
    },
    onTextAreaBlur() {
      const ta = this.getTextArea();
      setTimeout(() => {
        ta.focus();
      }, 100);
    },
  },
};
</script>

<style>
.textarea textarea,
.textarea pre {
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

.textarea.nowrap textarea {
  white-space: pre;
  overflow-x: auto;
}

.edge .textarea.nowrap textarea {
  white-space: nowrap;
}
</style>
