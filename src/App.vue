<template>
  <div id="app">
    <mt-header title="记事本" fixed>
      <router-link to="/" slot="left">
        <mt-button icon="back" @click="back" v-show="$route.name !== 'List'">返回</mt-button>
      </router-link>
      <mt-button icon="more" slot="right" v-show="$route.name !== 'List'"></mt-button>
    </mt-header>
    <router-view/>
  </div>
</template>
<script>
export default {
  name: 'App',
  created () {
    const width = document.documentElement.clientWidth
    const factor = width / 600 * 10
    document.querySelector('html').style.fontSize = factor + 'px'
  },
  methods: {
    back () {
      history.back()
    }
  }
}
</script>
<style lang="scss">
* {
  box-sizing: border-box;
}
#app {
  padding-top: 40px;
  font-size: 2.6rem;
  font-family: -apple-system, BlinkMacSystemFont, "PingFang SC","Helvetica Neue",STHeiti,"Microsoft Yahei",Tahoma,Simsun,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
html {
  background: #f7f7f7;
}
</style>
