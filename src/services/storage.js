import localforage from 'localforage'

let max = 0
let notes = []
localforage.getItem('max').then(value => {
  max = value || 0
})

export default {
  init () { // 保证刷新页面后，内容获取好
    return localforage.getItem('notes').then(value => {
      notes = value || []
    })
  },
  add (content) { // 新增
    const newNote = {
      id: max++,
      updateTime: Date.now(),
      content
    }
    notes.push(newNote)
    return save().then(() => {
      localforage.setItem('max', max)
    }).then(() => newNote.id)
  },
  set (id, content) {
    const index = notes.findIndex(n => +id === n.id)
    if (index === -1) return alert('找不到该报告') // todo 替换为vue提示组件
    notes[index].updateTime = Date.now()
    notes[index].content = content // 此处已修改对应数组中的元素
    save()
  },
  get (id) {
    const index = notes.findIndex(n => +id === n.id)
    return Object.assign({}, notes[index]) // 避免污染，如有问题可以用深拷贝
  },
  deleteNote (id) {
    const index = notes.findIndex(n => id === n.id)
    notes.splice(index, 1)
    save()
  },
  getAll () {
    return notes
  }
}

function save () {
  return localforage.setItem('notes', notes)
}
