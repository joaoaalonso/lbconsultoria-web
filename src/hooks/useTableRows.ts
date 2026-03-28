import { useState } from 'react'

export function useTableRows<T extends Record<string, string>>(initialRows: T[], emptyRow: T) {
  const [rows, setRows] = useState<T[]>(initialRows)

  const addRow = () => setRows((prev) => [...prev, { ...emptyRow }])

  const removeRow = (index: number) => {
    setRows((prev) => {
      const filtered = prev.filter((_, i) => i !== index)
      return filtered.length ? filtered : [{ ...emptyRow }]
    })
  }

  const updateRow = (index: number, field: keyof T, value: string) => {
    setRows((prev) => {
      const next = [...prev]
      next[index] = { ...next[index], [field]: value }
      return next
    })
  }

  return { rows, setRows, addRow, removeRow, updateRow }
}
