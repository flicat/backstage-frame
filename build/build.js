'use strict'
require('./check-versions')()

// 从命令行获取打包配置信息
let platform = process.argv.splice(2, 1)[0]

if (platform === 'localhost') {
  // 打包本地/94环境
  process.env.NODE_ENV = 'localhost'

} else if (platform === 'testing') {
  // 打包测试环境
  process.env.NODE_ENV = 'testing'

} else {
  // 打包正式环境
  process.env.NODE_ENV = 'production'
}

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')

const spinner = ora(`building for ${process.env.NODE_ENV}...`)
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
