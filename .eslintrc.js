
module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true
  },
  settings: {
    "version": "detect"
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true, // es6对象的扩展运算符
      jsx: true // //指定ESLint可以解析JSX语法
    },
    ecmaVersion: 2019,
    sourceType: 'module'
  },
  plugins: [
    'html',
    'react',
    '@typescript-eslint',
    'react-hooks'
  ],
  rules: {
    /** ********************************** js相关配置 ******************************************/
    'default-case-last': 'off',
    'no-promise-executor-return': 'off',
    'no-useless-backreference': 'off',
    /**
     * setter 必须有对应的 getter，getter 可以没有对应的 setter
     */
    'accessor-pairs': [
      'error',
      {
        setWithoutGet: true,
        getWithoutSet: false
      }
    ],
    /**
     * 数组的方法除了 forEach 之外，回调函数必须有返回值
     */
    'array-callback-return': 'error',
    /**
     * 将 var 定义的变量视为块作用域，禁止在块外使用
     * @reason 已经禁止使用 var 了
     */
    'block-scoped-var': 'off',
    /**
     * callback 之后必须立即 return
     */
    'callback-return': 'off',
    /**
     * 变量名必须是 camelcase 风格的
     * @reason 很多 api 或文件名都不是 camelcase 风格的
     */
    camelcase: 'off',
    /**
     * 注释的首字母必须大写
     */
    'capitalized-comments': 'off',
    /**
     * 在类的非静态方法中，必须存在对 this 的引用
     */
    'class-methods-use-this': 'off',
    /**
     * 禁止函数的循环复杂度超过 20
     * @reason https://en.wikipedia.org/wiki/Cyclomatic_complexity
     */
    complexity: [
      'error',
      {
        max: 20
      }
    ],
    /**
     * 禁止函数在不同分支返回不同类型的值
     * @reason 缺少 TypeScript 的支持，类型判断是不准确的
     */
    'consistent-return': 'off',
    /**
     * 限制 this 的别名
     */
    'consistent-this': 'off',
    /**
     * constructor 中必须有 super
     */
    'constructor-super': 'error',
    /**
     * switch 语句必须有 default
     */
    'default-case': 'off',
    /**
     * 有默认值的参数必须放在函数参数的末尾
     */
    'default-param-last': 'off',
    /**
     * 禁止使用 foo['bar']，必须写成 foo.bar
     * @reason 当需要写一系列属性的时候，可以更统一
     */
    'dot-notation': 'off',
    /**
     * 必须使用 === 或 !==，禁止使用 == 或 !=
     */
    eqeqeq: ['error', 'always'],
    /**
     * 禁止方向错误的 for 循环
     */
    'for-direction': 'error',
    /**
     * 函数赋值给变量的时候，函数名必须与变量名一致
     */
    'func-name-matching': [
      'error',
      'always',
      {
        includeCommonJSModuleExports: false
      }
    ],
    /**
     * 函数必须有名字
     */
    'func-names': 'off',
    /**
     * 必须只使用函数声明或只使用函数表达式
     */
    'func-style': 'off',
    /**
     * getter 必须有返回值，并且禁止返回空
     */
    'getter-return': 'error',
    /**
     * require 必须在全局作用域下
     */
    'global-require': 'off',
    /**
     * setter 和 getter 必须写在一起
     */
    'grouped-accessor-pairs': 'off',
    /**
     * for in 内部必须有 hasOwnProperty
     */
    'guard-for-in': 'off',
    /**
     * callback 中的 err 必须被处理
     * @reason 它是通过字符串匹配来判断函数参数 err 的，不准确
     */
    'handle-callback-err': 'off',
    /**
     * 禁止使用指定的标识符
     */
    'id-blacklist': 'off',
    /**
     * 限制变量名长度
     */
    'id-length': 'off',
    /**
     * 限制变量名必须匹配指定的正则表达式
     */
    'id-match': 'off',
    /**
     * 变量必须在定义的时候赋值
     */
    'init-declarations': 'off',
    /**
     * 单行注释必须写在上一行
     */
    'line-comment-position': 'off',
    /**
     * 类的成员之间是否需要空行
     * @reason 有时为了紧凑需要挨在一起，有时为了可读性需要空一行
     */
    'lines-between-class-members': 'off',
    /**
     * 限制一个文件中类的数量
     */
    'max-classes-per-file': 'off',
    /**
     * 代码块嵌套的深度禁止超过 5 层
     */
    'max-depth': ['error', 5],
    /**
     * 限制一个文件最多的行数
     */
    'max-lines': 'off',
    /**
     * 限制函数块中的代码行数
     */
    'max-lines-per-function': 'off',
    /**
     * 回调函数嵌套禁止超过 3 层，多了请用 async await 替代
     */
    'max-nested-callbacks': ['error', 3],
    /**
     * 函数的参数禁止超过 3 个
     */
    'max-params': ['error', 8],
    /**
     * 限制函数块中的语句数量
     */
    'max-statements': 'off',
    /**
     * 限制一行中的语句数量
     */
    'max-statements-per-line': 'off',
    /**
     * 约束多行注释的格式
     * @reason 能写注释已经不容易了，不需要限制太多
     */
    'multiline-comment-style': 'off',
    /**
     * new 后面的类名必须首字母大写
     */
    'new-cap': [
      'error',
      {
        newIsCap: true,
        capIsNew: false,
        properties: true
      }
    ],
    /**
     * 禁止使用 alert
     */
    'no-alert': 'off',
    /**
     * 禁止使用 Array 构造函数时传入的参数超过一个
     * @reason 参数为一个时表示创建一个指定长度的数组，比较常用
     * 参数为多个时表示创建一个指定内容的数组，此时可以用数组字面量实现，不必使用构造函数
     */
    'no-array-constructor': 'error',
    /**
     * 禁止将 async 函数做为 new Promise 的回调函数
     * @reason 出现这种情况时，一般不需要使用 new Promise 实现异步了
     */
    'no-async-promise-executor': 'error',
    /**
     * 禁止将 await 写在循环里，因为这样就无法同时发送多个异步请求了
     * @reason 要求太严格了，有时需要在循环中写 await
     */
    'no-await-in-loop': 'off',
    /**
     * 禁止使用位运算
     */
    'no-bitwise': 'off',
    /**
     * 禁止直接使用 Buffer
     * @reason Buffer 构造函数是已废弃的语法
     */
    'no-buffer-constructor': 'error',
    /**
     * 禁止使用 caller 或 callee
     * @reason 它们是已废弃的语法
     */
    'no-caller': 'error',
    /**
     * switch 的 case 内有变量定义的时候，必须使用大括号将 case 内变成一个代码块
     */
    'no-case-declarations': 'error',
    /**
     * 禁止对已定义的 class 重新赋值
     */
    'no-class-assign': 'error',
    /**
     * 禁止与负零进行比较
     */
    'no-compare-neg-zero': 'error',
    /**
     * 禁止在测试表达式中使用赋值语句，除非这个赋值语句被括号包起来了
     */
    'no-cond-assign': ['error', 'except-parens'],
    /**
     * 禁止使用 console
     */
    'no-console': 'off',
    /**
     * 禁止对使用 const 定义的常量重新赋值
     */
    'no-const-assign': 'error',
    /**
     * 禁止将常量作为分支条件判断中的测试表达式，但允许作为循环条件判断中的测试表达式
     */
    'no-constant-condition': [
      'error',
      {
        checkLoops: false
      }
    ],
    /**
     * 禁止在构造函数中返回值
     */
    'no-constructor-return': 'off',
    /**
     * 禁止使用 continue
     */
    'no-continue': 'off',
    /**
     * 禁止在正则表达式中出现 Ctrl 键的 ASCII 表示，即禁止使用 /\x1f/
     * @reason 几乎不会遇到这种场景
     */
    'no-control-regex': 'off',
    /**
     * 禁止使用 debugger
     */
    'no-debugger': 'error',
    /**
     * 禁止对一个变量使用 delete
     * @reason 编译阶段就会报错了
     */
    'no-delete-var': 'off',
    /**
     * 禁止在正则表达式中出现形似除法操作符的开头，如 let a = /=foo/
     * @reason 有代码高亮的话，在阅读这种代码时，也完全不会产生歧义或理解上的困难
     */
    'no-div-regex': 'off',
    /**
     * 禁止在函数参数中出现重复名称的参数
     * @reason 编译阶段就会报错了
     */
    'no-dupe-args': 'off',
    /**
     * 禁止重复定义类的成员
     */
    'no-dupe-class-members': 'error',
    /**
     * 禁止 if else 的条件判断中出现重复的条件
     */
    'no-dupe-else-if': 'off',
    /**
     * 禁止在对象字面量中出现重复的键名
     */
    'no-dupe-keys': 'error',
    /**
     * 禁止在 switch 语句中出现重复测试表达式的 case
     */
    'no-duplicate-case': 'error',
    /**
     * 禁止重复导入模块
     */
    'no-duplicate-imports': 'error',
    /**
     * 禁止在 else 内使用 return，必须改为提前结束
     * @reason else 中使用 return 可以使代码结构更清晰
     */
    'no-else-return': 'off',
    /**
     * 禁止出现空代码块，允许 catch 为空代码块
     */
    'no-empty': [
      'error',
      {
        allowEmptyCatch: true
      }
    ],
    /**
     * 禁止在正则表达式中使用空的字符集 []
     */
    'no-empty-character-class': 'error',
    /**
     * 不允许有空函数
     * @reason 有时需要将一个空函数设置为某个项的默认值
     */
    'no-empty-function': 'off',
    /**
     * 禁止解构赋值中出现空 {} 或 []
     */
    'no-empty-pattern': 'error',
    /**
     * 禁止使用 foo == null，必须使用 foo === null
     */
    'no-eq-null': 'error',
    /**
     * 禁止使用 eval
     */
    'no-eval': 'error',
    /**
     * 禁止将 catch 的第一个参数 error 重新赋值
     */
    'no-ex-assign': 'error',
    /**
     * 禁止修改原生对象
     * @reason 修改原生对象可能会与将来版本的 js 冲突
     */
    'no-extend-native': 'error',
    /**
     * 禁止出现没必要的 bind
     */
    'no-extra-bind': 'error',
    /**
     * 禁止不必要的布尔类型转换
     */
    'no-extra-boolean-cast': 'error',
    /**
     * 禁止出现没必要的 label
     * @reason 已经禁止使用 label 了
     */
    'no-extra-label': 'off',
    /**
     * switch 的 case 内必须有 break, return 或 throw，空的 case 除外
     */
    'no-fallthrough': 'error',
    /**
     * 禁止将一个函数声明重新赋值
     */
    'no-func-assign': 'error',
    /**
     * 禁止对全局变量赋值
     */
    'no-global-assign': 'error',
    /**
     * 禁止使用 ~+ 等难以理解的类型转换，仅允许使用 !!
     */
    'no-implicit-coercion': [
      'error',
      {
        allow: ['!!']
      }
    ],
    /**
     * 禁止在全局作用域下定义变量或申明函数
     * @reason 模块化之后，不会出现这种在全局作用域下定义变量的情况
     */
    'no-implicit-globals': 'off',
    /**
     * 禁止在 setTimeout 或 setInterval 中传入字符串
     */
    'no-implied-eval': 'error',
    /**
     * 禁止对导入的模块进行赋值
     */
    'no-import-assign': 'off',
    /**
     * 禁止在代码后添加单行注释
     */
    'no-inline-comments': 'off',
    /**
     * 禁止在 if 代码块内出现函数声明
     */
    'no-inner-declarations': ['error', 'both'],
    /**
     * 禁止在 RegExp 构造函数中出现非法的正则表达式
     */
    'no-invalid-regexp': 'error',
    /**
     * 禁止在类之外的地方使用 this
     * @reason 只允许在 class 中使用 this
     */
    'no-invalid-this': 'error',
    /**
     * 禁止使用特殊空白符（比如全角空格），除非是出现在字符串、正则表达式或模版字符串中
     */
    'no-irregular-whitespace': [
      'error',
      {
        skipStrings: true,
        skipComments: false,
        skipRegExps: true,
        skipTemplates: true
      }
    ],
    /**
     * 禁止使用 __iterator__
     * @reason __iterator__ 是一个已废弃的属性
     * 使用 [Symbol.iterator] 替代它
     */
    'no-iterator': 'error',
    /**
     * 禁止 label 名称与已定义的变量重复
     * @reason 已经禁止使用 label 了
     */
    'no-label-var': 'off',
    /**
     * 禁止使用 label
     */
    'no-labels': 'error',
    /**
     * 禁止使用没必要的 {} 作为代码块
     */
    'no-lone-blocks': 'error',
    /**
     * 禁止 else 中只有一个单独的 if
     * @reason 单独的 if 可以把逻辑表达的更清楚
     */
    'no-lonely-if': 'off',
    /**
     * 禁止在循环内的函数内部出现循环体条件语句中定义的变量
     * @reason 使用 let 就已经解决了这个问题了
     */
    'no-loop-func': 'off',
    /**
     * 禁止使用 magic numbers
     */
    'no-magic-numbers': 'off',
    /**
     * 禁止正则表达式中使用肉眼无法区分的特殊字符
     * @reason 某些特殊字符很难看出差异，最好不要在正则中使用
     */
    'no-misleading-character-class': 'error',
    /**
     * 相同类型的 require 必须放在一起
     */
    'no-mixed-requires': 'off',
    /**
     * 禁止连续赋值，比如 foo = bar = 1
     */
    'no-multi-assign': 'off',
    /**
     * 禁止使用 \ 来换行字符串
     */
    'no-multi-str': 'error',
    /**
     * 禁止 if 里有否定的表达式
     * @reason 否定的表达式可以把逻辑表达的更清楚
     */
    'no-negated-condition': 'off',
    /**
     * 禁止使用嵌套的三元表达式，比如 a ? b : c ? d : e
     */
    'no-nested-ternary': 'off',
    /**
     * 禁止直接 new 一个类而不赋值
     * @reason new 应该作为创建一个类的实例的方法，所以不能不赋值
     */
    'no-new': 'error',
    /**
     * 禁止使用 new Function
     * @reason 这和 eval 是等价的
     */
    'no-new-func': 'error',
    /**
     * 禁止直接 new Object
     */
    'no-new-object': 'error',
    /**
     * 禁止直接 new require('foo')
     */
    'no-new-require': 'error',
    /**
     * 禁止使用 new 来生成 Symbol
     */
    'no-new-symbol': 'error',
    /**
     * 禁止使用 new 来生成 String, Number 或 Boolean
     */
    'no-new-wrappers': 'error',
    /**
     * 禁止将 Math, JSON 或 Reflect 直接作为函数调用
     */
    'no-obj-calls': 'error',
    /**
     * 禁止使用 0 开头的数字表示八进制数
     * @reason 编译阶段就会报错了
     */
    'no-octal': 'off',
    /**
     * 禁止使用八进制的转义符
     * @reason 编译阶段就会报错了
     */
    'no-octal-escape': 'off',
    /**
     * 禁止对函数的参数重新赋值
     */
    'no-param-reassign': 'off',
    /**
     * 禁止对 __dirname 或 __filename 使用字符串连接
     * @reason 不同平台下的路径符号不一致，建议使用 path 处理平台差异性
     */
    'no-path-concat': 'error',
    /**
     * 禁止使用 ++ 或 --
     */
    'no-plusplus': 'off',
    /**
     * 禁止使用 process.env.NODE_ENV
     */
    'no-process-env': 'off',
    /**
     * 禁止使用 process.exit(0)
     */
    'no-process-exit': 'off',
    /**
     * 禁止使用 __proto__
     * @reason __proto__ 是已废弃的语法
     */
    'no-proto': 'error',
    /**
     * 禁止使用 hasOwnProperty, isPrototypeOf 或 propertyIsEnumerable
     * @reason hasOwnProperty 比较常用
     */
    'no-prototype-builtins': 'off',
    /**
     * 禁止重复定义变量
     * @reason 禁用 var 之后，编译阶段就会报错了
     */
    'no-redeclare': 'off',
    /**
     * 禁止在正则表达式中出现连续的空格
     */
    'no-regex-spaces': 'error',
    /**
     * 禁止使用指定的全局变量
     */
    'no-restricted-globals': 'off',
    /**
     * 禁止导入指定的模块
     */
    'no-restricted-imports': 'off',
    /**
     * 禁止使用指定的模块
     */
    'no-restricted-modules': 'off',
    /**
     * 禁止使用指定的对象属性
     */
    'no-restricted-properties': 'off',
    /**
     * 禁止使用指定的语法
     */
    'no-restricted-syntax': 'off',
    /**
     * 禁止在 return 语句里赋值
     */
    'no-return-assign': ['error', 'always'],
    /**
     * 禁止在 return 语句里使用 await
     */
    'no-return-await': 'error',
    /**
     * 禁止出现 location.href = 'javascript:void(0)';
     * @reason 有些场景下还是需要用到这个
     */
    'no-script-url': 'off',
    /**
     * 禁止将自己赋值给自己
     */
    'no-self-assign': 'error',
    /**
     * 禁止将自己与自己比较
     */
    'no-self-compare': 'error',
    /**
     * 禁止使用逗号操作符
     */
    'no-sequences': 'error',
    /**
     * 禁止 setter 有返回值
     */
    'no-setter-return': 'off',
    /**
     * 禁止变量名与上层作用域内的已定义的变量重复
     * @reason 很多时候函数的形参和传参是同名的
     */
    'no-shadow': 'off',
    /**
     * 禁止使用保留字作为变量名
     */
    'no-shadow-restricted-names': 'error',
    /**
     * 禁止在数组中出现连续的逗号
     */
    'no-sparse-arrays': 'error',
    /**
     * 禁止使用 node 中的同步的方法，比如 fs.readFileSync
     */
    'no-sync': 'off',
    /**
     * 禁止在普通字符串中出现模版字符串里的变量形式
     */
    'no-template-curly-in-string': 'error',
    /**
     * 禁止使用三元表达式
     */
    'no-ternary': 'off',
    /**
     * 禁止在 super 被调用之前使用 this 或 super
     */
    'no-this-before-super': 'error',
    /**
     * 禁止 throw 字面量，必须 throw 一个 Error 对象
     */
    'no-throw-literal': 'error',
    /**
     * 禁止使用未定义的变量
     */
    // 'no-undef': 'error',
    /**
     * 禁止将 undefined 赋值给变量
     */
    // 'no-undef-init': 'error',
    /**
     * 禁止使用 undefined
     */
    // 'no-undefined': 'off',
    /**
     * 禁止变量名出现下划线
     */
    'no-underscore-dangle': 'off',
    /**
     * 循环内必须对循环条件中的变量有修改
     */
    'no-unmodified-loop-condition': 'error',
    /**
     * 必须使用 !a 替代 a ? false : true
     * @reason 后者表达的更清晰
     */
    'no-unneeded-ternary': 'off',
    /**
     * 禁止在 return, throw, break 或 continue 之后还有代码
     */
    'no-unreachable': 'error',
    /**
     * 禁止在 finally 中出现 return, throw, break 或 continue
     * @reason finally 中的语句会在 try 之前执行
     */
    'no-unsafe-finally': 'error',
    /**
     * 禁止在 in 或 instanceof 操作符的左侧变量前使用感叹号
     */
    'no-unsafe-negation': 'error',
    /**
     * 禁止无用的表达式
     */
    'no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: true
      }
    ],
    /**
     * 禁止出现没用到的 label
     * @reason 已经禁止使用 label 了
     */
    'no-unused-labels': 'off',
    /**
     * 已定义的变量必须使用
     */
    'no-unused-vars': 'off',
    // [
    //     'warn',
    //     {
    //         vars: 'all',
    //         args: 'none',
    //         ignoreRestSiblings: false,
    //         caughtErrors: 'none'
    //     }
    // ],
    /**
     * 变量必须先定义后使用
     */
    'no-use-before-define': 'off',
    // [
    //     'error',
    //     {
    //         variables: false,
    //         functions: false,
    //         classes: false
    //     }
    // ],
    /**
     * 禁止出现没必要的 call 或 apply
     */
    'no-useless-call': 'error',
    /**
     * 禁止在 catch 中仅仅只是把错误 throw 出去
     * @reason 这样的 catch 是没有意义的，等价于直接执行 try 里的代码
     */
    'no-useless-catch': 'error',
    /**
     * 禁止出现没必要的计算键名
     */
    'no-useless-computed-key': 'error',
    /**
     * 禁止出现没必要的字符串连接
     */
    'no-useless-concat': 'error',
    /**
     * 禁止出现没必要的 constructor
     */
    'no-useless-constructor': 'error',
    /**
     * 禁止出现没必要的转义
     * @reason 转义可以使代码更易懂
     */
    'no-useless-escape': 'off',
    /**
     * 禁止解构赋值时出现同样名字的的重命名，比如 let { foo: foo } = bar;
     */
    'no-useless-rename': 'error',
    /**
     * 禁止没必要的 return
     */
    'no-useless-return': 'off',
    /**
     * 禁止使用 var
     */
    'no-var': 'warn',
    /**
     * 禁止使用 void
     */
    'no-void': 'error',
    /**
     * 禁止注释中出现 TODO 和 FIXME
     */
    'no-warning-comments': 'off',
    /**
     * 禁止使用 with
     * @reason 编译阶段就会报错了
     */
    'no-with': 'off',
    /**
     * 必须使用 a = {b} 而不是 a = {b: b}
     * @reason 有时后者可以使代码结构更清晰
     */
    'object-shorthand': 'off',
    /**
     * 禁止变量申明时用逗号一次申明多个
     */
    'one-var': ['error', 'never'],
    /**
     * 必须使用 x = x + y 而不是 x += y
     */
    'operator-assignment': 'off',
    /**
     * 限制语句之间的空行规则，比如变量定义完之后必须要空行
     */
    'padding-line-between-statements': 'off',
    /**
     * 申明后不再被修改的变量必须使用 const 来申明
     */
    'prefer-const': 'off',
    /**
     * 必须使用解构赋值
     */
    'prefer-destructuring': 'off',
    /**
     * 使用 ES2016 的语法 ** 替代 Math.pow
     */
    'prefer-exponentiation-operator': 'off',
    /**
     * 使用 ES2018 中的正则表达式命名组
     * @reason 正则表达式已经较难理解了，没必要强制加上命名组
     */
    'prefer-named-capture-group': 'off',
    /**
     * 必须使用 0b11111011 而不是 parseInt()
     */
    'prefer-numeric-literals': 'off',
    /**
     * 必须使用 ... 而不是 Object.assign，除非 Object.assign 的第一个参数是一个变量
     */
    'prefer-object-spread': 'error',
    /**
     * Promise 的 reject 中必须传入 Error 对象，而不是字面量
     */
    'prefer-promise-reject-errors': 'error',
    /**
     * 优先使用正则表达式字面量，而不是 RegExp 构造函数
     */
    'prefer-regex-literals': 'off',
    /**
     * 必须使用 ...args 而不是 arguments
     */
    'prefer-rest-params': 'off',
    /**
     * 必须使用 ... 而不是 apply，比如 foo(...args)
     */
    'prefer-spread': 'off',
    /**
     * 必须使用模版字符串而不是字符串连接
     */
    'prefer-template': 'off',
    /**
     * parseInt 必须传入第二个参数
     */
    radix: 'error',
    /**
     * 禁止将 await 或 yield 的结果做为运算符的后面项
     * @reason 这样会导致不符合预期的结果
     * https://github.com/eslint/eslint/issues/11899
     * 在上面 issue 修复之前，关闭此规则
     */
    'require-atomic-updates': 'off',
    /**
     * async 函数中必须存在 await 语句
     */
    'require-await': 'off',
    /**
     * 正则表达式中必须要加上 u 标志
     */
    'require-unicode-regexp': 'off',
    /**
     * generator 函数内必须有 yield
     */
    'require-yield': 'error',
    /**
     * 导入必须按规则排序
     */
    'sort-imports': 'off',
    /**
     * 对象字面量的键名必须排好序
     */
    'sort-keys': 'off',
    /**
     * 变量申明必须排好序
     */
    'sort-vars': 'off',
    /**
     * 注释的斜线或 * 后必须有空格
     */
    'spaced-comment': [
      'error',
      'always',
      {
        block: {
          exceptions: ['*'],
          balanced: true
        }
      }
    ],
    /**
     * 禁止使用 'strict';
     */
    strict: ['off', 'never'],
    /**
     * 创建 Symbol 时必须传入参数
     */
    'symbol-description': 'error',
    /**
     * 必须使用 isNaN(foo) 而不是 foo === NaN
     */
    'use-isnan': 'error',
    /**
     * typeof 表达式比较的对象必须是 'undefined', 'object', 'boolean', 'number', 'string', 'function', 'symbol', 或 'bigint'
     */
    'valid-typeof': 'error',
    /**
     * var 必须在作用域的最前面
     */
    'vars-on-top': 'off',
    /**
     * 必须使用 if (foo === 5) 而不是 if (5 === foo)
     */
    yoda: [
      'error',
      'never',
      {
        onlyEquality: true
      }
    ],

    /** ********************************** react/jsx相关配置 ******************************************/
    /**
    * 布尔值类型的 propTypes 的 name 必须为 is 或 has 开头
    * @reason 类型相关的约束交给 TypeScript
    */
    'react/boolean-prop-naming': 'off',
    /**
     * <button> 必须有 type 属性
     */
    'react/button-has-type': 'off',
    /**
     * 一个 defaultProps 必须有对应的 propTypes
     * @reason 类型相关的约束交给 TypeScript
     */
    'react/default-props-match-prop-types': 'off',
    /**
     * props, state, context 必须用解构赋值
     */
    'react/destructuring-assignment': 'off',
    /**
     * 组件必须有 displayName 属性
     * @reason 不强制要求写 displayName
     */
    'react/display-name': 'off',
    /**
     * 禁止在自定义组件中使用指定的 props
     */
    'react/forbid-component-props': 'off',
    /**
     * 禁止在 dom 组件中使用指定的 props
     */
    'react/forbid-dom-props': 'off',
    /**
     * 禁止使用指定的组件
     */
    'react/forbid-elements': 'off',
    /**
     * 禁止使用另一个组件的 propTypes
     * @reason 类型相关的约束交给 TypeScript
     */
    'react/forbid-foreign-prop-types': 'off',
    /**
     * 禁止使用 PropTypes.any PropTypes.array 和 PropTypes.object
     * @reason 类型相关的约束交给 TypeScript
     */
    'react/forbid-prop-types': 'off',
    /**
     * 限制函数式组件的函数形式（函数声明、函数表达式或箭头函数）
     * @reason 一些场景还不能覆盖，如 export default function，自动修复功能在 ts 中有些问题
     */
    'react/function-component-definition': 'off',
    /**
     * 布尔值的属性必须显式的声明值为 true
     */
    'react/jsx-boolean-value': 'off',
    /**
     * 禁止 jsx 中使用无用的引号
     */
    'react/jsx-curly-brace-presence': ['error', 'never'],
    /**
     * 限制文件后缀
     */
    'react/jsx-filename-extension': 'off',
    /**
     * 必须使用 <></> 而不是 React.Fragment
     * @reason <></> 不需要额外引入 Fragment 组件
     */
    'react/jsx-fragments': ['error', 'syntax'],
    /**
     * handler 的名称必须是 onXXX 或 handleXXX
     */
    'react/jsx-handler-names': 'off',
    /**
     * 数组中的 jsx 必须有 key
     */
    'react/jsx-key': [
      'error',
      {
        checkFragmentShorthand: true
      }
    ],
    /**
     * 限制 jsx 层级
     */
    'react/jsx-max-depth': 'off',
    /**
     * jsx 中禁止使用 bind
     */
    'react/jsx-no-bind': 'off',
    /**
     * 禁止在 jsx 中使用像注释的字符串
     */
    'react/jsx-no-comment-textnodes': 'error',
    /**
     * 禁止出现重复的 props
     */
    'react/jsx-no-duplicate-props': 'error',
    /**
     * 禁止在 jsx 中出现字符串
     */
    'react/jsx-no-literals': 'off',
    /**
     * 禁止出现 href="javascript:void(0)"
     * @reason React 已经有 warning 了，并且会在将来禁止此类属性值
     */
    'react/jsx-no-script-url': 'error',
    /**
     * 禁止使用 target="_blank"
     */
    'react/jsx-no-target-blank': 'off',
    /**
     * 禁止使用未定义的组件
     */
    // 'react/jsx-no-undef': 'error',
    /**
     * 禁止无意义的 Fragment 组件
     */
    'react/jsx-no-useless-fragment': 'error',
    /**
     * 组件的名称必须符合 PascalCase
     */
    'react/jsx-pascal-case': 'error',
    /**
     * 禁止使用 {...props}
     */
    'react/jsx-props-no-spreading': 'off',
    /**
     * defaultProps 必须按字母排序
     */
    'react/jsx-sort-default-props': 'off',
    /**
     * props 必须按字母排序
     */
    'react/jsx-sort-props': 'off',
    /**
     * 修复 React 被误报为未使用的变量的问题（仅在开启 no-unused-vars 时有效）
     */
    'react/jsx-uses-react': 'error',
    /**
     * 修复 no-unused-vars 不检查 jsx 的问题
     */
    'react/jsx-uses-vars': 'error',
    /**
     * 禁止在 setState 中使用 this.state
     */
    'react/no-access-state-in-setstate': 'off',
    /**
     * 两个 inline 元素之间必须有空格，否则视觉上它们就贴在一起了
     * @reason 这是样式的问题，不应该由空格约束
     */
    'react/no-adjacent-inline-elements': 'off',
    /**
     * 禁止使用数组的索引作为 key
     */
    'react/no-array-index-key': 'off',
    /**
     * 禁止将 children 作为一个 prop
     */
    'react/no-children-prop': 'error',
    /**
     * 禁止使用 dangerouslySetInnerHTML
     */
    'react/no-danger': 'off',
    /**
     * 禁止在使用了 dangerouslySetInnerHTML 的组件内添加 children
     */
    'react/no-danger-with-children': 'error',
    /**
     * 禁止使用已废弃的 api
     */
    'react/no-deprecated': 'error',
    /**
     * 禁止在 componentDidMount 里使用 setState
     * @reason 同构应用需要在 didMount 里使用 setState
     */
    'react/no-did-mount-set-state': 'off',
    /**
     * 禁止在 componentDidUpdate 里使用 setState
     */
    'react/no-did-update-set-state': 'error',
    /**
     * 禁止直接修改 this.state
     */
    'react/no-direct-mutation-state': 'error',
    /**
     * 禁止使用 findDOMNode
     */
    'react/no-find-dom-node': 'error',
    /**
     * 禁止使用 isMounted
     * @reason 它是已废弃的语法
     */
    'react/no-is-mounted': 'error',
    /**
     * 禁止在一个文件创建两个组件
     * @reason 有一个 bug：https://github.com/yannickcr/eslint-plugin-react/issues/1181
     */
    'react/no-multi-comp': 'off',
    /**
     * 禁止在 React.PureComponent 中使用 shouldComponentUpdate
     */
    'react/no-redundant-should-component-update': 'error',
    /**
     * 禁止使用 ReactDOM.render 的返回值
     */
    'react/no-render-return-value': 'error',
    /**
     * 禁止使用 setState
     */
    'react/no-set-state': 'off',
    /**
     * 禁止使用字符串 ref
     */
    'react/no-string-refs': 'error',
    /**
     * 禁止在函数组件中使用 this
     */
    'react/no-this-in-sfc': 'error',
    /**
     * 禁止组件的属性或生命周期大小写错误
     */
    'react/no-typos': 'error',
    /**
     * 禁止在组件的内部存在未转义的 >, ", ' 或 }
     */
    'react/no-unescaped-entities': 'error',
    /**
     * 禁止出现 HTML 中的属性，如 class
     */
    'react/no-unknown-property': 'error',
    /**
     * 禁止使用不安全的生命周期方法 componentWillMount, componentWillReceiveProps, componentWillUpdate
     */
    'react/no-unsafe': [
      'error',
      {
        checkAliases: true
      }
    ],
    /**
     * 禁止出现未使用的 propTypes
     * @reason 类型相关的约束交给 TypeScript
     */
    'react/no-unused-prop-types': 'off',
    /**
     * 已定义的 state 必须使用
     * @reason 没有官方文档，并且存在很多 bug：https://github.com/yannickcr/eslint-plugin-react/search?q=no-unused-state&type=Issues&utf8=%E2%9C%93
     */
    'react/no-unused-state': 'off',
    /**
     * 禁止在 componentWillUpdate 中使用 setState
     * @reason 已经禁止使用 componentWillUpdate 了
     */
    'react/no-will-update-set-state': 'off',
    /**
     * 必须使用 Class 的形式创建组件
     */
    'react/prefer-es6-class': ['error', 'always'],
    /**
     * 使用 Flow 时，props 必须设置为只读的
     */
    'react/prefer-read-only-props': 'off',
    /**
     * 必须使用函数式组件
     */
    'react/prefer-stateless-function': 'off',
    /**
     * 组件必须写 propTypes
     * @reason 类型相关的约束交给 TypeScript
     */
    'react/prop-types': 'off',
    /**
     * 出现 jsx 的地方必须导入 React
     * @reason 已经在 no-undef 中限制了
     */
    'react/react-in-jsx-scope': 'off',
    /**
     * 非 required 的 prop 必须有 defaultProps
     * @reason 类型相关的约束交给 TypeScript
     */
    'react/require-default-props': 'off',
    /**
     * 组件必须有 shouldComponentUpdate
     */
    'react/require-optimization': 'off',
    /**
     * render 方法中必须有返回值
     */
    'react/require-render-return': 'error',
    /**
     * 组件内没有 children 时，必须使用自闭和写法
     */
    'react/self-closing-comp': 'off',
    /**
     * 组件内方法必须按照一定规则排序
     */
    'react/sort-comp': 'error',
    /**
     * propTypes 的属性必须按照字母排序
     * @reason 类型相关的约束交给 TypeScript
     */
    'react/sort-prop-types': 'off',
    /**
     * 必须在构造函数中初始化 state
     */
    'react/state-in-constructor': 'off',
    /**
     * 类的静态属性必须使用 static 关键字定义
     */
    'react/static-property-placement': 'error',
    /**
     * style 属性的取值必须是 object
     */
    'react/style-prop-object': 'error',
    /**
     * img, br 标签中禁止有 children
     */
    'react/void-dom-elements-no-children': 'error',



    /** ********************************** Typescript相关配置 ******************************************/
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-duplicate-imports': 'off',
    '@typescript-eslint/no-loss-of-precision': 'off',
    '@typescript-eslint/member-delimiter-style': 'off',
    // 'no-dupe-class-members': 'off',
    // 'no-empty-function': 'off',
    // // https://github.com/typescript-eslint/typescript-eslint/issues/491
    // 'no-invalid-this': 'off',
    // 'no-magic-numbers': 'off',
    // 'no-unused-vars': 'off',
    // 'react/sort-comp': 'off',
    '@typescript-eslint/eslint-config-recommended': 'off',
    /**
     * 重载的函数必须写在一起
     * @reason 增加可读性
     */
    '@typescript-eslint/adjacent-overload-signatures': 'error',
    /**
     * 限制数组类型必须使用 Array<T> 或 T[]
     * @reason 允许灵活运用两者
     */
    '@typescript-eslint/array-type': 'off',
    /**
     * 禁止对没有 then 方法的对象使用 await
     * @reason 统一关闭 requires type information 的规则
     */
    '@typescript-eslint/await-thenable': 'off',
    /**
     * 禁止使用 // @ts-ignore // @ts-nocheck // @ts-check
     * @reason 这种注释本身就是对特殊代码的说明
     */
    '@typescript-eslint/ban-ts-comment': 'off',
    /**
     * 禁止使用指定的类型
     */
    '@typescript-eslint/ban-types': 'off',
    /**
     * 类型断言必须使用 as Type，禁止使用 <Type>，禁止对对象字面量进行类型断言（断言成 any 是允许的）
     * @reason <Type> 容易被理解为 jsx
     */
    '@typescript-eslint/consistent-type-assertions': [
      'error',
      {
        assertionStyle: 'as',
        objectLiteralTypeAssertions: 'never'
      }
    ],
    /**
     * 优先使用 interface 而不是 type
     * @reason interface 可以 implement, extend 和 merge
     */
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    /**
     * 有默认值或可选的参数必须放到最后
     */
    '@typescript-eslint/default-param-last': 'off',
    /**
     * 函数返回值必须与声明的类型一致
     * @reason 编译阶段检查就足够了
     */
    '@typescript-eslint/explicit-function-return-type': 'off',
    /**
     * 必须设置类的成员的可访问性
     * @reason 将不需要公开的成员设为私有的，可以增强代码的可理解性，对文档输出也很友好
     */
    // '@typescript-eslint/explicit-member-accessibility': 'off',
    /**
     * 导出的函数或类中的 public 方法必须定义输入输出参数的类型
     */
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    /**
     * 指定类成员的排序规则
     * @reason 优先级：
     * 1. static > instance
     * 2. field > constructor > method
     * 3. public > protected > private
     */
    '@typescript-eslint/member-ordering': [
      'error',
      {
        default: [
          'public-static-field',
          'protected-static-field',
          'private-static-field',
          'static-field',
          'public-static-method',
          'protected-static-method',
          'private-static-method',
          'static-method',
          'public-instance-field',
          'protected-instance-field',
          'private-instance-field',
          'public-field',
          'protected-field',
          'private-field',
          'instance-field',
          'field',
          'constructor',
          'public-instance-method',
          'protected-instance-method',
          'private-instance-method',
          'public-method',
          'protected-method',
          'private-method',
          'instance-method',
          'method'
        ]
      }
    ],
    /**
     * 限制各种变量或类型的命名规则
     * @reason 统一关闭 requires type information 的规则
     */
    '@typescript-eslint/naming-convention': 'off',
    /**
     * 禁止使用 Array 构造函数
     */
    '@typescript-eslint/no-array-constructor': 'off',
    /**
     * 禁止重复定义类的成员
     * @reason 编译阶段就会报错了
     */
    '@typescript-eslint/no-dupe-class-members': 'off',
    /**
     * 禁止 delete 时传入的 key 是动态的
     */
    '@typescript-eslint/no-dynamic-delete': 'off',
    /**
     * 不允许有空函数
     * @reason 有时需要将一个空函数设置为某个项的默认值
     */
    '@typescript-eslint/no-empty-function': 'off',
    /**
     * 禁止定义空的接口
     */
    '@typescript-eslint/no-empty-interface': 'off',
    /**
     * 禁止使用 any
     */
    '@typescript-eslint/no-explicit-any': 'off',
    /**
     * 禁止多余的 non-null 断言
     */
    '@typescript-eslint/no-extra-non-null-assertion': 'off',
    /**
     * 禁止定义没必要的类，比如只有静态方法的类
     */
    '@typescript-eslint/no-extraneous-class': 'off',
    /**
     * 禁止调用 Promise 时没有处理异常情况
     */
    '@typescript-eslint/no-floating-promises': 'off',
    /**
     * 禁止对 array 使用 for in 循环
     * @reason 统一关闭 requires type information 的规则
     */
    '@typescript-eslint/no-for-in-array': 'off',
    /**
     * 禁止使用 eval
     * @reason 统一关闭 requires type information 的规则
     */
    '@typescript-eslint/no-implied-eval': 'off',
    /**
     * 禁止给一个初始化时直接赋值为 number, string 的变量显式的声明类型
     * @reason 可以简化代码
     */
    '@typescript-eslint/no-inferrable-types': 'error',
    /**
     * 禁止使用 magic numbers
     */
    '@typescript-eslint/no-magic-numbers': 'off',
    /**
     * 禁止在接口中定义 constructor，或在类中定义 new
     */
    '@typescript-eslint/no-misused-new': 'off',
    /**
     * 避免错误的使用 Promise
     * @reason 统一关闭 requires type information 的规则
     */
    '@typescript-eslint/no-misused-promises': 'off',
    /**
     * 禁止使用 namespace 来定义命名空间
     * @reason 使用 es6 引入模块，才是更标准的方式。
     * 但是允许使用 declare namespace ... {} 来定义外部命名空间
     */
    '@typescript-eslint/no-namespace': [
      'error',
      {
        allowDeclarations: true,
        allowDefinitionFiles: true
      }
    ],
    /**
     * 禁止在 optional chaining 之后使用 non-null 断言（感叹号）
     * @reason optional chaining 后面的属性一定是非空的
     */
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
    /**
     * 禁止使用 non-null 断言（感叹号）
     * @reason 使用 non-null 断言时就已经清楚了风险
     */
    '@typescript-eslint/no-non-null-assertion': 'off',
    /**
     * 禁止给类的构造函数的参数添加修饰符
     */
    '@typescript-eslint/no-parameter-properties': 'error',
    /**
     * 禁止使用 require
     * @reason 统一使用 import 来引入模块，特殊情况使用单行注释允许 require 引入
     */
    '@typescript-eslint/no-require-imports': 'off',
    /**
     * 禁止将 this 赋值给其他变量，除非是解构赋值
     */
    '@typescript-eslint/no-this-alias': [
      'error',
      {
        allowDestructuring: true
      }
    ],
    /**
     * 禁止 throw 字面量，必须 throw 一个 Error 对象
     * @reason 统一关闭 requires type information 的规则
     */
    '@typescript-eslint/no-throw-literal': 'off',
    /**
     * 禁止使用类型别名
     */
    '@typescript-eslint/no-type-alias': 'off',
    /**
     * 测试表达式中的布尔类型禁止与 true 或 false 直接比较
     * @reason 统一关闭 requires type information 的规则
     */
    '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'off',
    /**
     * 条件表达式禁止是永远为真（或永远为假）的
     * @reason 统一关闭 requires type information 的规则
     */
    '@typescript-eslint/no-unnecessary-condition': 'off',
    /**
     * 在命名空间中，可以直接使用内部变量，不需要添加命名空间前缀
     * @reason 统一关闭 requires type information 的规则
     */
    '@typescript-eslint/no-unnecessary-qualifier': 'off',
    /**
     * 禁止范型的类型有默认值时，将范型设置为该默认值
     */
    '@typescript-eslint/no-unnecessary-type-arguments': 'off',
    /**
     * 禁止无用的类型断言
     * @reason 统一关闭 requires type information 的规则
     */
    '@typescript-eslint/no-unnecessary-type-assertion': 'off',
    /**
     * 禁止无用的表达式
     */
    '@typescript-eslint/no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: true
      }
    ],
    /**
     * 已定义的变量必须使用
     * @reason 编译阶段检查就足够了
     */
    '@typescript-eslint/no-unused-vars': 'off',
    /**
     * 禁止已定义的变量未使用
     * @reason 统一关闭 requires type information 的规则
     */
    '@typescript-eslint/no-unused-vars-experimental': 'off',
    /**
     * 禁止在定义变量之前就使用它
     * @reason 编译阶段检查就足够了
     */
    '@typescript-eslint/no-use-before-define': 'off',
    /**
     * 禁止出现没必要的 constructor
     */
    '@typescript-eslint/no-useless-constructor': 'error',
    /**
     * 禁止使用 require 来引入模块
     * @reason no-require-imports 规则已经约束了 require
     */
    '@typescript-eslint/no-var-requires': 'off',
    /**
     * 使用 as const 替代 as 'bar'
     * @reason as const 是新语法，不是很常见
     */
    '@typescript-eslint/prefer-as-const': 'off',
    /**
     * 使用 for 循环遍历数组时，如果索引仅用于获取成员，则必须使用 for of 循环替代 for 循环
     * @reason for of 循环更加易读
     */
    '@typescript-eslint/prefer-for-of': 'error',
    /**
     * 使用函数类型别名替代包含函数调用声明的接口
     */
    '@typescript-eslint/prefer-function-type': 'error',
    /**
     * 使用 includes 而不是 indexOf
     * @reason 统一关闭 requires type information 的规则
     */
    '@typescript-eslint/prefer-includes': 'off',
    /**
     * 禁止使用 module 来定义命名空间
     * @reason module 已成为 js 的关键字
     */
    '@typescript-eslint/prefer-namespace-keyword': 'error',
    /**
     * 使用 ?? 替代 ||
     * @reason 统一关闭 requires type information 的规则
     */
    '@typescript-eslint/prefer-nullish-coalescing': 'off',
    /**
     * 使用 optional chaining 替代 &&
     */
    '@typescript-eslint/prefer-optional-chain': 'off',
    /**
     * 私有变量如果没有在构造函数外被赋值，则必须设为 readonly
     * @reason 统一关闭 requires type information 的规则
     */
    '@typescript-eslint/prefer-readonly': 'off',
    /**
     * 使用 RegExp#exec 而不是 String#match
     * @reason 统一关闭 requires type information 的规则
     */
    '@typescript-eslint/prefer-regexp-exec': 'off',
    /**
     * 使用 String#startsWith 而不是其他方式
     * @reason 统一关闭 requires type information 的规则
     */
    '@typescript-eslint/prefer-string-starts-ends-with': 'off',
    /**
     * async 函数的返回值必须是 Promise
     * @reason 统一关闭 requires type information 的规则
     */
    '@typescript-eslint/promise-function-async': 'off',
    /**
     * 使用 sort 时必须传入比较函数
     * @reason 统一关闭 requires type information 的规则
     */
    '@typescript-eslint/require-array-sort-compare': 'off',
    /**
     * async 函数中必须存在 await 语句
     */
    '@typescript-eslint/require-await': 'off',
    /**
     * 使用加号时，两者必须同为数字或同为字符串
     * @reason 统一关闭 requires type information 的规则
     */
    '@typescript-eslint/restrict-plus-operands': 'off',
    /**
     * 模版字符串中的变量类型必须是字符串
     * @reason 统一关闭 requires type information 的规则
     */
    '@typescript-eslint/restrict-template-expressions': 'off',
    /**
     * async 函数必须返回 await
     * @reason 统一关闭 requires type information 的规则
     */
    '@typescript-eslint/return-await': 'off',
    /**
     * 条件判断必须传入布尔值
     * @reason 统一关闭 requires type information 的规则
     */
    '@typescript-eslint/strict-boolean-expressions': 'off',
    /**
     * 使用联合类型作为 switch 的对象时，必须包含每一个类型的 case
     * @reason 统一关闭 requires type information 的规则
     */
    '@typescript-eslint/switch-exhaustiveness-check': 'off',
    /**
     * 禁止使用三斜杠导入文件
     * @reason 三斜杠是已废弃的语法，但在类型声明文件中还是可以使用的
     */
    '@typescript-eslint/triple-slash-reference': [
      'error',
      {
        path: 'never',
        types: 'always',
        lib: 'always'
      }
    ],
    /**
     * interface 和 type 定义时必须声明成员的类型
     */
    '@typescript-eslint/typedef': [
      'error',
      {
        arrayDestructuring: false,
        arrowParameter: false,
        memberVariableDeclaration: false,
        objectDestructuring: false,
        parameter: false,
        propertyDeclaration: true,
        variableDeclaration: false
      }
    ],
    /**
     * 方法调用时需要绑定到正确的 this 上
     * @reason 统一关闭 requires type information 的规则
     */
    '@typescript-eslint/unbound-method': 'off',
    /**
     * 函数重载时，若能通过联合类型将两个函数的类型声明合为一个，则使用联合类型而不是两个函数声明
     */
    '@typescript-eslint/unified-signatures': 'error'

  }
}

