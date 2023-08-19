import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'

export const useListStore = defineStore('list', () => {
  const list = reactive([
    // {
    //   title: "test",
    //   description: "tesd"
    // }
])
  const getList = computed(() => list)


  function insertListData(data) {
    this.list.push(data)
  }

  function removeListData(index) {
    this.list.splice(index, 1)
  }

  return { list, getList, insertListData, removeListData }
})
