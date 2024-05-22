export function importJsonFile<T>(event: Event, callback: (val: T[]) => void) {
  const target = event.target as HTMLInputElement

  if (!target || !target.files?.length) return
  const file = target.files[0]

  const reader = new FileReader()
  reader.onload = (e: any) => {
    const text = e.target.result
    const lines = text.split('\n')
    console.log(lines)
    const validEntries: T[] = []

    lines.forEach((line: string) => {
      try {
        const parsedLine = JSON.parse(line)
        validEntries.push(parsedLine)
      } catch (error) {
        console.warn('Invalid JSON line:', line, error)
      }
    })

    if (callback) {
      callback(validEntries)
    }
  }
  reader.readAsText(file)
}
