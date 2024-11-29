/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // 添加你需要提取的文件目录
    'components/**/*.{wxml,js,ts}',
    'pages/**/*.{wxml,js,ts}',
    // 不要使用下方的写法，这会导致 vite 开发时监听文件数量爆炸
    // '**/*.{js,ts,wxml}', '!node_modules/**', '!dist/**'
  ],
  // 假如你使用 ts 模板，则可以使用下方的配置
  // content: ['miniprogram/**/*.{ts,js,wxml}'],
  corePlugins: {
    // 小程序不需要 preflight 和 container，因为这主要是给 h5 的，如果你要同时开发小程序和 h5 端，你应该使用环境变量来控制它
    preflight: false,
    container: false,
  },
  presets: [
    require('tailwindcss-rem2px-preset').createPreset({
      // 32 意味着 1rem = 32rpx
      fontSize: 32,
      // 转化的单位,可以变成 px / rpx
      unit: 'rpx'
    })
  ]
}