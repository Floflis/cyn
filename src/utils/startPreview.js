const { exec } = require('child_process');
const path = require('path');
const os = require('os');
const logger = require('../utils/console').normal('system');

module.exports = (url, tmpDir) => new Promise(async (resolve) => {
  logger.info(`Starting preview ${url ? `on "${url}"` : ''}`);

  process.chdir(tmpDir);

  const rootPath = path.join(tmpDir, 'node_modules', 'electron', 'dist');

  let electron;
  switch (os.platform()) {
    case 'darwin':
      electron = path.join(rootPath, 'Electron.app', 'Contents', 'MacOS', 'Electron');
      break;

    case 'win32':
      electron = path.join(rootPath, 'electron.exe');
      break;

    case 'linux':
      electron = path.join(rootPath, 'electron');
      break;

    default:
      throw new Error('Unsupported OS');
  }

  const command = `${electron} ${tmpDir} ${url}`;

  const npmstart = exec(command);

  npmstart.stdout.on('data', (data) => {
    logger.info(data.toString());
  });

  npmstart.stderr.on('data', (data) => {
    logger.error(`Error: ${data.toString()}`);
  });

  npmstart.on('exit', (code) => {
    logger.info(`Electron exited: ${code.toString()}`);
    resolve(true);
  });
});
