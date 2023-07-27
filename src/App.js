import React, { useState } from 'react'
import axios from 'axios';

function App() {
  //states
  const [isShow, setIsShow] = useState(false)
  const [inputV, setInputV] = useState('')
  const [dataWeather, setDataWeather] = useState({ wind: { speed: 0 }, weather: [{ main: 'not found' }], name: 'not found', main: { temp: 308.82 } })

  //functions
  const submitHandler = async (e) => {
    // preventDefault
    e.preventDefault()

    // reset datas
    setDataWeather({ wind: { speed: 0 }, weather: [{ main: 'not found' }], name: 'not found', main: { temp: 308.82 } })

    // close description
    setIsShow(false)

    // start gettig data weather
    await fetchDataWeather(`https://api.openweathermap.org/data/2.5/weather?q=${inputV}&units=metric&appid=04f08bf0ee19e0a96475488836fff588`)

    dataWeather !== '' && setIsShow(true)
    console.log(dataWeather.weather[0].main);
  }

  const fetchDataWeather = async (apiURL) => {
    await axios.get(apiURL)
      .then((response) => {
        // handle success
        setDataWeather(response.data)
      })
      .catch(() => {
        // handle error
        setDataWeather({ wind: { speed: 0 }, weather: [{ main: 'not found' }], name: 'not found', main: { temp: 0.0 } })
      })
  }

  return (
    < div className='w-full h-screen bg-[#06283d] overflow-hidden flex items-center justify-center relative' >
      <div className='bg-white rounded pr-4 pl-4 pt-2 pb-2 w-[400px]'>
        <div className='flex items-center'>
          <div className='w-[10%]'>
            <img src="/images/maps-and-flags.png" alt="map" className='' />
          </div>
          <form onSubmit={submitHandler} className='w-[90%] flex items-center justify-between'>
            <input type="text" value={inputV} onChange={e => setInputV(e.target.value)} className='p-3 w-[80%] text-[18px] text-[#333] outline-none' placeholder='enter your locition...' />
            <button type='submit' className='hover:translate-x-[-3px] hover:translate-y-[-3px]'>
              <img src="/images/search.png" alt="" />
            </button>
          </form>
        </div>
        <div className={`overflow-hidden flex flex-col  justify-between gap-2 ${isShow ? 'block' : 'hidden'}`} >
          <div className='flex justify-center items-center gap-6 flex-col p-1'>
            <img src={`/images/${dataWeather.weather[0].main}.png`} className='w-[300px] animateing ' alt="" />
            <h1 className='text-[25px] font-bold'>{dataWeather.weather[0].main === 'Clear' ? 'Sunny' : dataWeather.weather[0].main}</h1>
          </div>
          <div className='flex justify-between items-center p-1'>
            <div className='flex items-center'>
              <img src="/images/windSpeed.png" className='w-[40px]' alt="" />
              <div>
                <p className='p-3 text-[15px] font-medium'>
                  windSpeed:
                  <br />
                  {dataWeather.wind.speed}km/h
                </p>
              </div>
            </div>
            <div className='flex items-center'>
              <img src="/images/thermometer.png" className='w-[40px]' alt="" />
              <div>
                <p className='p-3 text-[15px] font-medium'>
                  temperatures:
                  <br />
                  {dataWeather.main.temp}°C
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ div>
  )
}

export default App