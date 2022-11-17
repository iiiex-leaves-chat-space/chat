<template>
  <div ref="float" class="write-component" :class="{ 'is-select': isSelect }">
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
      <!-- 他にいい方法があればそっちにしたい -->
      <div class="text-container">
        <span
          ref="edit"
          class="text-area"
          contenteditable="editable"
          @keypress="inputEvent"
          >{{ text }}
        </span>
        <v-icon class="pencil-icon" x-large color="brown darken-4">
          mdi-pencil
        </v-icon>
      </div>
    </div>
    <div v-show="isSelect">
      <v-btn
        fab
        class="close-button"
        color="white"
        elevation="2"
        @click="closeIcho"
        ><v-icon>mdi-close</v-icon></v-btn
      >
      <v-btn
        fab
        class="send-button"
        color="yellow darken-2"
        elevation="2"
        @click="sendMessage"
      >
        <v-icon>mdi-send</v-icon>
      </v-btn>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import { getDatabase, ref, set } from 'firebase/database'

const DefaultStyle = {
  top: '60vh',
  left: '30vw',
  transform: `rotate(10deg)`,
  width: '40vw',
}

const routingDict = {
  mgpqhc: 'thread_1',
  kegnvk: 'thread_2',
  xcgery: 'thread_3',
  czboum: 'thread_4',
  hansrn: 'thread_5',
}

export default {
  name: 'IchoWriteComponent',
  props: {
    commentNum: {
      type: Number,
      required: true,
    },
  },
  data: function () {
    return {
      isSelect: false,
      customStyle: { ...DefaultStyle }, // for deep copy
      text: '',
      inputText: '',
    }
  },
  mounted() {
    const userAgent = window.navigator.userAgent.toLowerCase()
    if (userAgent.includes('iphone') || userAgent.includes('ipad')) {
      const viewport = document.querySelector('meta[name="viewport"]')
      if (viewport) {
        const viewportContent = viewport.getAttribute('content')
        viewport.setAttribute('content', viewportContent + ', user-scalable=no')
      }
      const float = this.$refs.float
      const originalViewport = window.innerHeight

      function resizeHandler() {
        const keyboardHeight = originalViewport - window.innerHeight
        float.style.transform = 'translate(0px,' + keyboardHeight + 'px)'
      }

      window.visualViewport.addEventListener('resize', resizeHandler)
    }
  },
  methods: {
    clickIcho() {
      // alert(this.$props.comment)
      if (!this.isSelect) {
        this.isSelect = !this.isSelect
        this.customStyle.top = '10vh'
        this.customStyle.left = 0
        this.customStyle.width = '100vw'
        this.customStyle.transform = 'rotate(0deg)'
        this.$emit('leaf-select-event', true, -2)
        this.$refs.edit.focus()
        this.text = '' // 不要そう
        this.$refs.edit.innerText = this.inputText
      }
    },
    inputEvent() {
      this.inputText = this.$refs.edit.innerText
    },
    closeIcho() {
      this.isSelect = false
      this.customStyle = { ...DefaultStyle }
      this.$emit('leaf-select-event', false, -2)
      this.text = '' // 不要そう
      this.inputText = this.$refs.edit.innerText
      this.$refs.edit.innerText = ''
    },
    sendMessage() {
      this.inputText = this.$refs.edit.innerText
      // console.log(`send message -- ${this.inputText}`)
      if (this.inputText === '') {
        return
      }
      const db = getDatabase()
      const threadName = routingDict[this.$route.params.id]
      set(ref(db, threadName + '/' + this.$props.commentNum), {
        // スレッドの数が
        comment: this.inputText,
        timestamp: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      })
      this.$refs.edit.innerText = ''
      this.closeIcho()
    },
  },
}
</script>
<style lang="scss" scoped>
.write-component {
  transition: 0.5s;
}

.is-select {
  position: absolute;
  z-index: 2;
  .icho .text-container {
    .text-area {
      font-size: 0.8rem;
      overflow: visible;
    }
    .pencil-icon {
      display: none;
    }
  }
}

.icho {
  position: absolute;
  height: auto;
  transition: all 0.8s;
  .text-container {
    position: absolute;
    display: flex;
    top: 30%;
    left: 17%;
    width: 65%;
    height: 16%;
    justify-content: center; // 初期状態でpencil-iconを中央に配置するため
    .text-area {
      line-height: 100%;
      color: gray;
      margin: auto 0; // 上下中央揃え
      width: auto; // 初期状態では0になるようにする
      height: 0.8rem; // = font-size にすることで1行だけ表示
      font-size: 0.8rem;
      overflow: hidden; // 2行目以降は隠す
      &:focus {
        outline: none;
      }
    }
  }
}

img {
  width: 100%;
}

.pencil-icon {
  color: brown;
  font-size: 1.5rem;
}
.close-button {
  position: absolute;
  padding: 20px;
  top: 70vh;
  left: 30vw;
  z-index: 2;
  transform: translate(-50%, 0);
}

.send-button {
  position: absolute;
  padding: 20px;
  top: 70vh;
  left: 70vw;
  z-index: 2;
  color: rgb(232, 159, 33);
  transform: translate(-50%, 0);
}

// transition
.v-enter-active {
  transition: opacity 0.8s;
}
.v-leave-active {
  transition: opacity 0.5s;
}
.v-enter,
.v-leave-to {
  opacity: 0;
}
</style>
