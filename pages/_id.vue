<template>
  <div>
    <div v-if="validFlag">
      <IntroComponent
        v-show="isInitialView"
        @close="isInitialView = false"
      ></IntroComponent>
      <icho-area :comment-data="storedData" />
      <footer>東京大学制作展2022 一葉</footer>
    </div>
    <div v-else class="loading">Loading……</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import moment from 'moment'
import { getDatabase, ref, onValue, set } from 'firebase/database'
import { CommentInterface } from '~/types/custom'

const routingDict: { [key: string]: string } = {
  mgpqhc: 'thread_1',
  kegnvk: 'thread_2',
  xcgery: 'thread_3',
  czboum: 'thread_4',
  hansrn: 'thread_5',
}

export default Vue.extend({
  name: 'IdPage',
  data(): {
    newComment: string
    storedData: CommentInterface[]
    commentNum: number
    threadName: string
    validFlag: boolean
    modalOpen: boolean
    isInitialView: boolean
  } {
    return {
      storedData: [],
      newComment: '',
      commentNum: 0,
      threadName: '',
      validFlag: false,
      modalOpen: true,
      isInitialView: true,
    }
  },
  mounted() {
    // 初期化処理
    if (this.$route.params.id in routingDict) {
      this.threadName = routingDict[this.$route.params.id]
      this.validFlag = true
      this.loadAllData()
    }
  },
  methods: {
    loadAllData() {
      const db = getDatabase()
      const starCountRef = ref(db, this.threadName)
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val()
        if (data != null) {
          this.storedData = data.filter((data: CommentInterface) => {
            return data
          })
          this.commentNum = data.length // コメント数が自動で更新されるっぽい？
        }
      })
    },

    clicks() {
      this.writeComment(this.newComment)
    },

    writeComment(newComment: any) {
      if (newComment === '') {
        return
      }
      const db = getDatabase()
      set(ref(db, this.threadName + '/' + this.commentNum), {
        // スレッドの数が
        comment: newComment,
        timestamp: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      })
    },
  },
})
</script>

<style lang="scss" scoped>
body {
  /* background-image: url('/background3.png'); */
  /* background-size: contain; */
  opacity: 1;
}
.loading {
  font-size: 30px;
  font-weight: 300;
  color: gray;
  text-align: center;
  margin-top: 45vh;
}
footer {
  position: fixed;
  right: 20px;
  bottom: 20px;
  text-align: right;
  font-size: 0.8rem;
  color: gray;
}
</style>
