# eslint-plugin-testcafe-extended

ESLint plugin with custom rules for testcafe code linting.
This plugin will trigger on `.debug()` statements, wherever they are used in a `test`.
This plugin will trigger on `.only` statements, independent of their placement in the `fixture` or `test` command chain.

# Getting started

## Installation

First of all, you need `eslint` installed. And to install this plugin, run:

```
npm install --save-dev eslint-plugin-testcafe-extended
```

## Configuration

The example provided below is with using `.eslintrc.js` for eslint configuration, but you can also choose to use json format, or name the file specific for test, eg. `.eslintrc.test.js`. Please review eslint documentation for all configuration possibilities.

Create a `.eslintrc.js` file in the root of your project. Add the following into this file;

```
module.exports = {
  plugins: ['testcafe-extended'],
  rules: {
    'testcafe-extended/no-only-statements': ['error'],
    'testcafe-extended/no-debug-statements': ['error'],
  },
};
```

## Running

Add the following to the `scripts` section in your `package.json`.

```
"lint": "eslint ./test --ext js,ts",
```

Execute `npm run lint`

If you have a separate configuration to linting testfiles, you could add the following script

```
"lint:test": "eslint ./test --config .eslintrc.test.js --ext js,ts",
```

Execute `npm run lint:test`

Look at the eslint documentation to review all possible commandline options.

## Testing

The `no-only-statements` rule in this plugin are tested with the following occurrences;

| Command                                                                          |
| -------------------------------------------------------------------------------- |
| `` fixture.only`My Fixture`.page('url').requestHooks(hooks); ``                  |
| `` fixture`My Fixture`.only.page('url').requestHooks(hooks); ``                  |
| `fixture('My Fixture').only.page('url').requestHooks(hooks);`                    |
| `fixture.only.page('url').requestHooks(hooks)('My Fixture');`                    |
| `` fixture`My Fixture`.page('url').only.requestHooks(hooks); ``                  |
| `` fixture`My Fixture`.page('url').requestHooks(hooks).only; ``                  |
| -------------------------------------------------------------------------------- |
| `test.only('My Test', async t => {});`                                           |
| `test.requestHooks(hooks).only('My Test', async t => {});`                       |
| `test.requestHooks(hooks).before(async t => {}).only('My Test', async t => {});` |

The `no-debug-statements` rule is tested by placing the `.debug()` statement on multiple locations, like in a _before_ method or somewhere in the _TestController_ chain and checking if the rule triggered.

## Author

Stefan Schenk

## Update history

| Version | Description                                                         |
| ------- | ------------------------------------------------------------------- |
| 0.1.0   | Initial release with `no-only-statements` and `no-debug-statements` |
