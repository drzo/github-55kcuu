const commandExists = require('command-exists');
const chalk = require('chalk');

async function checkDependencies() {
  try {
    await commandExists('swipl');
    console.log(chalk.green('✓ SWI-Prolog is installed'));
  } catch (error) {
    console.error(chalk.red('✗ SWI-Prolog is not installed'));
    console.log(chalk.yellow('\nPlease install SWI-Prolog:'));
    console.log(chalk.cyan('\nOn Ubuntu/Debian:'));
    console.log('  sudo apt-get install swi-prolog');
    console.log(chalk.cyan('\nOn macOS:'));
    console.log('  brew install swi-prolog');
    console.log(chalk.cyan('\nOn Windows:'));
    console.log('  Download from https://www.swi-prolog.org/download/stable\n');
    process.exit(1);
  }
}

checkDependencies();