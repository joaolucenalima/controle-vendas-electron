import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const renameGeneratedExe = async () => {
  const basePath = path.resolve(__dirname, '../../out/make/squirrel.windows');
  const archs = fs.readdirSync(basePath);

  for (const arch of archs) {
    const archPath = path.join(basePath, arch);
    if (fs.statSync(archPath).isDirectory()) {
      const files = fs.readdirSync(archPath);
      const exeFile = files.find(file => file.startsWith('controle-vendas-') && file.endsWith('.exe'));

      if (exeFile) {
        const versionMatch = exeFile.match(/controle-vendas-(.+)\.exe/);
        if (versionMatch && versionMatch[1]) {
          const versionNumber = versionMatch[1];
          const newFileName = `controle-vendas-${versionNumber}-${arch}.exe`;
          const oldFilePath = path.join(archPath, exeFile);
          const newFilePath = path.join(archPath, newFileName);

          fs.renameSync(oldFilePath, newFilePath);
          console.log(`Renamed: ${exeFile} -> ${newFileName}`);
        }
      }
    }
  }
};

renameGeneratedExe().catch(err => {
  console.error('Error renaming files:', err);
});