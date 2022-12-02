import chalk from 'chalk';

class Log {
  static chalk(color, ...args) {
    console.log(chalk[color](...args));

  }
  static error(...args) {
    Log.chalk('red', ...args);
  }
  static success(...args) {
    Log.chalk('green', ...args);
  }
  static info(...args) {
    Log.chalk('blue', ...args);
  }
}

export default Log;