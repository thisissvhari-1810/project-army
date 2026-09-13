type StorageLike = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>

function getWritableStorage(): StorageLike {
  try {
    const testKey = '__rhb_storage_test__'
    localStorage.setItem(testKey, '1')
    localStorage.removeItem(testKey)
    return localStorage
  } catch {
    try {
      const testKey = '__rhb_storage_test__'
      sessionStorage.setItem(testKey, '1')
      sessionStorage.removeItem(testKey)
      return sessionStorage
    } catch {
      const memory = new Map<string, string>()
      return {
        getItem: (key) => memory.get(key) ?? null,
        setItem: (key, value) => {
          memory.set(key, value)
        },
        removeItem: (key) => {
          memory.delete(key)
        },
      }
    }
  }
}

export const appStorage = getWritableStorage()
