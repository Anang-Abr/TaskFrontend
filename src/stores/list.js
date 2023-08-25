import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import s$list from '@/services/todo.js'

export const useListStore = defineStore('list', () => {
  const list = reactive([])
  const getList = computed(() => list)


  async function initList(){
    const {data, status} = await s$list.list()
    if(status){
      list.splice(0,list.length, ...data)
    }
  }

  async function updateList(id, body){
    const {data, status} = await s$list.edit(id, body)
    if(status){
      await initList()
    }
  }

  async function insertListData(data) {
    const result = await s$list.create(data)
    await initList()
    return result
  }

  async function removeListData(index) {
    const result = await s$list.remove(index)
    await initList()
    return result
  }

  return { list, getList, initList, insertListData, removeListData, updateList }
})
