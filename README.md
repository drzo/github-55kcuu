# Logicmoo CogServer

A CogServer-compatible network interface implemented in Node.js.

## Quick Start

```bash
# Install dependencies
npm install

# Start the server
npm start
```

The server will be available at:
- CogServer interface: `localhost:17001`
- REST API: `localhost:3000`

## Usage

### Connecting

Connect using telnet:
```bash
telnet localhost 17001
```

Available shells:
- Enter `scm` for Scheme shell
- Enter `pl` for Prolog shell
- Enter `sexpr` for S-expression shell

To exit a shell:
- Scheme: `(exit)`
- Prolog: `halt.`
- S-expression: `.`

### API Endpoints

- `GET /status` - Check server status and ports

## Features

- Multiple shell support (Scheme, Prolog, S-expression)
- REST API for status monitoring
- Graceful error handling
- Colored console output
- Network-accessible interface

## Development

The server includes:
- Express.js for REST API
- TCP server for CogServer interface
- Shell management system
- Graceful shutdown handling