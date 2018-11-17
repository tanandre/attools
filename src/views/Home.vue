<template>
     <v-app dark>
      <v-navigation-drawer clipped fixed v-model="drawer" app>
         <ActionList :actions="actions" v-on:action="safeExecute"></ActionList>
         <Settings></Settings>
      </v-navigation-drawer>
      <v-toolbar app fixed clipped-left dense class="toolbar">
         <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
         <v-toolbar-title>String Tools</v-toolbar-title>
         <v-spacer></v-spacer>
         <UserAuthPane></UserAuthPane>
         <v-toolbar-items>
           <CopyPasteBin></CopyPasteBin>
         </v-toolbar-items>

      </v-toolbar>
      <v-content>
         <Editor ref="textareaContainer"></Editor>
         <ErrorToaster></ErrorToaster>
         <v-snackbar v-model="showCopy" top>
            <span><v-icon class="snackbarIcon">content_copy</v-icon><small>Text copied...</small></span>
         </v-snackbar>
      </v-content>
   </v-app>
</template>

<script>
import { mapState } from 'vuex';
import ActionList from '@/components/ActionList.vue';
import ErrorToaster from '@/components/ErrorToaster.vue';
import Settings from '@/components/Settings.vue';
import Editor from '@/components/Editor.vue';
import CopyPasteBin from '@/components/CopyPasteBin.vue';
import UserAuthPane from '@/components/UserAuthPane.vue';
import actions from '@/js/actions';

function debounce(ms) {
  let timer = 0;
  return (callback) => {
    clearTimeout(timer);
    timer = setTimeout(callback, ms);
  };
}

function isEdge() {
  return /Edge\/\d./i.test(navigator.userAgent);
}

const copyDebouncer = debounce(400);

export default {
  components: {
    ErrorToaster,
    Settings,
    ActionList,
    UserAuthPane,
    Editor,
    CopyPasteBin,
  },
  data() {
    return {
      showCopy: false,
      drawer: true,
      showTextarea: true,
      isEdge: isEdge(),
      actions,
    };
  },
  computed: {
    ...mapState({
      user: state => state.session.user,
      autoCopy: state => state.settings.autoCopy,
    }),
  },
  mounted() {
    window.addEventListener('keydown', this.onKeyDown);
  },
  methods: {
    onKeyDown(key) {
      const txtValue = this.$store.state.textValue;
      if (!txtValue) {
        return;
      }

      actions.filter(a => a.isShortKey(key)).forEach((action) => {
        this.safeExecute(action);
      });
    },

    getTextArea() {
      return this.$refs.textareaContainer.$el ? this.$refs.textareaContainer.$el : this.$refs.textareaContainer;
    },

    copyToClipboard() {
      const ta = this.getTextArea();
      // attempt to add to undo buffer
      // ta.blur();
      // ta.focus();

      // ta.select();
      document.execCommand('copy');
      copyDebouncer(() => {
        // ta.blur();
        // ta.focus();
        this.showCopy = true;
      });
    },

    safeExecute(action) {
      this.$store.dispatch('execute', action);
    },
  },
};
</script>

<style scoped>
   .start .navigation-drawer {
      padding: 0;
   }
</style>
