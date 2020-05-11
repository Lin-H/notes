<template>
  <div :class="$style.notes">
    <div class="info">{{note.updateTime | formatTime}} | {{count}}字</div>
    <div class="editor-container">
      <div class="editor" ref="editor" contenteditable @click="checkbox" v-html="note.content" @input="input"></div>
    </div>
    <toolbar/>
  </div>
</template>
<script>
import Toolbar from '@/components/Toolbar'
import storage from '@/services/storage'

let timer = 0

export default {
  name: 'Notes',
  props: {
    id: [String, Number]
  },
  data () {
    return {
      count: 0,
      note: {
        content: '',
        id: '',
        updateTime: ''
      }
    }
  },
  created () {
    this.note = storage.get(this.id)
  },
  mounted () {
    this.$nextTick(() => {
      this.count = this.$refs.editor.textContent.length
    })
  },
  methods: {
    input () {
      clearTimeout(timer)
      timer = setTimeout(() => {
        storage.set(this.id, this.$refs.editor.innerHTML)
        this.count = this.$refs.editor.textContent.length
      }, 1000)
    },
    checkbox (e) {
      const target = e.target
      if (target.tagName.toUpperCase() !== 'LI') return // todo 后续有列表格式的话，判断class更好
      if (e.offsetX > 40) { // 判断是否点击的区域是checkbox
        return
      }
      if (target.classList.contains('checked')) {
        target.classList.remove('checked')
      } else {
        target.classList.add('checked')
      }
      storage.set(this.id, this.$refs.editor.innerHTML)
    }
  },
  filters: {
    formatTime (s) {
      return (new Date(s)).format('yyyy年MM月dd日 hh:mm')
    }
  },
  components: {
    Toolbar
  }
}
</script>
<style lang="scss" module>
.notes {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 40px - 8rem);
  padding: 16px;
  :global {
    .editor {
      display: inline-block;
      width: 100%;
      height: 100%;
      line-height: 1.4;
      &:focus {
        outline: 0;
      }
    }
    .editor-container {
      overflow: auto;
      margin-top: 16px;
      flex: 1;
    }
    .info {
      font-size: 2rem;
      color: #9E9E9E;
    }
    //#region 富文本内容样式
    ul {
      margin: .4rem 0;
      padding-left: 0;
    }
    .e-checkbox {
      &.checked {
        text-decoration: line-through;
        &::before {
          background-image: url(/img/c1.svg);
        }
      }
      &::before {
        content: '';
        margin-right: .4rem;
        background-image: url(/img/c0.svg);
        background-size: 100% 100%;
        display: inline-block;
        width: 2.6rem;
        height: 2.6rem;
      }
    }
    li {
      list-style-type: none;
    }
    //#endregion
  }
}
</style>
