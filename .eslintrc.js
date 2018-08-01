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
    rules: {
        // allow async-await
        'generator-star-spacing': 'off',     // 强制 generator 函数中 * 号周围使用一致的空格
        'curly': 'error',                    // 强制所有控制语句使用一致的括号风格
        'eqeqeq': 'error',                   // 要求使用 === 和 !==
        'no-empty-function': 'error',        // 禁止出现空函数
        'no-empty-pattern': 'error',         // 禁止使用空解构模式
        'no-global-assign': 'error',         // 禁止对原生对象或只读的全局对象进行赋值
        'no-redeclare': 'error',             // 禁止多次声明同一变量
        'no-labels': 'error',                // 禁用标签语句
        'no-void': 'error',                  // 禁用 void 操作符
        'no-with': 'error',                  // 禁用 with 语句
        'no-unused-vars': 'error',           // 禁止出现未使用过的变量
        'no-multiple-empty-lines': 'off',    // 禁止出现多行空行
        'space-infix-ops': 'error',          // 要求操作符周围有空格
        'no-duplicate-imports': 'error',     // 禁止重复模块导入
        'no-whitespace-before-property': 'error',        // 禁止属性前有空白
        'func-call-spacing': ["error", "never"],         // 禁止在函数标识符和其调用之间有空格
        'space-in-parens': ["error", "never"],           // 强制在圆括号内使用一致的空格
        'template-tag-spacing': ["error", "always"],     // 要求在模板标记和它们的字面量之间有空格
        'key-spacing': ["error", { "beforeColon": false }],    // 不强制在对象字面量的属性中键和值之间使用一致的间距
        'indent': 'off',                                  // 强制使用一致的缩进
        'padded-blocks': 'off',                               // 强制使用一致的缩进
        'space-before-function-paren': 'off',                               // 强制使用一致的缩进
        'semi': ['error', 'always', {'omitLastInOneLineBlock': true}],       // 要求使用分号
        'no-trailing-spaces': 'off',         // 禁用行尾空格
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'         // 禁用 debugger
    }
}
