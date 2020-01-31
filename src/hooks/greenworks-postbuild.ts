import Hook from '../classes/hook';

const GWHook = class extends Hook {
  description = 'Run on the post build step';

  hookName = 'post-build';

  name = 'onPostBuild';

  run = (args: unknown) => Promise.resolve(true);
};

export default new GWHook();
