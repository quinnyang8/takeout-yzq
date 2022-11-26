<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>

    <FooterGuide v-show="$route.meta.showFooter"></FooterGuide>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import FooterGuide from "./components/FooterGuide/FooterGuide.vue";

export default {
  name: "App",
  components: {
    FooterGuide,
  },
  created() {
    //异步获取address
    this.getAddress();
    this.getCategorys();
    this.getShops();
    this.gainUserInfo();
  },
  methods: {
    ...mapActions(["getAddress", "getCategorys", "getShops", "gainUserInfo"]),
  },
};
</script>

<style lang="stylus" ref="stylesheet/stylus">
#app
  width 100%
  height 100%
  background #f5f5f5
</style>
