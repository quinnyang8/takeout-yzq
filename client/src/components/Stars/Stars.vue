<!-- 星星动态生成的组件 -->
<template>
  <div
    class="star"
    :class="'star-'+size"
  >
    <span
      class="star-item"
      v-for="(starClass,index) in starClasses"
      :key="index"
      :class="starClass"
    ></span>
  </div>
</template>

<script>
export default {
  name: "Stars",
  components: {},
  data() {
    return {};
  },
  props: {
    score: Number, //用户评分
    size: Number, //星星尺寸
  },
  computed: {
    starClasses() {
      const { score } = this;
      let scoreInt = Math.floor(score); //评分的整数部分
      let arr = []; //存储星星class的数组
      //添加全星
      for (let index = 0; index < scoreInt; index++) {
        arr.push("on");
      }
      //添加半星（如果需要）
      if (score * 10 - scoreInt * 10 >= 5) {
        arr.push("half");
      }
      //添加灰星（如果需要）
      while (arr.length < 5) {
        arr.push("off");
      }
      return arr;
    },
  },

  methods: {},
};
</script>
<style lang='stylus' ref='stylesheet/stylus' scoped>
@import '../../assets/stylus/mixins.styl'
.star // 2x图 3x图
  float left
  font-size 0
  .star-item
    display inline-block
    background-repeat no-repeat
  &.star-48
    .star-item
      width 20px
      height 20px
      margin-right 22px
      background-size 20px 20px
      &:last-child
        margin-right 0
      &.on
        bg-image('./images/stars/star48_on')
      &.half
        bg-image('./images/stars/star48_half')
      &.off
        bg-image('./images/stars/star48_off')
  &.star-36
    .star-item
      width 15px
      height 15px
      margin-right 6px
      background-size 15px 15px
      &:last-child
        margin-right 0
      &.on
        bg-image('./images/stars/star36_on')
      &.half
        bg-image('./images/stars/star36_half')
      &.off
        bg-image('./images/stars/star36_off')
  &.star-24
    .star-item
      width 10px
      height 10px
      margin-right 3px
      background-size 10px 10px
      &:last-child
        margin-right 0
      &.on
        bg-image('./images/stars/star24_on')
      &.half
        bg-image('./images/stars/star24_half')
      &.off
        bg-image('./images/stars/star24_off')</style>