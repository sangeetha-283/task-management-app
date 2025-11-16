import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

// columns: title, priority, dueDate, completed, actions
export default function TaskTable({ tasks, onDelete, onToggleComplete }){
  const [sortBy, setSortBy] = useState({ key: 'dueDate', dir: 'asc' })
  const [query, setQuery] = useState('')
  const [filterPriority, setFilterPriority] = useState('all')
  const [page, setPage] = useState(1)
  const pageSize = 6

  const filtered = useMemo(()=>{
    let list = tasks.slice()
    if(query) {
      const q = query.toLowerCase()
      list = list.filter(t => t.title.toLowerCase().includes(q) || (t.description||'').toLowerCase().includes(q))
    }
    if(filterPriority !== 'all') list = list.filter(t => t.priority === filterPriority)
    // sort
    list.sort((a,b)=>{
      const A = a[sortBy.key] || ''
      const B = b[sortBy.key] || ''
      if(A < B) return sortBy.dir === 'asc' ? -1 : 1
      if(A > B) return sortBy.dir === 'asc' ? 1 : -1
      return 0
    })
    return list
  }, [tasks, query, filterPriority, sortBy])

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const pageData = filtered.slice((page-1)*pageSize, page*pageSize)

  function changeSort(key){
    setSortBy(prev => prev.key === key ? { key, dir: prev.dir === 'asc' ? 'desc' : 'asc' } : { key, dir:'asc' })
  }

  return (
    <div>
      <div style={{display:'flex', justifyContent:'space-between', marginBottom:10}}>
        <div className="controls">
          <input placeholder="Search..." value={query} onChange={e=>{ setQuery(e.target.value); setPage(1) }} />
          <select value={filterPriority} onChange={e=>{ setFilterPriority(e.target.value); setPage(1) }}>
            <option value="all">All priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="muted">Showing {filtered.length} results</div>
      </div>

      <table>
        <thead>
          <tr>
            <th onClick={()=>changeSort('title')}>Title</th>
            <th onClick={()=>changeSort('priority')}>Priority</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pageData.length === 0 && <tr><td colSpan={5} className="muted">No tasks</td></tr>}
          {pageData.map(t=> (
            <tr key={t.id}>
              <td>{t.title}</td>
              <td className="muted">{t.priority}</td>
              
              <td style={{display:'flex', gap:8}}>
                <Link to={`/edit/${t.id}`}>Edit</Link>
                <button className="btn-danger" onClick={()=>onDelete(t.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{display:'flex', justifyContent:'space-between', marginTop:12, alignItems:'center'}}>
        <div className="muted">Page {page} / {totalPages}</div>
        <div style={{display:'flex', gap:6}}>
          <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1}>Prev</button>
          <button onClick={()=>setPage(p=>Math.min(totalPages,p+1))} disabled={page===totalPages}>Next</button>
        </div>
      </div>
    </div>
  )
}

