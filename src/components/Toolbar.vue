<template>
  <div :class="$style.toolbar" @mousedown.stop.prevent :style="{bottom: isMi ? '80px' : ''}">
    <span class="button" @click="format('checkbox')"><i class="fa fa-check-square-o"></i></span>
    <span class="button" @click="format('bold')"><i class="fa fa-bold"></i></span>
    <span class="button" @click="format('underline')"><i class="fa fa-underline"></i></span>
  </div>
</template>

<script>
export default {
  name: 'Toolbar',
  data () {
    return {
      isMi: false // 小米手机会出现输入法挡住吸底元素
    }
  },
  created () {
    this.isMi = ~navigator.userAgent.search(/MiuiBrowser/)
  },
  methods: {
    format (type) {
      switch (type) {
        case 'checkbox': this.checkbox(); break
        case 'bold':
        case 'underline':
          execCommand(type)
      }
    },
    checkbox () {
      const selection = getSelection()
      if (!selection.rangeCount) return
      // const range = selection.getRangeAt(0)
      execCommand('insertUnorderedList')
      const parent = getParent(selection.anchorNode, 'li')
      if (!parent) return
      if (parent.tagName.toUpperCase() === 'LI') {
        parent.classList.add('e-checkbox')
      }
    }
  }
}

function execCommand () {
  document.execCommand(...arguments)
}
function getParent (element, selector) {
  let parent = element.parentElement
  while (parent !== document.body) {
    if (parent.matches(selector)) {
      return parent
    }
    parent = parent.parentElement
  }
  return null
}
</script>

<style lang="scss" module>
.toolbar {
  /*border: 1px solid red;*/
  height: 8rem;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  :global {
    .button {
      height: 100%;
      display: inline-block;
      padding: 0 2rem;
    }
    .fa {
      line-height: 8rem;
      font-size: 4rem;
    }
  }
}
</style>
