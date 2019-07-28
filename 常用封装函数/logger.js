let fs = require('fs');
let dateParse = require('./formatdate');
/**
 * append mode
 * set encoding
 */
let options = {
  flags: 'a',
  encoding: 'utf8'
};

let loggerOut = fs.createWriteStream('../logger_log/logger_out.log', options);
let loggerErr = fs.createWriteStream('../logger_log/logger_err.log', options);

//create logger
let logger = new console.Console(loggerOut, loggerErr);

Date.prototype.format = dateParse.parseTimeMs;

module.exports = {
  log(info){
    let time = new Date().format('yyyy-MM-dd HH:mm:ss.fff');
    console.log(info);
    logger.log(`[${time}] - ${JSON.stringify(info)}`);
  },
  err(info){
    let time = new Date().format('yyyy-MM-dd HH:mm:ss.fff');
    console.log(info);
    logger.error(`[${time}] - ${JSON.stringify(info)}`);
  }
}