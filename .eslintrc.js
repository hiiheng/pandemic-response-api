module.exports = {
  root: true,
  env: {
    "browser": false,
    "node": true,
    "es6": true
  },
  parserOptions: {
    "ecmaVersion": 2017
  },
  rules: {
    semi: 'always',
    // https://gist.github.com/nkbt/9efd4facb391edbf8048
    //
    // Best Practices
    //
    // These are rules designed to prevent you from making mistakes.
    // They either prescribe a better way of doing something or help you avoid footguns.
    //
    "block-scoped-var": 0, // treat var statements as if they were block scoped (off by default). 0: deep destructuring is not compatible https://github.com/eslint/eslint/issues/1863
    "complexity": 0, // specify the maximum cyclomatic complexity allowed in a program (off by default)
    "consistent-return": 2, // require return statements to either always or never specify values
    "curly": 2, // specify curly brace conventions for all control statements
    "default-case": 2, // require default case in switch statements (off by default)
    "dot-notation": 2, // encourages use of dot notation whenever possible
    "eqeqeq": 2, // require the use of === and !==
    "guard-for-in": 2, // make sure for-in loops have an if statement (off by default)
    "no-alert": 2, // disallow the use of alert, confirm, and prompt
    "no-caller": 2, // disallow use of arguments.caller or arguments.callee
    "no-div-regex": 2, // disallow division operators explicitly at beginning of regular expression (off by default)
    "no-else-return": 2, // disallow else after a return in an if (off by default)
    "no-empty-label": 2, // disallow use of labels for anything other then loops and switches
    "no-eq-null": 2, // disallow comparisons to null without a type-checking operator (off by default)
    "no-eval": 2, // disallow use of eval()
    "no-extend-native": 2, // disallow adding to native types
    "no-extra-bind": 2, // disallow unnecessary function binding
    "no-fallthrough": 2, // disallow fallthrough of case statements
    "no-floating-decimal": 2, // disallow the use of leading or trailing decimal points in numeric literals (off by default)
    "no-implied-eval": 2, // disallow use of eval()-like methods
    "no-iterator": 2, // disallow usage of __iterator__ property
    "no-labels": 2, // disallow use of labeled statements
    "no-lone-blocks": 2, // disallow unnecessary nested blocks
    "no-loop-func": 2, // disallow creation of functions within loops
    "no-multi-spaces": 2, // disallow use of multiple spaces
    "no-multi-str": 2, // disallow use of multiline strings
    "no-native-reassign": 2, // disallow reassignments of native objects
    "no-new": 2, // disallow use of new operator when not part of the assignment or comparison
    "no-new-func": 2, // disallow use of new operator for Function object
    "no-new-wrappers": 2, // disallows creating new instances of String,Number, and Boolean
    "no-octal": 2, // disallow use of octal literals
    "no-octal-escape": 2, // disallow use of octal escape sequences in string literals, such as var foo = "Copyright \251";
    "no-param-reassign": 2, // disallow reassignment of function parameters (off by default)
    "no-process-env": 2, // disallow use of process.env (off by default)
    "no-proto": 2, // disallow usage of __proto__ property
    "no-redeclare": 2, // disallow declaring the same variable more then once
    "no-return-assign": 2, // disallow use of assignment in return statement
    "no-script-url": 2, // disallow use of javascript: urls.
    "no-self-compare": 2, // disallow comparisons where both sides are exactly the same (off by default)
    "no-sequences": 2, // disallow use of comma operator
    "no-throw-literal": 2, // restrict what can be thrown as an exception (off by default)
    "no-unused-expressions": 2, // disallow usage of expressions in statement position
    "no-void": 2, // disallow use of void operator (off by default)
    "no-warning-comments": [0, {"terms": ["todo", "fixme"], "location": "start"}], // disallow usage of configurable warning terms in comments": 2, // e.g. TODO or FIXME (off by default)
    "no-with": 2, // disallow use of the with statement
    "radix": 2, // require use of the second argument for parseInt() (off by default)
    "vars-on-top": 2, // requires to declare all vars on top of their containing scope (off by default)
    "wrap-iife": 2, // require immediate function invocation to be wrapped in parentheses (off by default)
    "yoda": 2, // require or disallow Yoda conditions
  }
};
