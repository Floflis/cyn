import { prompt } from 'enquirer';
import startPreview from '../utils/startPreview';

import Command from '../Command';

export default class extends Command {
  constructor() {
    super('preview-c3', 'Construct 3', '3');
    this.setCategory('Preview');
  }

  async run() {
    console.log('To preview your Construct 3 project in Electron, you need a valid subscription to Construct 3');
    console.log('Go to the preview menu, hit "Remote preview" and paste the link that appear here');
    const answers = await prompt([
      {
        type: 'input',
        name: 'url',
        message: 'Enter the Construct 3 preview URL: ',
        validate: (url) => {
          const regex = /https:\/\/preview\.construct\.net\/#.{8}$/;
          if (url.match(regex)) {
            return true;
          }
          return `Invalid URL: ${url}`;
        },
      },
    ]);
    await startPreview(answers.url);
  }
}