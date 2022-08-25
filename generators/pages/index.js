/* eslint-disable */
const { pushFiles } = require("../utils/generator");
const textTransform = require("../utils/textTransform");

module.exports = {
  description: "Generate a Page",
  prompts: [
    {
      type: "input",
      name: "pageName",
      message: "Page Name",
      validate: (value) => {
        if (!value) return "Value is required";
        return true;
      },
    },
  ],

  actions: (data) => {
    const { pageName } = data;

    const pathTemplate = "./pages/templates";
    const pagePath = "../src/pages/{{pageName}}Page";

    const files = () => {
      const arrayFiles = [];

      arrayFiles.push(pushFiles(pagePath, "index.ts", "index.hbs"));
      arrayFiles.push(pushFiles(pagePath, "styles.ts", "styles.hbs"));
      arrayFiles.push(pushFiles(pagePath, "{{pageName}}Page.tsx", "page.hbs"));

      return arrayFiles;
    };

    // Create Files
    const action = [];

    files().forEach((file) => {
      const createFile = {
        type: "add",
        path: `${file.path}/${file.name}`,
        data: file.data,
        templateFile: `${pathTemplate}/${file.template}`,
        force: true,
      };

      action.push(createFile);
    });

    // Message
    const message = () => `Component {{ pascalCase name }} created`;
    action.push(message);

    return action;
  },
};
