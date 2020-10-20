export const wait = ms => new Promise((res, rej) => setTimeout(() => res('timed'), ms))
