<template>
  <div :class="$style.list">
    <div class="note" v-for="n in notes" :key="n.id" @click="click(n.id)">
      {{slice(n.content)}}
    </div>
    <button class="add-note" @click="addNote">+</button>
  </div>
</template>

<script>
import storage from '@/services/storage'

const temp = document.createElement('div')

export default {
  name: 'Home',
  data () {
    return {
      notes: []
    }
  },
  created () {
    this.notes = storage.getAll()
  },
  methods: {
    addNote () {
      storage.add('').then(id => {
        this.$router.push({
          name: 'Note',
          params: {
            id
          }
        })
      })
    },
    slice (t) { // 解析html内容，返回纯文本
      temp.innerHTML = t
      return temp.textContent.slice(0, 20) + '...' // todo 可以使用shave库加个多行省略，目前只是粗略估计
    },
    click (id) {
      this.$router.push({
        name: 'Note',
        params: {
          id
        }
      })
    }
  },
  filters: {
    slice (v) {
      return v.slice(0, 20)
    }
  },
  components: {
  }
}
</script>
<style lang="scss" module>
.list {
  display: flex;
  flex-flow: wrap;
  :global {
    .add-note {
      font-size: 4rem;
      position: fixed;
      right: 5rem;
      color: #fff;
      background: #0088ff;
      bottom: 6rem;
      border: 0;
      border-radius: 50%;
      height: 6rem;
      width: 6rem;
    }
    .note {
      background: #fff;
      border: 1px solid #e0e0e0;
      border-radius: 12px;
      padding: 10px;
      display: inline-block;
      width: 27rem;
      max-height: 27rem;
      margin: 8px;
    }
  }
}
</style>
