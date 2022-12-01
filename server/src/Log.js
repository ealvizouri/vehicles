import chalk from 'chalk';

class Log {
  static error(...args) {
    console.log(chalk.red(...args));
  }
  static success(...args) {
    console.log(chalk.green(...args));
  }
}

export default Log;