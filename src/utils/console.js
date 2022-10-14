const colors = {
  GREEN: '\x1b[32m',
  YELLOW: '\x1b[33m',
  RED: '\x1b[31m',
  BLUE: '\x1b[34m',
  RESET: '\x1b[0m'
}

function info(title, msg) {
  printColored(title, msg, colors.BLUE)
}

function success(title, msg) {
  printColored(title, msg, colors.GREEN)
}

function warn(title, msg) {
  printColored(title, msg, colors.YELLOW)
}

function err(title, msg) {
  printColored(title, msg, colors.RED)
}

function printColored(text, msg, color) {
  if (process.env.NODE_ENV !== 'test') console.log(`${color}${text}${colors.RESET}: ${msg}`)
}

export { info, success, warn, err }
