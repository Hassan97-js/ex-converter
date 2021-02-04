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
@import "../../scss/_mixins.scss";

nav {
  &#nav {
    background: $White;
    ul.links-wrapper {
      list-style-type: none;
      margin-bottom: 0;
      flex: 2;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      height: 100%;
      li.nav-item {
        display: inline-block;
        margin: 0 1.2rem;
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
    }
  }

  &.flex-nav {
    @include displayFlex;
    height: $nav-height;
    div.logo-wrapper {
      flex: 1;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      span.logo-text {
        padding: 0.5rem 1rem;
        border-radius: $border-radius;
        background: $Red;
        color: $White;
        font-weight: bold;
      }
    }
  }
}
</style>
