import { useEffect, useState } from 'react'

const PREFIX = 'chat-clone-'

export default function useLocalStorage<T>(key: string, initialValue?: any) {
  const prefixedKey = PREFIX + key
  const [value, setValue] = useState<T>(() => {
    const jsonValue = localStorage.getItem(prefixedKey)

    if (jsonValue != null) return JSON.parse(jsonValue)
    if (initialValue && typeof initialValue === 'function') {
      return initialValue()
    } else {
      return initialValue
    }
  })

  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value))
  }, [prefixedKey, value])

  return [value, setValue] as [T, React.Dispatch<React.SetStateAction<T>>]
}
