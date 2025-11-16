const STORAGE_KEY = 'tm_tasks'

export function loadTasks(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY)
    if(!raw) return []
    return JSON.parse(raw)
  }catch(e){
    console.error('loadTasks', e)
    return []
  }
}

export function saveTasks(tasks){
  try{
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }catch(e){
    console.error('saveTasks', e)
  }
}

