<template>
  <nav id="nav" class="flex-nav">
    <div class="logo-wrapper">
      <router-link to="/">
        <span class="logo-text">Converter</span>
      </router-link>
    </div>
    <ul class="links-wrapper">
      <li class="nav-item">
        <router-link to="/">Home</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/about/me">About Me</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/about/rates">About Rates</router-link>
      </li>
      <li class="nav-item">
        <router-link id="colored-link" to="/help">Help/Support</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Nav",
  props: {
    msg: String
  }
};
</script>

<style scoped lang="scss">
// Colors pallette
@import "../../scss/_variables.scss";

ul.links-wrapper {
  list-style-type: none;
}
li.nav-item {
  display: inline-block;
  margin: 0 1.2rem;
}
nav#nav {
  background: $White;
  a {
    font-weight: bold;
    color: $Blue;
  }
  a.router-link-exact-active {
    color: $Red;
  }
  a#colored-link {
    background: $LightBlue;
    padding: 0.5rem;
    color: $White;
    border-radius: $border-radius;
  }
}
</style>
