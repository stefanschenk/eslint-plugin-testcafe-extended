const chalk = require('chalk');

function getObjectName(node) {
  let iterations = 0;
  let objectName = null;
  let nodeObject = node.object;

  while (objectName === null) {
    if (nodeObject.type === 'Identifier') {
      objectName = nodeObject.name;
    }

    if (nodeObject.type === 'TaggedTemplateExpression') {
      objectName = nodeObject.tag.name;
    }

    if (nodeObject.type === 'CallExpression') {
      iterations += 1;

      if (nodeObject.callee.object === undefined) {
        nodeObject = nodeObject.callee;
      } else {
        nodeObject = nodeObject.callee.object;
      }
    }
  }

  return { identifier: objectName, iterations };
}

module.exports = {
  rules: {
    'no-debug-statements': {
      create: function(context) {
        return {
          CallExpression(node) {
            const calleeProperty = node.callee.property || { type: null, name: null };
            if (calleeProperty.type === 'Identifier' && calleeProperty.name === 'debug') {
              context.report({
                node: node,
                message: `${chalk.italic('TestController')}${chalk.bold.yellow(
                  '.debug()',
                )} is restricted from being used other than during development`,
              });
            }
          },
        };
      },
    },
    'no-only-statements': {
      create: function(context) {
        return {
          MemberExpression(node) {
            const nodeProperty = node.property || { type: null, name: null };
            if (nodeProperty.type === 'Identifier' && nodeProperty.name === 'only') {
              if (node.object !== undefined) {
                const objectName = getObjectName(node);

                context.report({
                  node: node,
                  message: `${chalk.bold.white('{{ identifier }}')}${chalk.bold.yellow(
                    '.only',
                  )} is restricted from being used other than during development`,
                  data: {
                    identifier: objectName.identifier,
                    iterations: objectName.iterations,
                  },
                });
              }
            }
          },
        };
      },
    },
  },
};
