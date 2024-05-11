const temperatureField = document.querySelector(".weather1");
const cityField = document.querySelector(".weather2 p");
const dateField = document.querySelector(".weather2 span");
const emojiField = document.querySelector(".weather3 img");
const weatherField = document.querySelector(".weather3 span");
const searchfield = document.querySelector(".searchField");
const form = document.querySelector("form");


//default location 
let target = "Karachi";

//function to fetch data from API
const fetchData = async (target) => {
  try {
    const url = `https://api.weatherapi.com/v1/current.json?key=537650cb9d644b15b87145122240203&q= ${target}`;

    const response = await fetch(url);
    const data = await response.json();
    

    // destructuring  in js,        const {} = data;

    const {
      current: {
        temp_c,
        condition: { text, icon },
      },
      location: { name, localtime },
    } = data;

    // const emojiurl = `https:${icon}`;

    //calling update dom function
    updateDom(temp_c, name, icon, text, localtime);
  } catch (error) {
    alert("Location Not Found");
  }

  // updateDom(data.current.temp_c,        ak method yah haka ap asy sab values ko dom ma dekhay or dsra method haka ap simple  Destructuring  kary jasy ka uper ki ha,
  //           data.location.name
  // );
};


//function to update dom

function updateDom(temperature, city, emoji, text, time) {
  // kuch time ka sath khelty hwy logic

  const exactTime = time.split(" ")[1];
  const exactDate = time.split(" ")[0];
  // console.log(exactTime);
  // console.log(exactDate);

  const exactDay = new Date(exactDate).getDay();
  // console.log(getdayFullname(1));

  temperatureField.innerText = temperature;
  cityField.innerText = city;
  emojiField.src = emoji;
  weatherField.innerText = text;
  dateField.innerText = `${exactTime} - ${getdayFullname(
    exactDay
  )} - ${exactDate}`;
}

fetchData(target);

//function search field

  function search  (e) {
  e.preventDefault();

  target = searchfield.value;
  // console.log(target);

  fetchData(target);
};
form.addEventListener("submit", search);

//function to get full day name

function getdayFullname(num) {
  switch (num) {
    case 0:
      return "Sunday";

      break;

    case 1:
      return "Monday";
      break;

    case 2:
      return "Tuesday";
      break;

    case 3:
      return "Wesnesday";
      break;
    case 4:
      return "Thursday";
      break;
    case 5:
      return "Friday";
      break;
    case 6:
      return "Saturday";
      break;

    default:
      return "Don't Know";

      break;
  }
}
