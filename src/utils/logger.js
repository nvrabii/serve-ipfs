function logError(err, label) {
  if (!fs.existsSync('logs')) fs.mkdirSync('logs')

  fs.writeFileSync(`logs/${new Date().getTime()}_${label}.log`, err.stack)
}

export default logError
