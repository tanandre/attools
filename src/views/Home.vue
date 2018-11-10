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
         </v-toolbar-items>
      </v-toolbar>
      <v-content>
         <Editor ref="textareaContainer"></Editor>
         <!-- <Output></Output> -->
         <ErrorToaster></ErrorToaster>
         <v-snackbar v-model="showCopy" top>
            <span><v-icon class="snackbarIcon">content_copy</v-icon><small>Text copied...</small></span>
         </v-snackbar>
      </v-content>
   </v-app>
</template>

<script>
	import { mapState } from 'vuex';
	import store from '../store';
  import formatUtil from '@/js/FormatUtil'
	import ActionList from '@/components/ActionList.vue'
	import ErrorToaster from '@/components/ErrorToaster.vue'
	import Settings from '@/components/Settings.vue'
	import Editor from '@/components/Editor.vue'
	import UserAuthPane from '@/components/UserAuthPane.vue'
  import Output from '@/components/Output.vue'


	function debounce(ms) {
		let timer = 0;
		return (callback) => {
			clearTimeout(timer);
			timer = setTimeout(callback, ms);
		}
	}

	function isEdge() {
		return /Edge\/\d./i.test(navigator.userAgent);
	}

	let copyDebouncer = debounce(400);

	export default {
		components: {
			ErrorToaster,
			Settings,
			ActionList,
			UserAuthPane,
			Editor,
Output,
		},
		data() {
			return {
				showCopy: false,
				drawer: true,
				showTextarea: true,
				isEdge: isEdge(),
				actions: [
					{ label: 'encode URL', icon: 'cloud', shortKey: 'ctrl-[', action: encodeURIComponent },
					{ label: 'decode URL', icon: 'cloud_queue', shortKey: 'ctrl-shift-[', action: decodeURIComponent },
					{ label: 'encode Base64', icon: 'hdr_strong', shortKey: 'ctrl-]', action: btoa },
					{ label: 'decode Base64', icon: 'hdr_weak', shortKey: 'ctrl-shift-]', action: atob },
					{
						label: 'format JSON',
						icon: 'format_line_spacing',
						shortKey: 'ctrl-shift-f',
						action: formatUtil.formatJson
					},
					{ label: 'format XML', icon: 'code', shortKey: 'ctrl-shift-f', action: formatUtil.formatXml }
				]
			}
		},
		computed: {
			...mapState({
				user: state => state.session.user,
				autoCopy: state => state.settings.autoCopy
			}),
		},
		mounted() {
			window.addEventListener('keydown', this.onKeyDown)
		},
		methods: {
			onKeyDown(key) {
				// const ta = this.getTextArea();
        const txtValue = this.$store.state.textValue;
        console.log('txt', txtValue);
				if (!txtValue) {
					return;
				}

				// console.log(key, key.keyCode);
				if (key.ctrlKey && key.shiftKey && key.keyCode === 70) {
					let errors = [];
					try {
						this.$store.commit('textValue', formatUtil.formatJson(txtValue));
					} catch (e) {
						errors.push(e);
					}
					try {
            this.$store.commit('textValue', formatUtil.formatXml(txtValue));
					} catch (e) {
						errors.push(e);
					}

					if (errors.length === 2) {
						this.handleError(new Error('text not formatted: could not parse as JSON or XML'));
					}
					this.copyToClipboard();
					return;
				}

				if (key.ctrlKey && !key.shiftKey && key.keyCode === 219) {
					return this.safeExecute(encodeURIComponent);
				} else if (key.ctrlKey && key.shiftKey && key.keyCode === 219) {
					return this.safeExecute(decodeURIComponent);
				} else if (key.ctrlKey && !key.shiftKey && key.keyCode === 221) {
					return this.safeExecute(btoa);
				} else if (key.ctrlKey && key.shiftKey && key.keyCode === 221) {
					return this.safeExecute(atob);
				}
			},

			getTextArea() {
				return this.$refs['textareaContainer'].$el ? this.$refs['textareaContainer'].$el : this.$refs['textareaContainer'];
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

			handleError(e) {
				console.error(e);
				this.$store.commit('error', e);
			},

			safeExecute(fnc) {
				this.error = null;
				try {
          const txtValue = this.$store.state.textValue;
					// const ta = this.getTextArea();
					if (!txtValue) {
						return;
					}
					let value = fnc(txtValue);
          this.$store.commit('textValue', value);
					if (this.autoCopy) {
						this.copyToClipboard();
					}
				} catch (e) {
					this.handleError(e);
				}
			}
		}
	}
</script>

<style scoped>
   .start .navigation-drawer {
      padding: 0;
   }
</style>
