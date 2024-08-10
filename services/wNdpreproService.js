//Received the calling from prediction_controller.js for preprocessWeatherNDengueData function and getting 'features' array
const preprocessWeatherNDengueData = async (weatherData,dengueData) => {

    //Create lag features for weather data
    const temperatureLags = [];
    const humidityLags = [];
    const dewPointLags = [];
    const precipitationLags = [];

    for (let j=0 ; j < 14 ; j++){
        const dayData = weatherData[j];

        const { temp } = dayData.data[0];
        console.log(j+1,'.','Temperature :' ,temp); //printing temperature values day by day

        const { humidity } = dayData.data[0];
        console.log(j+1,'.','Humidity :' ,humidity); //printing humidity values day by day

        const { dew_point } = dayData.data[0];
        console.log(j+1,'.','Dew Point :' ,dew_point); //printing dew_point values day by day

        const { rain } = dayData.data[0];
        const precipitation = rain ? (rain['1h'] || (rain['2h'])/2 || (rain['3h'])/3 || (rain['4h'])/4 || 0) : 0;
        console.log(j+1,'.','Precipitation :', precipitation); //printing precipitaion values day by day
        // const {rain}   = dayData.data[0];
        // const precipitation = rain['1h'];
        // console.log('Precipitation for 1h :' ,precipitation);
      
        //Error Handling
        if (!dayData || !dayData.data[0] ) {
        console.error(`Missing data for day ${j+1}:` ,dayData);
        throw new Error(`Missing data for day ${j+1}`);
        }

        const dayWeather = dayData.data[0];

        temperatureLags.push(dayWeather.temp); //searching for temp value and push it to the temperatureLags
        humidityLags.push(dayWeather.humidity); //searching for humidity value and push it to the humidityLags
        dewPointLags.push(dayWeather.dew_point); //searching for dew_point value and push it to the dewPointLags
        precipitationLags.push(dayWeather.rain ? (dayWeather.rain['1h'] || (dayWeather.rain['2h'])/2 || (dayWeather.rain['3h'])/3 || (dayWeather.rain['4h'])/4 || 0) : 0); //searching for rain  value and push it to the precipitaionLags
        
        // Use bracket notation to access '1h' in 'rain'
        //const precipitation = dayWeather.rain ? (dayWeather.rain['1h'] || dayWeather.rain['2h'] || dayWeather.rain['3h'] || 0) : 0;
        //precipitationLags.push(precipitation);

    }
    console.log('**Temperature Lags : ' ,temperatureLags);
    console.log('--End of Temperature Lags--');
    console.log('**Humidity Lags : ' ,humidityLags);
    console.log('--End of Humidity Lags--');
    console.log('**Dew Point Lags : ' ,dewPointLags);
    console.log('--End of Dew Point Lags--');
    console.log('**Precipitation Lags : ' ,precipitationLags);
    console.log('--End of Precipitation Lags--');

    if (dengueData.length === 0) {
        console.warn('wNdpreproService.js : No dengue data available for processing');
        return []; // or some default value
    }
    // Calculate rolling mean and std for dengue deaths for latest 14 days
    const denguedeaths = dengueData.map(day => day.dengue_deaths);
    const rollingMean = denguedeaths.reduce((a, b) => a + b, 0) / denguedeaths.length;
    const rollingStd = Math.sqrt(denguedeaths.map(x => Math.pow(x - rollingMean, 2)).reduce((a, b) => a + b) / denguedeaths.length);

    // printing denguedeaths,rolling mean and rolling std
     console.log('**dengue_cases_table: ',dengueData);
     console.log('--Dengue deaths in latest 14 days: ',denguedeaths);
     console.log('**Rolling mean of dengue deaths: ', rollingMean);
     console.log('--Rolling std of dengue deaths: ', rollingStd);

    // Construct the feature array
    const features = [
        ...temperatureLags,
        ...humidityLags,
        ...dewPointLags,
        ...precipitationLags,
        rollingMean,
        rollingStd
    ];
    console.log('**Features Array** : ' ,features);
    console.log('--End of features Array--');

    return features;    
};

//Exporting preprocessWeatherNDengueData
module.exports = {
    preprocessWeatherNDengueData
};
