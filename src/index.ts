// const {program} = require('commander')
import colors from 'colors'
import commander from 'commander'
//  from 'commander'
commander
  .version("5.1.0")
  .option("-p, --peppers", "Add peppers")
  .option("-P, --pineapple", "Add pineapple")
  .option("-b, --bbq-sauce", "Add bbq sauce")
  .option("-c, --cheese [type]", "Add the specified type of cheese [marble]", "marble")
  .option("-c, --city [name]", "Add city name")
  .parse(process.argv);
if( !commander.city) {
  commander.outputHelp(colors.red);
} else {
  // tslint:disable-next-line: no-console
  console.log(commander.city);
  process.exit();
}
