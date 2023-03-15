module.exports = {
  packagerConfig: {
    icon: './build/icon',
    ignore: [
      "\\.git",
    ]
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        "setupIcon": "./build/icon.ico",
        "setupExe": "controle-de-estoque.exe",
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
