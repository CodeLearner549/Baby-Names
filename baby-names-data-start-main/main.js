// Baby Names Data (Top 50 Boy/Girl 2022)
// Baby Center (babycenter.com)
// https://www.babycenter.com/baby-names/most-popular/top-baby-names#popularNameList

// Variables for html elements
let goBtn = document.getElementById("go-btn");
let menuSelect = document.getElementById("menu-select");
let container = document.getElementById("container");
let nameCountSpan = document.getElementById("name-count");

// Initialize Array of Character Objects from json file
let babyData = [];
fetch("baby-names-data.json")
  .then((res) => res.json())
  .then((data) => (babyData = data));

// Event Listener on Go Button
goBtn.addEventListener("click", goBtnClicked);

// Process Go Button Click
function goBtnClicked() {
  // Get Menu Selection
  let selection = menuSelect.value;

  // Process Menu Selection
  if (selection === "display-all") {
    displayAll();
  } else if (selection === "gender") {
    searchGender();
  } else if (selection === "rank") {
    searchRank();
  } else if (selection === "starting-letter") {
    searchStartingLetter();
  } else if (selection === "length") {
    searchLength();
  }
}

// Display All Baby Names
function displayAll() {
  let htmlStr = "";
  for (let i = 0; i < babyData.length; i++) {
    htmlStr += babyHTMLStr(babyData[i]);
  }
  nameCountSpan.innerHTML = babyData.length;
  container.innerHTML = htmlStr;
}

// Display Names by Gender
function searchGender() {
  // Prompt user for group to display
  let searchGroup = prompt("Please enter group to display: ");

  // Display all characters in provided group
  let htmlStr = "";
  let count = 0;
  for (let i = 0; i < babyData.length; i++) {
    if (babyData[i].gender === searchGroup) {
      htmlStr += babyHTMLStr(babyData[i]);
      count++;
    }
  }
  nameCountSpan.innerHTML = count;
  container.innerHTML = htmlStr;
}

// Display Names within a Range of Ranks
function searchRank() {
  // Prompt user for ranks to display
  let searchMin = prompt("Please enter minimum rank: ");
  let searchMax = prompt("Please enter minimum rank: ");

  // Display all characters in provided selection
  let htmlStr = "";
  let count = 0;
  for (let i = 0; i < babyData.length; i++) {
    if (searchMin <= babyData[i].rank && babyData[i].rank <= searchMax) {
      htmlStr += babyHTMLStr(babyData[i]);
      count++;
    }
  }
  nameCountSpan.innerHTML = count;
  container.innerHTML = htmlStr;
}

// Display Names with Starting Letter
function searchStartingLetter() {
  // Prompt user for starting letter
  let startLetter = prompt("Please enter starting letter: ");

  // Display all characters in provided selection
  let htmlStr = "";
  let count = 0;
  for (let i = 0; i < babyData.length; i++) {
    if (babyData[i].name.startsWith(startLetter) === true) {
      htmlStr += babyHTMLStr(babyData[i]);
      count++;
    }
  }
  nameCountSpan.innerHTML = count;
  container.innerHTML = htmlStr;
}

// Display Names with a Specific Length
function searchLength() {
  // Prompt user for name length
  let nameLength = +prompt("Please enter name length: "); //needs to be number

  // Display all characters in provided selection
  let htmlStr = "";
  let count = 0;
  for (let i = 0; i < babyData.length; i++) {
    if (babyData[i].name.length === nameLength) {
      htmlStr += babyHTMLStr(babyData[i]);
      count++;
    }
  }
  nameCountSpan.innerHTML = count;
  container.innerHTML = htmlStr;
}

// Return html string of provided baby
function babyHTMLStr(char) {
  return `
    <div>
      <p> <b> ${char.name} </b> (Rank: ${char.rank}, Gender: ${char.gender})<p/>
    </div>`;
}
