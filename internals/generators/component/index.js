/**
 * Component Generator
 */

/* eslint strict: ["off"] */

'use strict';

const componentExists = require('../utils/componentExists');

module.exports = {
  description: 'Add an unconnected component',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'Button',
      validate: value => {
        if (/.+/.test(value)) {
          return componentExists(value)
            ? 'A component or container with this name already exists'
            : true;
        }

        return 'The name is required';
      },
    },
    {
      type: 'confirm',
      name: 'memo',
      default: false,
      message: 'Do you want to wrap your component in React.memo?',
    },
    {
      type: 'confirm',
      name: 'wantMessages',
      default: true,
      message: 'Do you want i18n messages (i.e. will this component use text)?',
    },
    {
      type: 'confirm',
      name: 'wantLoadable',
      default: false,
      message: 'Do you want to load the component asynchronously?',
    },
    {
      type: 'confirm',
      name: 'wantStyling',
      default: false,
      message: 'Do you want to add the styling?',
    },
    {
      type: 'confirm',
      name: 'wantHelper',
      default: false,
      message: 'Do you want to add the helper function?',
    },
  ],
  actions: data => {
    // Generate index.js and index.test.js
    const actions = [
      {
        type: 'add',
        path: '../../app/components/{{properCase name}}/index.js',
        templateFile: './component/index.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../../app/components/{{properCase name}}/tests/index.test.js',
        templateFile: './component/test.js.hbs',
        abortOnFail: true,
      },
    ];

    // If the user wants i18n messages
    if (data.wantMessages) {
      actions.push({
        type: 'add',
        path: '../../app/components/{{properCase name}}/messages.js',
        templateFile: './component/messages.js.hbs',
        abortOnFail: true,
      });
    }

    // If the user wants Loadable.js to load the component asynchronously
    if (data.wantLoadable) {
      actions.push({
        type: 'add',
        path: '../../app/components/{{properCase name}}/Loadable.js',
        templateFile: './component/loadable.js.hbs',
        abortOnFail: true,
      });
    }

    // If the user wants styles
    if (data.wantStyling) {
      actions.push({
        type: 'add',
        path: '../../app/components/{{properCase name}}/index.scss',
        templateFile: './component/index.scss.hbs',
        abortOnFail: true,
      });
      actions.push({
        type: 'add',
        path: '../../app/components/{{properCase name}}/css/_default.scss',
        templateFile: './component/css/_default.scss.hbs',
        abortOnFail: true,
      });
      actions.push({
        type: 'add',
        path: '../../app/components/{{properCase name}}/css/_small.scss',
        templateFile: './component/css/_small.scss.hbs',
        abortOnFail: true,
      });
      actions.push({
        type: 'add',
        path: '../../app/components/{{properCase name}}/css/_medium.scss',
        templateFile: './component/css/_medium.scss.hbs',
        abortOnFail: true,
      });
      actions.push({
        type: 'add',
        path: '../../app/components/{{properCase name}}/css/_large.scss',
        templateFile: './component/css/_large.scss.hbs',
        abortOnFail: true,
      });
      actions.push({
        type: 'add',
        path: '../../app/components/{{properCase name}}/css/_xlarge.scss',
        templateFile: './component/css/_xlarge.scss.hbs',
        abortOnFail: true,
      });
    }

    // If the user wants Loadable.js to load the component asynchronously
    if (data.wantHelper) {
      actions.push({
        type: 'add',
        path: '../../app/components/{{properCase name}}/_helper.js',
        templateFile: './component/_helper.js.hbs',
        abortOnFail: true,
      });
      actions.push({
        type: 'add',
        path: '../../app/components/{{properCase name}}/tests/_helper.test.js',
        templateFile: './component/_helper.test.js.hbs',
        abortOnFail: true,
      });
    }

    actions.push({
      type: 'prettify',
      path: '/components/',
    });

    return actions;
  },
};
