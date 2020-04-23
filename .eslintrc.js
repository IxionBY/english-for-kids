module.exports = { 
    "extends": "airbnb-base",
    "env": {
        "browser": true,
        "node": true
    },
    "rules": {
        "default-case": 0,
        "max-len": 0,
        "linebreak-style": 0,
        "global-require": 0,
        "eslint linebreak-style": [0, "error", "windows"],
        "indent": ["error", 4],
        "no-mixed-operators": [
            "error",
            {
                "groups": [
                    ["+", "-", "*", "/", "%", "**"],
                    ["&", "|", "^", "~", "<<", ">>", ">>>"],
                    ["==", "!=", "===", "!==", ">", ">=", "<", "<="],
                    ["&&", "||"],
                    ["in", "instanceof"]
                ],
                "allowSamePrecedence": true
            }
        ],
        'no-plusplus': 0,
        "import/extensions": ["error", "always", {
            "js": "never",
            "jsx": "never"
          }],
        "no-lonely-if": 0,
        "no-use-before-define": 0,
        "no-shadow": 0,
        "consistent-return": 0,
        "no-else-return": 0,
        "prefer-destructuring": ["error", {"object": false, "array": false}],
        "no-unneeded-ternary": ["error", { "defaultAssignment": true }],
        "space-before-blocks": 0,
        "no-loop-func": 0,
        "no-alert": 0,
        "func-names": 0,
        "space-before-function-paren": ["error", "always"],
        "prefer-arrow-callback": [ "error", { "allowNamedFunctions": true } ],
        "space-before-function-paren": ["error", {
            "anonymous": "always",
            "named": "always",
            "asyncArrow": "always"
        }],
        "defaultAssignment": false,
    }
};
