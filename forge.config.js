const { version } = require("./package.json")

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
        "setupExe": `controle-estoque-${version}.exe`,
      },
    },
    {
      name: '@electron-forge/maker-flatpak',
      config: {
        options: {
          name: 'controle-estoque-${version}',
          icon: "./build/favicon.ico",
        },
      },
    },
  ],
  publishers: [
    {
      name: "@electron-forge/publisher-github",
      config: {
        repository: {
          owner: "joaolucenalima",
          name: "controle-estoque-electron"
        },
        prerelease: false,
        draft: true
      }
    }
  ],
};