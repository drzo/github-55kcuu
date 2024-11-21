const net = require('net');
const express = require('express');
const chalk = require('chalk');

// Configuration
const COGSERVER_PORT = 17001;
const API_PORT = 3000;

// Create Express app
const app = express();

// Create TCP server for CogServer interface
const server = net.createServer((socket) => {
  console.log(chalk.blue('Client connected'));

  socket.write('Welcome to LogicMOO CogServer\n');
  socket.write('Enter "scm" for Scheme shell\n');
  socket.write('Enter "pl" for Prolog shell\n');
  socket.write('Enter "sexpr" for S-expression shell\n');
  socket.write('\nopencog> ');

  let currentShell = 'opencog';
  
  socket.on('data', (data) => {
    const input = data.toString().trim();
    
    // Handle shell switching
    if (input === 'scm') {
      currentShell = 'scheme';
      socket.write('Entering Scheme shell\nguile> ');
      return;
    }
    if (input === 'pl') {
      currentShell = 'prolog';
      socket.write('Entering Prolog shell\n?- ');
      return;
    }
    if (input === 'sexpr') {
      currentShell = 'sexpr';
      socket.write('Entering S-expression shell\n');
      return;
    }
    
    // Handle shell-specific commands
    handleCommand(currentShell, input, socket);
  });

  socket.on('end', () => {
    console.log(chalk.yellow('Client disconnected'));
  });

  socket.on('error', (err) => {
    console.error(chalk.red('Socket error:', err));
  });
});

function handleCommand(shell, input, socket) {
  switch (shell) {
    case 'opencog':
      socket.write(`opencog> `);
      break;
    case 'scheme':
      if (input === '(exit)') {
        socket.write('Leaving Scheme shell\nopencog> ');
        return;
      }
      socket.write('guile> ');
      break;
    case 'prolog':
      if (input === 'halt.') {
        socket.write('Leaving Prolog shell\nopencog> ');
        return;
      }
      socket.write('?- ');
      break;
    case 'sexpr':
      if (input === '.') {
        socket.write('Leaving S-expression shell\nopencog> ');
        return;
      }
      break;
  }
}

// Express routes
app.get('/status', (req, res) => {
  res.json({
    status: 'running',
    cogserver_port: COGSERVER_PORT,
    api_port: API_PORT,
    version: process.env.npm_package_version
  });
});

// Start servers
server.listen(COGSERVER_PORT, '0.0.0.0', () => {
  console.log(chalk.green(`CogServer listening on port ${COGSERVER_PORT}`));
});

app.listen(API_PORT, '0.0.0.0', () => {
  console.log(chalk.green(`API server listening on port ${API_PORT}`));
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log(chalk.yellow('\nShutting down servers...'));
  server.close();
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log(chalk.yellow('\nShutting down servers...'));
  server.close();
  process.exit(0);
});