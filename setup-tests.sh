#!/bin/bash

# Test Setup Script for Awesome Blocks Plugin
# This script installs dependencies and sets up the testing environment

set -e

echo "=========================================="
echo "Awesome Blocks - Test Setup Script"
echo "=========================================="
echo ""

# Color codes for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if PHP is available
if ! command -v php &> /dev/null; then
    echo -e "${RED}Error: PHP is not installed${NC}"
    exit 1
fi

# Check if Node.js is available
if ! command -v node &> /dev/null; then
    echo -e "${RED}Error: Node.js is not installed${NC}"
    exit 1
fi

# Check if Composer is available
if ! command -v composer &> /dev/null; then
    echo -e "${RED}Error: Composer is not installed${NC}"
    exit 1
fi

# Check if npm is available
if ! command -v npm &> /dev/null; then
    echo -e "${RED}Error: npm is not installed${NC}"
    exit 1
fi

echo -e "${BLUE}Step 1: Installing PHP dependencies...${NC}"
composer install --dev
echo -e "${GREEN} PHP dependencies installed${NC}"
echo ""

echo -e "${BLUE}Step 2: Regenerating autoload files...${NC}"
composer dump-autoload
echo -e "${GREEN} Autoload files generated${NC}"
echo ""

echo -e "${BLUE}Step 3: Installing JavaScript dependencies...${NC}"
npm install
echo -e "${GREEN} JavaScript dependencies installed${NC}"
echo ""

echo -e "${BLUE}Step 4: Creating test directories...${NC}"
mkdir -p tests/php
mkdir -p tests/js
mkdir -p coverage
echo -e "${GREEN} Test directories created${NC}"
echo ""

echo -e "${BLUE}Step 5: Setting permissions...${NC}"
chmod +x vendor/bin/phpunit 2>/dev/null || true
echo -e "${GREEN} Permissions set${NC}"
echo ""

echo "=========================================="
echo -e "${GREEN} Setup completed successfully!${NC}"
echo "=========================================="
echo ""
echo "You can now run tests with:"
echo ""
echo -e "${BLUE}PHP Tests:${NC}"
echo "  ./vendor/bin/phpunit"
echo ""
echo -e "${BLUE}JavaScript Tests:${NC}"
echo "  npm test"
echo ""
echo -e "${BLUE}Run all tests:${NC}"
echo "  npm run test:all"
echo ""
echo "For more information, see TESTING.md"
echo ""
