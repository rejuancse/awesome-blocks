## ZepBlocks – Setup Guide

This guide explains how to install, run, and build the ZepBlocks plugin for WordPress.

### Installation
First, install all required dependencies:
`npm install`
This will download and set up all necessary packages for development and build tools.

### 👉 `npm start`

- Use to compile and run the block in development mode.
- Watches for any changes and reports back any errors in your code.

### 👉 `npm run build`

- Use to build production code for your block inside `dist` folder.
- Runs once and reports back the gzip file sizes of the produced code.

### 👉 `npm run eject`

- Use to eject your plugin out of `zepblocks`.
- Provides all the configurations so you can customize the project as you want.
- It's a one-way street, `eject` and you have to maintain everything yourself.
- You don't normally have to `eject` a project because by ejecting you lose the connection with `zepblocks` and from there onwards you have to update and maintain all the dependencies on your own.

---
> You can find the most recent version of this guide [here](https://github.com/rejuancse/zepblocks).
###### Feel free to Email and say 👋 at me [rejuan.17bd@gmail.com]
