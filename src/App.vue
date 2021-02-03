<template>
  <div id="app">
    <Nav />
    <router-view />
  </div>
</template>

<script>
import Nav from "@/components/Global/Nav.vue";
export default {
  name: "App",
  created() {
    this.getOnlineStatus().then(isOnline => {
      this.$swal(isOnline ? "You're Online 🙂" : "You're Offline 😔");
    });
  },
  data() {
    return {
      confirmInstall: {
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: `Install`,
        denyButtonText: `No`,
        customClass: {
          cancelButton: "order-1 right-gap",
          confirmButton: "order-2",
          denyButton: "order-3"
        }
      }
      // isVisible: false
    };
  },
  components: {
    Nav
  },
  methods: {
    async getOnlineStatus() {
      if (navigator.onLine) {
        try {
          await fetch(location.origin, { method: "HEAD" });
          return true;
        } catch (e) {
          return false;
        }
      }
      return new Promise(resolve => resolve(false));
    }
  }
};
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
