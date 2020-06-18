import * as path from 'path';
import fs from 'fs-extra';
import glob from 'glob';
import Terser from 'terser';
import slash from 'slash';
import { hookRunResult } from '../models/index';
import { createScopedLogger } from '../utils/console';
import Hook from '../classes/hook';

interface Config {
  files: string[];
}

const config: Config = {
  files: [],
};

export default {
  description: 'Minify source files',
  name: 'minify',
  config,
  run: function run({ workingDirectory, hookSettings }): hookRunResult {
    const logger = createScopedLogger('minify', {
      interactive: true,
    });

    const { files: patterns } = hookSettings as Config;

    logger.info('Minifying...');

    let minified = 0;

    const files: string[] = [];
    patterns.forEach((pattern) => {
      const matchedFiles = glob.sync(pattern, {
        cwd: slash(workingDirectory),
        nodir: true,
      });
      files.push(...matchedFiles.map((file) => path.resolve(workingDirectory, file)));
    });

    files.forEach((file: string) => {
      try {
        const fileContent = fs.readFileSync(file, 'utf8');

        const { code, error } = Terser.minify(fileContent, {
          toplevel: true,
          compress: true,
        });
        if (error) {
          throw error;
        }
        if (!code) {
          throw new Error('Empty code');
        }

        fs.writeFileSync(file, code, 'utf8');
        minified += 1;
        logger.await(`Minified ${file}`);
        return true;
      } catch (e) {
        logger.error(`Failed minifying ${file}`);
        return false;
      }
      return true;
    });

    logger.success(`Successfully minified ${minified} files!`);

    return {
      sources: [workingDirectory],
    };
  },
} as Hook;
