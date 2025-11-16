import React from 'react'

export default function TaskForm({ values, errors, onChange, onSubmit, submitting=false }){
  return (
    <form onSubmit={onSubmit}>
      <div style={{marginBottom:10}}>
        <label>Title</label>
        <input name="title" value={values.title||''} onChange={onChange} />
        {errors.title && <div className="muted">{errors.title}</div>}
      </div>

      <div style={{marginBottom:10}}>
        <label>Description</label>
        <textarea name="description" value={values.description||''} onChange={onChange} rows={3} />
      </div>

      <div style={{display:'flex', gap:10, marginBottom:10}}>
        <div style={{flex:1}}>
          <label>Priority</label>
          <select name="priority" value={values.priority||'medium'} onChange={onChange}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <div style={{display:'flex', gap:8, justifyContent:'flex-end'}}>
        <button type="submit" className="btn-primary" disabled={submitting}>{submitting ? 'Saving...' : 'Save'}</button>
      </div>
    </form>
  )
}

