/* eslint-disable */
const textTransform = require('../utils/textTransform')

module.exports = {
  description: 'Generate a Component',
  prompts: [
    {
      type: 'list',
      name: 'type',
      message: 'Select a component type',
      choices: () => [
        { name: 'Boson', value: 'bosons' },
        { name: 'Atom', value: 'atoms' },
        { name: 'Molecule', value: 'molecules' },
        { name: 'Organism', value: 'organisms' },
        { name: 'Template', value: 'templates' },
        { name: 'Page', value: 'page' },
      ]
    },

    {
      type: 'input',
      name: 'name',
      message: 'Component Name',
      validate: (value) => {
        if (!value) return 'Value is required'

        return true
      }
    },

    {
      type: 'confirm',
      name: 'createTest',
      message: 'Generate Spec?',
      default: false
    },

    {
      type: 'confirm',
      name: 'createSB',
      message: 'Generate StoryBook?',
      default: false
    },
  ],

  actions: (data) => {
    const name = data.name
    const atomic = data.type
    const test = data.createTest
    const storyBook = data.createSB

    const pathTemplate = './components/templates'
    const componentPath = `../src/components/${atomic}/{{ pascalCase name }}`
    const pagePath = `../src/pages/{{ camelCase name }}`
    const props = atomic === 'templates' ? `${textTransform.capitalize(name)}TemplateProps` : `${textTransform.capitalize(name)}Props`

    console.log(pagePath)

    const files = () => {
      const arrayFiles = []

      if(atomic === 'page') {
        arrayFiles.push({
          data: { name, props },
          path: `${pagePath}`,
          name: 'index.tsx',
          template: 'page.hbs',
          force: false
        })
      } else {
        arrayFiles.push({
          data: { props },
          path: `${componentPath}`,
          name: 'index.tsx',
          template: atomic === 'templates' ? 'template.hbs' : 'index.hbs',
          force: false
        })

        arrayFiles.push({
          data: {},
          path: `${componentPath}`,
          name: 'styles.ts',
          template: 'styles.hbs',
          force: false
        })

        if(storyBook) {
          arrayFiles.push({
            data: { atomic, props },
            path: `${componentPath}`,
            name: 'stories.tsx',
            template: 'stories.hbs',
            force: false
          })
        }

        if(test) {
          arrayFiles.push({
            data: { props },
            path: `${componentPath}`,
            name: 'test.tsx',
            template: 'test.hbs',
            force: false
          })

          arrayFiles.push({
            data: {},
            path: `${componentPath}`,
            name: 'mock.ts',
            template: 'mock.hbs',
            force: false
          })
        }
      }

      return arrayFiles
    }

    // Create Files
    const action = []

    files().forEach((file) => {
      const createFile = {
        type: 'add',
        path: `${file.path}/${file.name}`,
        data: file.data,
        templateFile: `${pathTemplate}/${file.template}`,
        // force: !!file.force
        force: true
      }

      action.push(createFile)
    })

    // Message
    const message = () => `Component {{ pascalCase name }} created`
    action.push(message)

    return action
  }
}
