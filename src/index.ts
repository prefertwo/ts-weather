// const {program} = require('commander')
import colors from 'colors'
import commander from 'commander'
import axios, {AxiosResponse} from 'axios'
// import { log } from 'util';
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
  process.exit();
} else {
  // tslint:disable-next-line: no-console
  // console.log(commander.city);
  // process.exit();
}

interface IWeatherResponse {
  status: string;
  count: string;
  info: string;
  infocode: string;
  lives: ILive[];
}

interface ILive {
  province: string;
  city: string;
  adcode: string;
  weather: string;
  temperature: string;
  winddirection: string;
  windpower: string;
  humidity: string;
  reporttime: string;
}

const URL = "https://restapi.amap.com/v3/weather/weatherInfo";
const KEY = "5cb3bc11c4a3012919fee023393946f1";
// tslint:disable-next-line: no-console
const Log = console.log;
axios.get(`${URL}?city=${encodeURI(commander.city)}&key=${KEY}`)
  .then((res:AxiosResponse<IWeatherResponse>) => {
    // (property) AxiosResponse<any>.data: any
    // tslint:disable-next-line: no-console
    // console.log(res.data.lives);
    const live = res.data.lives[0];
    // Log(live)
    // console.log(live.city);
    Log(colors.yellow(live.reporttime));
    Log(colors.red(`${live.province}--${live.city}`))
    Log(colors.green(`${live.weather}--${live.temperature}度`));
    Log(colors.blue(`${live.winddirection}风--${live.windpower}级`));
    Log(colors.magenta(`空气湿度--${live.humidity}%`));
  })
  .catch(() =>{
    Log(colors.red("天气服务出现异常"))
  })

  // async await
  async function getWeather(city: string) {
    try {
      const response = await axios.get(`${URL}?city=${encodeURI(commander.city)}&key=${KEY}`);
      const live = response.data.lives[0];
      Log(live)
    } catch {
      Log(colors.red("天气服务出现异常"))
    }
  }

  // getWeather(commander.city)