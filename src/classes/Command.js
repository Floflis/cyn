const chalk = require('chalk');
const deepmerge = require('deepmerge');

/**
 * @type {module.Command}
 */
module.exports = class Command {
  /**
   * @param {string} id
   * @param {string} name
   * @param {string} shortcut
   */
  constructor(id, name, shortcut) {
    this.name = name;
    this.id = id;
    this.shortcut = shortcut;

    if (this.shortcut) {
      const index = this.name.toLowerCase().indexOf(this.shortcut);
      if (index !== -1) {
        this.name = this.name.replace(new RegExp(this.name[index], 'igm'), `${chalk.underline('$&')}`);
      }
    }

    this.category = 'Other';
    this.config = {};
    this.defaultConfiguration = {};

    /** @type {Array<Command>} */
    this.modules = [];
  }

  /**
   * Hook executed before the build task
   * @abstract
   */
  onPreBuild() {
    // :)
  }

  /**
   * Hook executed after the build task
   * @abstract
   */
  onPostBuild() {
    // :)
  }

  /**
   * Set the category of the plugin
   * @param {string} category
   */
  setCategory(category) {
    this.category = category;
  }

  /**
   * Set the configuration context for the plugin
   * @param config
   */
  setConfig(config) {
    this.config = config;
  }

  /**
   * Set loaded modules
   * @param modules
   */
  setModules(modules) {
    this.modules = modules;
  }

  /**
   * Set default command Configuration
   * @param config
   * @abstract
   */
  setDefaultConfiguration(config) {
    this.defaultConfiguration = config;
  }

  isVisible() {
    return this.config.isReady && this.config.isElectron;
  }

  /**
   * @abstract
   */
  onLoad() {
    // do nothing
  }

  get settings() {
    const { mixed } = this.config;
    return mixed;
  }

  /**
   * Used to determine if the class is valid when loading getCommands
   * @returns {boolean}
   * @abstract
   */
  isValid() {
    return true;
  }

  /**
   * @abstract
   * @returns {Promise<void>}
   */
  async run() {
    // :)
  }
};
