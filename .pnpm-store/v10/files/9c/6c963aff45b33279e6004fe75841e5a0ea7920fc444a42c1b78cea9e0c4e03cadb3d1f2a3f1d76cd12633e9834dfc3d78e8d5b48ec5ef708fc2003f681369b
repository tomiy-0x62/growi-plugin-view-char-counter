# eslint-config-weseek

[![npm version](https://badge.fury.io/js/eslint-config-weseek.svg)](http://badge.fury.io/js/eslint-config-weseek)

Shareable configurations of ESLint by WESEEK, Inc. based on [eslint-config-airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb).

## Usage

### Basics

http://eslint.org/docs/user-guide/configuring#using-the-configuration-from-a-plugin

We export following ESLint configurations for your usage.

### Entry Points

* `weseek` - Our default ESLint rules based on [airbnb-base](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base).
    * **Requirements**
        * `@babel/core`
        * `@babel/eslint-parser`
        * `eslint-plugin-import`
    * Usage:
        ```bash
        yarn add -D eslint-config-weseek @babel/core @babel/eslint-parser eslint-plugin-import
        ```
        ```
        extends: [
          'weseek',
        ],
        ```
* `weseek/react` - An additional rule sets which are based on [airbnb/rules/react](https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb/rules/react.js).
    * **Requirements**
        * Requirements list of `weseek` endpoint
        * `eslint-plugin-react`
        * `eslint-plugin-react-hooks`
    * Usage:
        ```bash
        yarn add -D eslint-config-weseek @babel/core @babel/eslint-parser eslint-plugin-import eslint-plugin-react eslint-plugin-react-hooks
        ```
        ```
        extends: [
          'weseek',
          'weseek/react',
        ],
        ```
* `weseek/typescript` - An additional rule sets for TypeScript.
    * **Requirements**:
        * Requirements list of `weseek` endpoint except for `@babel/core` and `@babel/eslint-parser`
        * `eslint-import-resolver-typescript`
        * `@typescript-eslint/eslint-plugin`
        * `@typescript-eslint/parser`
    * Usage:
        ```bash
        yarn add -D eslint-config-weseek eslint-plugin-import eslint-import-resolver-typescript @typescript-eslint/eslint-plugin @typescript-eslint/parser
        ```
        ```
        extends: [
          'weseek',
          'weseek/typescript',
        ],
        ```
* `weseek/typescript-next` - An additional rule sets for Next.js. This includes both of `weseek/react` and `weseek/typescript`
    * **Requirements**:
        * Requirements lists of `weseek`, `weseek/react` and `weseek/typescript` endpoint except for `@babel/core` and `@babel/eslint-parser`
    * Usage:
        ```bash
        yarn add -D eslint-config-weseek eslint-plugin-import eslint-plugin-react eslint-plugin-react-hooks eslint-import-resolver-typescript @typescript-eslint/eslint-plugin @typescript-eslint/parser
        ```
        ```
        extends: [
          'weseek',
          'weseek/typescript-next',
        ],
        ```
