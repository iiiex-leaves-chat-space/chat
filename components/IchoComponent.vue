<template>
  <div :class="{ 'is-select': isSelect }">
    <div
      class="icho"
      :style="{
        left: customStyle.left,
        top: customStyle.top,
        transform: customStyle.transform,
        width: customStyle.width,
      }"
      @click="clickIcho"
    >
      <img src="icho.png" alt="" srcset="" />
      <span class="text-area">{{ text }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'IchoComponent',
  props: {
    comment: {
      type: String,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  data: function () {
    return {
      isSelect: false,
      text:
        this.$props.comment.length > 5
          ? this.$props.comment.slice(0, 4) + '…'
          : this.$props.comment,
      customStyle: {
        top: Math.random() * 100 - 10 + 'vh',
        left: Math.random() * 100 - 10 + 'vw',
        transform: 'rotate(' + (Math.random() * 360 - 180) + 'deg)',
        width: 26 + Math.random() * 10 + 'vw',
      },
    }
  },
  methods: {
    clickIcho() {
      // alert(this.$props.comment)
      this.isSelect = !this.isSelect
      if (this.isSelect) {
        this.customStyle.top = 0
        this.customStyle.left = 0
        this.customStyle.width = '100vw'
        this.customStyle.transform = 'rotate(0deg)'
        this.text = this.$props.comment
        // console.log(this.$props.comment)
        this.$emit('leaf-select-event', true, this.$props.index)
      } else {
        this.closeIcho()
      }
    },
    closeIcho() {
      this.isSelect = false
      this.customStyle = {
        top: Math.random() * 100 - 10 + 'vh',
        left: Math.random() * 100 - 10 + 'vw',
        transform: 'rotate(' + Math.random() * 360 + 'deg)',
        width: 26 + Math.random() * 10 + 'vw',
      }
      this.text =
        this.$props.comment.length > 5
          ? this.$props.comment.slice(0, 4) + '…'
          : this.$props.comment
      this.$emit('leaf-select-event', false, this.$props.index)
    },
  },
}
</script>
<style lang="scss" scoped>
.is-select {
  position: absolute;
  z-index: 2;
  .icho .text-area {
    font-size: 1rem;
    color: gray;
  }
}

.icho {
  position: absolute;
  height: auto;
  transition: all 0.8s;

  .text-area {
    position: absolute;
    display: flex;
    top: 30%;
    left: 17%;
    width: 65%;
    height: 16%;
    text-align: center;
    align-items: center;
    justify-content: center;
    line-height: 100%;
    font-size: 0.8rem;
    color: gray;
  }
}

img {
  width: 100%;
}
</style>
