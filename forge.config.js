import { version } from "./package.json";

export const packagerConfig = {
  icon: './build/icon',
  ignore: [
    "\\.git",
    "\\.ts",
    "\\.tsx",
  ]
};
export const rebuildConfig = {};
export const makers = [
  {
    name: '@electron-forge/maker-squirrel',
    config: {
      "setupIcon": "./build/icon.ico",
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
];
export const publishers = [
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
];
