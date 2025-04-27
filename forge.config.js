const { version } = require("./package.json");

const args = process.argv.slice(2);
const params = {};

args.forEach(arg => {
  const [key, value] = arg.split('=');
  if (key.startsWith('--')) {
    params[key.slice(2)] = value || true;
  }
});

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
        "setupExe": `controle-vendas-${version}-${params.arch}.exe`
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