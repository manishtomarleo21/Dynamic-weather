const curDate = document.getElementById('date');
let weatherCond = document.getElementById('weatherCond');

const tempStatus = "clouds";


const getCurrentDay = ()=>{
    let currentTime = new Date();
    // console.log(currentTime);

    // basically get day gives us number from 0 to 6 thats we use an array to get the day
    const weekday = ["Sun","Mon","Tue","Wed","Thur","Fri","Sat"];
    
    // we are using get day as index like [weekday[0]] to get the index sunday monday
    let day = weekday[currentTime.getDay()];
    // console.log(day);

    return day
}

// getCurrentDate()

const getCurrentTime = ()=>{
    let now = new Date();
    let month = now.getMonth(); //month start from the zero thats why added 1
    let date = now.getDate();
    let year = now.getFullYear();

    let monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    monthName = [monthName[month]]

    let hours = now.getHours();
    let minute = now.getMinutes();

    // let period = 'AM'
    // else if(hours === 0 && hours > 1){
    //     hours = 12;
    // }
    //for am and Pm
    let timeOfTheDay = (hours > 12) ? "PM" : "AM";
     // for 0 in single digit
     hours = (hours < 10 ? "0" : "") + hours;
     minute = (minute < 10 ? "0" : "") + minute;
 
     //for 12 hour time use this
     hours = (hours > 12) ? hours - 12 : hours;
     hours = (hours == 00) ? 12 : hours;
    


    if (minute<10) {
        minute = '0'+minute
    }

    console.log(hours ," ", minute);

    console.log(monthName + "/" + date);

    return `${monthName} ${date} | ${hours}:${minute}${timeOfTheDay} `
}

// getCurrentTime()

setInterval(() => {
    curDate.innerHTML = getCurrentDay() + " | " +  getCurrentTime()  
}, 1000);
