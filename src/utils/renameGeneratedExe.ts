import * as fs from 'fs';
import * as path from 'path';

type Config = {
  fileExtension: string,
  outPath: string
}

const renameGeneratedExe = async (configs: Config) => {
  const basePath = path.resolve(process.cwd(), configs.outPath);
  const archs = fs.readdirSync(basePath);

  for (const arch of archs) {
    const archPath = path.join(basePath, arch);
    if (fs.statSync(archPath).isDirectory()) {
      const files = fs.readdirSync(archPath);
      const exeFile = files.find(file => file.startsWith('controle-vendas-') && file.endsWith(configs.fileExtension));

      if (exeFile) {
        const versionMatch = exeFile.match(new RegExp(`controle-vendas-(.+)\\${configs.fileExtension}`));
        if (versionMatch && versionMatch[1]) {
          const versionNumber = versionMatch[1];
          const newFileName = `controle-vendas-${versionNumber}-${arch}${configs.fileExtension}`;
          const oldFilePath = path.join(archPath, exeFile);
          const newFilePath = path.join(archPath, newFileName);

          fs.renameSync(oldFilePath, newFilePath);
          console.log(`Renamed: ${exeFile} -> ${newFileName}`);
        }
      }
    }
  }
};

const linuxConfigs = {
  fileExtension: ".deb",
  outPath: "out/make/deb"
}

const windowsConfigs = {
  fileExtension: ".exe",
  outPath: "out/make/squirrel.windows"
}

renameGeneratedExe(windowsConfigs).catch(() => {
  console.error("Error renaming windows files!");
});

renameGeneratedExe(linuxConfigs).catch(() => {
  console.error("Error renaming Linux files!");
});