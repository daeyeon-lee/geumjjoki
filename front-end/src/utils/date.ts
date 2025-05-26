export function toDateString(date: Date): string {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}

export function getCurrentDateInfo() {
    const now = new Date()
    const year = now.getFullYear()
    const thisMonth = now.getMonth()
    const lastMonth = thisMonth === 0 ? 11 : thisMonth - 1
    const start = new Date(year, thisMonth, 1)
    const end = new Date(year, thisMonth + 1, 0)

    return {
        now,
        year,
        thisMonth,
        lastMonth,
        start,
        end,
    }
}

export function getPastRange(days: number): { start: string; end: string } {
    const end = new Date()
    const start = new Date()
    start.setDate(end.getDate() - (days - 1))

    return {
        start: toDateString(start),
        end: toDateString(end),
    }
}

export function getThisMonthRange(): { start: string; end: string } {
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth()
    const start = new Date(year, month, 1)
    const end = new Date(year, month + 1, 0)

    return {
        start: toDateString(start),
        end: toDateString(end),
    }
}