import { createScopedLogger } from '../../utils/console';
import Task from '../../classes/task';

export default {
  description: 'Package your app',
  name: 'electron/package',
  config: {
    // electronVersion: '8.0.0',
    dir: process.cwd(),
    asar: true,
    // icon: path.join(process.cwd(), 'build', 'icon'),
    out: 'dist',
    overwrite: true,
    extraResource: [],
    ignore: [
      /preview*/,
      /node_modules\/greenworks/,
      /node_modules\/app-builder-bin/,
      /node_modules\/app-builder-lib/,
    ],
    win32metadata: {},
  },
  run: function run({ workingDirectory, taskSettings }) {
    const logger = createScopedLogger('package');

    const buildSettings: any = taskSettings as any;

    return {
      sources: [],
    };
  },
} as Task;
