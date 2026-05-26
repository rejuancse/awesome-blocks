# Testing - Quick Start

PHPUnit and Jest testing setup for the ZepBlocks plugin is complete.

## 🚀 Quick Start

### 1. Initial Setup

```bash
# Run the setup script
./setup-tests.sh
```

Or Manual:

```bash
# Install PHP dependencies
composer install --dev

# Install JavaScript dependencies
npm install
```

### 2. Run Tests

```bash
# Run PHP tests
./vendor/bin/phpunit

# Run JavaScript tests
npm test

# Run both
./vendor/bin/phpunit && npm test
```

## Test Structure

## Common Commands

### PHPUnit

```bash
# Run all tests
./vendor/bin/phpunit

# Run specific test
./vendor/bin/phpunit tests/php/SampleTest.php

# With coverage
./vendor/bin/phpunit --coverage-html coverage/php
```

### Jest

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# With coverage
npm run test:coverage
```
