const fs = require('fs');
const tmp = require('tmp');
const path = require('path');
const shelljs = require('shelljs');
const install = require('install-packages');

/**
 * Prepare a sandboxed environment in tmp
 * @param settings
 * @returns {Promise<string>}
 */
module.exports = async (settings) => {
  const { electron } = settings;

  // create temporary directory
  tmp.setGracefulCleanup();
  const tmpDir = tmp.dirSync({
    prefix: 'efc_',
    unsafeCleanup: true,
  });

  console.log(tmpDir.name);

  // copy local files from template to tmpdir
  shelljs.cp(path.join(__dirname, '../../', 'template', 'main.js'), tmpDir.name);
  shelljs.cp(path.join(__dirname, '../../', 'template', 'preload.js'), tmpDir.name);
  shelljs.cp(path.join(__dirname, '../../', 'template', 'package.json'), tmpDir.name);

  // TODO add ignored files/folder (build, )
  // copy app/* to root of temp dir
  shelljs.cp('-R', path.join(process.cwd(), 'app', '*'), tmpDir.name);

  if (fs.existsSync(path.join(process.cwd(), 'greenworks'))) {
    shelljs.cp('-R', path.join(process.cwd(), 'greenworks'), path.join(tmpDir.name, 'greenworks'));
  }

  shelljs.cp(path.join(process.cwd(), 'config.js'), tmpDir.name);

  // editing package.json
  const pkg = fs.readFileSync(path.join(tmpDir.name, 'package.json'));
  const pkgJson = JSON.parse(pkg);
  pkgJson.devDependencies.electron = electron;
  pkgJson.name = settings.project.name;
  pkgJson.version = settings.project.version;
  fs.writeFileSync(path.join(tmpDir.name, 'package.json'), JSON.stringify(pkgJson, null, '\t'), 'utf8');

  await install({
    cwd: tmpDir.name,
  });

  return tmpDir.name;
};
