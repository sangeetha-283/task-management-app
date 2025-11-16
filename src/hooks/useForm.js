import { useState } from 'react'

// Simple useForm hook
export default function useForm(initialValues, validate){
  const [values, setValues] = useState(initialValues || {})
  const [errors, setErrors] = useState({})

  function handleChange(e){
    const { name, value, type, checked } = e.target
    setValues(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  function handleSubmit(onValid){
    return (e) => {
      e.preventDefault()
      const validation = validate ? validate(values) : {}
      setErrors(validation || {})
      const isValid = Object.keys(validation || {}).length === 0
      if(isValid) onValid(values)
    }
  }

  function reset(newValues = initialValues){
    setValues(newValues || {})
    setErrors({})
  }

  return { values, setValues, errors, handleChange, handleSubmit, reset }
}
