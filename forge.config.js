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
      config: {
        "setupIcon": "./build/favicon.ico",
        "setupExe": `controle-vendas-${version}.deb`
      },
    }
  ],
};