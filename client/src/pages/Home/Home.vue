<!-- Home首页 -->
<template>
  <!--首页外卖-->
  <div class="on">
    <section class="msite">
      <!--首页头部-->
      <HeaderTop :title="address.name">
        <router-link
          class="header_search"
          slot="left"
          to="/search"
        >
          <i
            class="iconfont icon-search"
            style="color:white;font-size:20px"
          ></i>

        </router-link>

        <router-link
          class="header_login"
          slot="right"
          to="/person"
        >
          <span>
            <span
              class="header_login_text"
              v-if="userInfo._id"
            >已登录,去个人中心</span>
            <span
              class="header_login_text"
              v-else
            >登录|注册</span>
          </span>
        </router-link>

      </HeaderTop>

      <!--首页导航-->
      <nav class="msite_nav">
        <div class="swiper">
          <div
            class="swiper-wrapper"
            v-if="categorysArr.length"
          >
            <div
              class="swiper-slide"
              v-for="(categorys,index) in categorysArr"
              :key="index"
            >
              <a
                href="javascript:"
                class="link_to_food"
                v-for="(category,index) in categorys"
                :key="index"
              >
                <div class="food_container">
                  <img :src="baseImageUrl+category.image_url">
                </div>
                <span>{{category.title}}</span>
              </a>
            </div>

          </div>
          <img
            src="./images/msite_back.svg"
            alt=""
            v-else
          >
          <!-- Add Pagination -->
          <div class="swiper-pagination"></div>
        </div>
      </nav>

      <ShopList></ShopList>

    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";
import HeaderTop from "../../components/HeaderTop/HeaderTop.vue";
import ShopList from "../../components/ShopList/ShopList.vue";
import Swiper from "swiper";
import "swiper/css/swiper.min.css";

export default {
  name: "Home",
  components: {
    HeaderTop,
    ShopList,
  },
  mounted() {},
  data() {
    return {
      baseImageUrl: "https://fuss10.elemecdn.com",
    };
  },
  watch: {
    categorys(value) {
      //有数据了再执行里面的代码
      this.$nextTick(function () {
        //页面完成更新后就执行里面的代码
        new Swiper(".swiper", {
          loop: true, // 循环模式选项
          // 如果需要分页器
          pagination: {
            el: ".swiper-pagination",
          },
        });
      });
    },
  },
  created() {},
  computed: {
    ...mapState(["address", "categorys", "userInfo"]),
    categorysArr() {
      const { categorys } = this;
      //要变成的二维数组
      const arr = [];
      //每个小的数组
      let minArr = [];
      categorys.forEach((item) => {
        if (minArr.length === 8) {
          minArr = [];
        }
        if (minArr.length === 0) {
          arr.push(minArr);
        }
        minArr.push(item);
      });

      return arr;
    },
  },

  methods: {},
};
</script>

<style lang='stylus' ref='stylesheet/stylus' scoped>
@import '../../assets/stylus/mixins.styl'
.msite // 首页
  width 100%
  .msite_nav
    bottom-border-1px(#e4e4e4)
    margin-top 45px
    height 200px
    background #fff
    .swiper
      width 100%
      height 100%
      .swiper-wrapper
        width 100%
        height 100%
        .swiper-slide
          display flex
          justify-content center
          align-items flex-start
          flex-wrap wrap
          .link_to_food
            width 25%
            .food_container
              display block
              width 100%
              text-align center
              padding-bottom 10px
              font-size 0
              img
                display inline-block
                width 50px
                height 50px
            span
              display block
              width 100%
              text-align center
              font-size 13px
              color #666
      .swiper-pagination
        >span.swiper-pagination-bullet-active
          background #02a774
</style>