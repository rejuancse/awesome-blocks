# Testing - Quick Start

Awesome Blocks প্লাগইনের জন্য PHPUnit এবং Jest testing setup সম্পূর্ণ হয়েছে।

## 🚀 Quick Start

### 1. Initial Setup

```bash
# Run the setup script
./setup-tests.sh
```

অথবা ম্যানুয়ালি:

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

## 📁 Test Structure

```
tests/
├── php/                          # PHPUnit tests
│   ├── bootstrap.php             # Bootstrap file
│   ├── TestCase.php              # Base test class
│   ├── stubs/                    # WordPress stubs
│   ├── SampleTest.php            # Example test
│   └── FragmentCacheTest.php     # Feature test
│
├── js/                           # Jest tests
│   ├── setup-tests.js            # Jest setup
│   ├── __mocks__/                # Mocks
│   ├── SampleTest.test.js        # Example test
│   └── BlockExample.test.js      # Component test
│
└── README.md                     # This file
```

## 📝 Common Commands

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

## 📚 Full Documentation

সম্পূর্ণ নির্দেশিকার জন্য `TESTING.md` ফাইল দেখুন।

## ✅ Sample Tests Available

- **PHP**: `SampleTest.php`, `FragmentCacheTest.php`
- **JavaScript**: `SampleTest.test.js`, `BlockExample.test.js`

এই sample tests দেখে আপনি নিজের tests লিখতে পারবেন।
