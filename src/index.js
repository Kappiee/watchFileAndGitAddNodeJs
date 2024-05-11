import { existsSync,watch } from 'fs';
import { execSync } from 'child_process';
import { resolve } from 'path';
import { errorLog,infoLog,warningLog } from './utils/logHelper.js';
import chalk from 'chalk';
// infoLog(chalk.green('****************************************************'));
// infoLog(chalk.green('Watching for changes in the folder: Start'));
// 要监视的文件夹路径
const folderToWatch = "./public/watchedDir";

infoLog('Watching for changes in the folder:'+ resolve(folderToWatch));

// // 检查是否有 Git 仓库
if (!existsSync(resolve(folderToWatch, '.git'))) {
    warningLog('The folder is not a Git repository.');
    //初始化仓库
    infoLog('Initializing Git repository...');
    execSync('git init', { cwd: folderToWatch });
    infoLog('Git repository initialized!');
}

function executeCommand(command, folder) {
  try {
    execSync(command, { cwd: folder });
  } catch (error) {
    throw new Error(`${command}" ,ErrorMessage: ${error.message}`);
  }
}

//防抖 1秒内只执行一次
let timeoutId = null;

watch(folderToWatch, { recursive: true }, (eventType, filename) => {
  if ( !filename||filename.startsWith('.git') || filename.startsWith('.gitignore')){
    return;
  }

  clearTimeout(timeoutId);

  timeoutId = setTimeout(() => {
    infoLog(`File ${filename} has been ${eventType}`);
    
    // 提交到 Git
    try {
      executeCommand('git add .', folderToWatch);
      executeCommand(`git commit -m "[Auto commit] : File ${filename} has been ${eventType}"`, folderToWatch);
      infoLog('Changes committed to Git.');
    } catch (error) {
      errorLog('committing changes to Git: ' + error);
    }
  }, 1000); // 延迟1秒执行
});

// infoLog(chalk.green('Watching for changes in the folder: End'));
// infoLog(chalk.green('****************************************************'));