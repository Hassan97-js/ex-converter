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
        window.addEventListener("online", () => {
            this.$swal("You're Online 🙂");
            console.log("Online Event");
        });
        window.addEventListener("offline", () => {
            this.$swal("You're Offline 😔");
        });
        this.getOnlineStatus().then(isOnline => {
            this.$swal(isOnline ? "You're Online 🙂" : "You're Offline 😔");
            console.log("Online Event-getOnlineStatus");
        });
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
