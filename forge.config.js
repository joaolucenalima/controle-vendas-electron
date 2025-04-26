const { version } = require("./package.json");

module.exports = {
  packagerConfig: {
    icon: './build/favicon',
    ignore: [
      "\\.git",
      "\\.ts",
      "\\.tsx",
    ]
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        "setupIcon": "./build/favicon.ico",
        "setupExe": `controle-vendas-${version}.exe`
      },
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    }
  ],
  publishers: [
    {
      name: "@electron-forge/publisher-github",
      config: {
        repository: {
          owner: "joaolucenalima",
          name: "controle-vendas-electron"
        },
        prerelease: false,
        draft: true
      }
    }
  ],
};