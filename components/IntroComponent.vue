<template>
  <!-- transition for fading out -->
  <transition name="intro-component">
    <div class="intro-component" @click="$emit('close')">
      <!-- transition for gradually showing leaves -->
      <!-- we need 'appear' to gradually show the leaves when the page is loaded -->
      <transition name="intro-background" appear>
        <div class="intro-background"></div>
      </transition>

      <div class="intro-text">
        <div class="intro-text-ja">あなたの言葉を<br />残してみませんか？</div>
        <div class="intro-text-en">Would you like to "leaf" your message?</div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'IntroComponent',
}
</script>
<style lang="scss" scoped>
.intro {
  &-component {
    position: absolute;
    width: 100vw;
    height: 100vh;
    @supports (-webkit-touch-callout: none) {
      /* The hack for Safari */
      height: -webkit-fill-available;
    }
  }
  &-background {
    position: fixed;
    z-index: 10;
    height: 100%;
    width: 100%;
    background-color: white;
    opacity: 0;
  }
  &-text {
    position: relative;
    color: gray;
    text-align: center;
    z-index: 20;
    opacity: 1;
    &-ja {
      font-size: 2rem;
      font-weight: 400;
      line-height: 3;
      margin: 15vh 0 6vh 0;
    }
    &-en {
      font-size: 1rem;
      font-weight: 500;
    }
  }
}

// transition

// Loading...が完了するとenterが実行される
.intro-background-enter-active {
  transition: opacity 4s ease-in;
}
.intro-background-enter {
  opacity: 1;
}

.intro-component-leave-active {
  transition: opacity 1s;
  opacity: 1;

  z-index: 10; // これがないと、leave中にイチョウより下に表示される
}
.intro-component-leave-to {
  opacity: 0;
}
</style>
