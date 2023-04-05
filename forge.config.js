const { version } = require("./package.json")

module.exports = {
  packagerConfig: {
    icon: './build/icone-removebg',
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
        "setupIcon": "./build/icone-removebg.png",
        "setupExe": `controle-estoque-${version}.exe`,
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
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