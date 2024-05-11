import chalk from 'chalk';
import { appendFileSync } from 'fs';

const outputFolderName = "AutoCommitGitLog";

const INFO = 'INFO'
const ERROR = 'ERROR'
const WARNING = 'WARNING'

Date.prototype.format = function(fmt){
    var o = {
      "M+" : this.getMonth()+1,                 //月份
      "d+" : this.getDate(),                    //日
      "h+" : this.getHours(),                   //小时
      "m+" : this.getMinutes(),                 //分
      "s+" : this.getSeconds(),                 //秒
      "q+" : Math.floor((this.getMonth()+3)/3), //季度
      "S"  : this.getMilliseconds()             //毫秒
    };
  
    if(/(y+)/.test(fmt)){
      fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
          
    for(var k in o){
      if(new RegExp("("+ k +")").test(fmt)){
        fmt = fmt.replace(
          RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));  
      }       
    }
  
    return fmt;
  }

/**
 * 
 * @param {Date} date Date格式的时间
 * @param {string} importance 
 * @param {string} message 
 */
function log(date,importance,message){
    console.log(`[${date.format("yyyy-MM-dd hh:mm:ss")}] [${importance}] [${message}]`)
    appendFileSync(`../${outputFolderName}.log`, `[${date.format("yyyy-MM-dd hh:mm:ss")}] [${importance}] [${message}]` + '\n')
}

function curry(func,...args){
    return function(...innerArgs){
        const allArgs = [...args,...innerArgs]
        if(allArgs.length >= func.length){
            return func(...allArgs)
        }else{
            return curry(func,...allArgs)
        }
    }
}

const logCurry = curry(log,new Date())

const infoLog = logCurry(INFO)
const errorLog = logCurry(chalk.red(ERROR))
const warningLog = logCurry(chalk.yellow(WARNING))

export {infoLog,errorLog,warningLog}