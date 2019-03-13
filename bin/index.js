#!/usr/bin/env node

process.env.NODE_PATH = __dirname + '/../node_modules/';

const program = require('commander');
const init = require('../commands/init')

program
  .version(require('../package').version);

program
  .usage('<command>');

program.command('init')
  .description('create a new project')
  .alias('i')
  .action(init);

program.parse(process.argv);

if(!program.args.length){
  program.help()
}