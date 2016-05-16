#!/usr/bin/env node

var chalk = require('chalk');
var request = require('superagent');

var results = 75;

request
  .get('https://www.reddit.com/r/showerthoughts.json')
  .query({ limit: results })
  .set('User-Agent', 'shower-thoughts-cli')
  .end(function(err, res) {
    if (!err && res.ok) {
      var random = randomIntFromInterval(2,results);
      var showerthought = res.body.data.children[random].data.title;
      console.log(chalk.cyan('🚿 ' + showerthought + ' 🚿'));
      process.exit(0);
    }

    console.error(err ? chalk.red(err) : chalk.red(res.text));
    process.exit(1);

  });

function randomIntFromInterval(min,max)
{
  return Math.floor(Math.random()*(max-min+1)+min);
}
