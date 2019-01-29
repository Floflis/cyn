import '@babel/polyfill';
import chalk from 'chalk';
import checkForUpdate from './updateCheck';
import isDev from './isDev';
import { showMenu } from './actions';
import { version } from '../package.json';

if (isDev) {
  console.log('Running in developement mode');
} else {
  console.log(`
  ___ _        _                       
 | __| |___ __| |_ _ _ ___ _ _         
 | _|| / -_) _|  _| '_/ _ \\ ' \\        
 |___|_\\___\\__|\\__|_| \\___/_||_|       
      / _|___ _ _                      
     |  _/ _ \\ '_|                     
   __|_| \\___/_|   _               _   
  / __|___ _ _  __| |_ _ _ _  _ __| |_ 
 | (__/ _ \\ ' \\(_-<  _| '_| || / _|  _|
  \\___\\___/_||_/__/\\__|_|  \\_,_\\__|\\__|


`);
}

checkForUpdate()
  .then((update) => {
    if (update) {
      console.log(`
  ${chalk.redBright('You are using an outdated version of this tool')}
      
  The latest version is ${chalk.yellow.bold.underline(update.version)} (> ${version}).
  Update using ${chalk.reset.bold.underline(`npm i -g ${update.name}`)}
  
  `);
    }

    showMenu();
  })
  .catch((e) => {
    console.error(
      `Failed to check for updates: ${e}`,
    );
  });
