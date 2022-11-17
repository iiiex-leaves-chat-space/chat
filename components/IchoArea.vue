<template>
  <div class="icho-area">
    <transition name="overlay">
      <div v-show="isActive" :class="{ 'background-overlay': isActive }">
        <!-- background overlay -->
        <!-- <div @click="closeEvent">x</div> -->
      </div>
    </transition>
    <!-- show the 50 most recent comments -->
    <IchoComponent
      v-for="(comment, index) in $props.commentData"
      v-show="index >= $props.commentData.length - 50"
      ref="child"
      :key="index"
      :comment="comment.comment"
      :index="index"
      @leaf-select-event="leafSelectEvent"
    />
    <IchoWriteComponent
      ref="write"
      :comment-num="$props.commentData.length"
      @leaf-select-event="leafSelectEvent"
    />
  </div>
</template>
<script>
import IchoComponent from './IchoComponent.vue'
import IchoWriteComponent from './IchoWriteComponent.vue'

export default {
  name: 'IchoArea',
  components: {
    IchoComponent,
    IchoWriteComponent,
  },
  props: {
    commentData: {
      type: Array,
      default: () => [],
      required: true,
    },
    customStyle: {
      type: String,
      default: '',
      required: false,
    },
  },
  data: () => {
    return {
      isActive: false,
      activeIndex: -1,
    }
  },
  methods: {
    leafSelectEvent: function (value, index) {
      this.isActive = value
      this.activeIndex = index
    },
    // closeEvent() {
    //   this.isActive = false
    //   if (this.activeIndex > -1) {
    //     this.$refs.child[this.activeIndex].closeIcho()
    //   } else if (this.activeIndex === -2) {
    //     this.$refs.write.closeIcho()
    //   }
    //   this.activeIndex = -1
    // },
  },
}
</script>
<style lang="scss" scoped>
.icho-area {
  position: relative;
  overflow: hidden;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  @supports (-webkit-touch-callout: none) {
    /* The hack for Safari */
    height: -webkit-fill-available;
  }
}

.background-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  @supports (-webkit-touch-callout: none) {
    /* The hack for Safari */
    height: -webkit-fill-available;
  }
  /* XDに合わせる */
  background-color: rgb(255, 255, 255);
  opacity: 0.5;
  /* 隙間が開くのを大きな影でごまかす*/
  box-shadow: 0 0 100px 100px rgb(255, 255, 255, 1);
  z-index: 1;
  transition: opacity 0.5s;
}

.introduction {
  position: relative;
  z-index: 10;
}

// transition

.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.5s;
}
.overlay-enter,
.overlay-leave-to {
  opacity: 0;
}
</style>
