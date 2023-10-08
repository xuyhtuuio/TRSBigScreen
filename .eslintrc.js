module.export  = {
    rout: true,
    env: {
        browser: true,
        node: true
    },
    parserOptions: {
        parser: 'babel-eslint'
    },
    extends: [
        'plugin:vue/recommended'
    ],
    plugins: [
        'vue'
    ],
    // 添加自定义规则
    rules: {}
}