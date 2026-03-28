import { useEffect, useRef, useState } from 'react'
import swal from 'sweetalert'

export function useEntityList<T>(fetchFn: () => Promise<T[]>) {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<T[]>([])
  // Stable ref so the empty dep array below is intentional and lint-safe
  const fetchRef = useRef(fetchFn)

  useEffect(() => {
    fetchRef
      .current()
      .then(setData)
      .catch((e: Error) => swal('', e.message, 'error'))
      .finally(() => setLoading(false))
  }, [])

  return { loading, data }
}
