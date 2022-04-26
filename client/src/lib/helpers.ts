export function arrayEquality(a: any[], b: any[]) {
    if (a.length !== b.length) return false
  
    a.sort()
    b.sort()
  
    return a.every((element, index) => {
      return element === b[index]
    })
  }