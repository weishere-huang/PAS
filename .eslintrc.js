// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential', 
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  //"off"或者0    //关闭规则关闭
  //"warn"或者1    //在打开的规则作为警告（不影响退出代码）
  //"error"或者2    //把规则作为一个错误（退出代码触发时为1）
  rules: {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    "eol-last": 0,//关闭强制末尾换行
    //'no-multiple-empty-lines':[1, {"max": 5}],
    // 'no-trailing-spaces':0,
    // allow async-await
    'generator-star-spacing': 1,
    'space-before-function-paren': [0, "always"],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    "no-unused-vars": [2, { 
      // 允许声明未使用变量
      "vars": "local",
      // 参数不检查
      "args": "none" 
    }],
    // 关闭语句强制分号结尾
    "semi": [0],
    //key值前面是否要有空格
     "key-spacing": [0, {
      "singleLine": {
        "beforeColon": false,
        "afterColon": true
      },
      "multiLine": {
        "beforeColon": true,
        "afterColon": true,
        "align": "colon"
      },
    //空行最多不能超过100行
    "no-multiple-empty-lines": [0, {"max": 100}],
    //关闭禁止混用tab和空格
    "no-mixed-spaces-and-tabs": [0],
    //数组第一个指定是否启用这个规则，第二个指定几个空格
    "indent":[1,2]
    }]
  }
}
