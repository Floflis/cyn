const install = require('install-packages');

module.exports = async (settings) => {
  await install();

  if (settings.dependencies.length > 0) {
    console.log(`Restoring packages: ${settings.dependencies.join(', ')}`);
    await install({
      packages: settings.dependencies,
      saveDev: false,
    });
  }
};
