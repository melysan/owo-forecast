import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { useRef, useState, useEffect } from 'react';
import axios from 'axios';


export default function Home() {

  const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
  const location = "vancouver";
  const units = "metric";
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=${units}&appid=${apiKey}`


  const [data, setData] = useState();
  const grabWeather = useRef(false);

  const fetchWeather = async () => {
    const response = await axios.get(url);
    console.log(response);

    console.log(response.data.list);
    const arrayOfDays = [];

    let weatherData = response.data.list.map((weather, index) => {
      console.log(parseInt(weather.dt_txt.substr(8, 2), 10))
      let num = parseInt(weather.dt_txt.substr(8, 2), 10)

      if (num !== arrayOfDays.find(element => element === num)) {
        arrayOfDays.push(num);
        console.log("Here");
        console.log(response.data.list[index]);

        var month = '';
        var icon = '';

        if (weather.dt_txt.substr(5, 2) == 1) {
          month = "January";
        } else if (weather.dt_txt.substr(5, 2) == 2) {
          month = "February";
        } else if (weather.dt_txt.substr(5, 2) == 3) {
          month = "March";
        } else if (weather.dt_txt.substr(5, 2) == 4) {
          month = "April";
        } else if (weather.dt_txt.substr(5, 2) == 5) {
          month = "May";
        } else if (weather.dt_txt.substr(5, 2) == 6) {
          month = "June";
        } else if (weather.dt_txt.substr(5, 2) == 7) {
          month = "July";
        } else if (weather.dt_txt.substr(5, 2) == 8) {
          month = "August";
        } else if (weather.dt_txt.substr(5, 2) == 9) {
          month = "September";
        } else if (weather.dt_txt.substr(5, 2) == 10) {
          month = "October";
        } else if (weather.dt_txt.substr(5, 2) == 11) {
          month = "November";
        } else if (weather.dt_txt.substr(5, 2) == 12) {
          month = "December";
        }

        if (weather.weather[0].main == "Clouds") {
          icon = '/icons/broken-clouds.png'
        } else if (weather.weather[0].main == "Clear") {
          icon = '/icons/clear-sky.png'
        } else if (weather.weather[0].main == "Atmosphere") {
          icon = '/icons/mist.png'
        } else if (weather.weather[0].main == "Rain") {
          icon = '/icons/rain.png'
        } else if (weather.weather[0].main == "Drizzle") {
          icon = '/icons/shower-rain.png'
        } else if (weather.weather[0].main == "Snow") {
          icon = '/icons/snow.png'
        } else if (weather.weather[0].main == "Thunderstorm") {
          icon = '/icons/thunderstorm.png'
        }

        var now = new Date(weather.dt_txt);
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        var day = days[now.getDay()];

        return (
          <div className={styles.owoForecast} key={index}>
            <Image
              src={icon}
              alt={icon}
              width={80}
              height={80}
              priority />
            <div className={styles.owoForecastTextBox}>
              <div className={styles.owoForecastText3} >{weather.main.temp.toFixed(1)} ??C</div>
              <div className={styles.owoForecastText4} >{weather.weather[0].main}</div>

              <p className={styles.owoForecastText1} >
                {day} </p>

              <p className={styles.owoForecastText2} >
                {month} {weather.dt_txt.substr(8, 2)}, {weather.dt_txt.substr(0, 4)}
              </p>
            </div>
          </div>
        )
      }
    })
    console.log(arrayOfDays);
    setData(weatherData);
  }

  useEffect(() => {
    // if (grabWeather.current === true) {
    fetchWeather()
    // }
    return () => {
      grabWeather.current = true;
    }
  }, []);

  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

  return (
    <>
      <Head>
        <title>owo forecast</title>
        <meta name="description" content="A 7 day weather forecast web app for Vancouver, B.C. Canada" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/owo_logo.png" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <div className={styles.weatherInfoBox}>
            <p className={styles.weatherInfo}>
              Vancouver, B.C Weather <br />
              Last Updated: {date}
            </p>
          </div>

          <div className={styles.name}>
            <a className={styles.weatherInfo}
              href="https://www.github.com/melysan"
              target="_blank"
              rel="noopener noreferrer"
            >
              By{' '}
              Melysa Nguyen
            </a>
          </div>
        </div>

        <div className={styles.center}>
          <Image
            className={styles.logo}
            src="/owo_forecast.png"
            alt="Next.js Logo"
            width={300}
            height={100}
            priority
          />

        </div>
        <div className={styles.grid}>
          {data}
        </div>
      </main>
    </>
  )
}
