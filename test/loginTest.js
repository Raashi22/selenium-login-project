const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

async function loginTest(){

// run chrome in headless mode (required for CI)
let options = new chrome.Options();

options.addArguments(
"--headless",
"--no-sandbox",
"--disable-dev-shm-usage",
"--disable-gpu"
);

let driver = await new Builder()
.forBrowser("chrome")
.setChromeOptions(options)
.build();

try{

await driver.get("http://localhost:3000/login.html");

// wait for page load
await driver.wait(until.elementLocated(By.id("username")),5000);

// enter username
await driver.findElement(By.id("username")).sendKeys("admin");

// enter password
await driver.findElement(By.id("password")).sendKeys("1234");

// click login
await driver.findElement(By.tagName("button")).click();

// wait for result message
await driver.wait(async () => {

let text = await driver.findElement(By.id("message")).getText();

return text.length > 0;

},5000);


// get result text
let text = await driver.findElement(By.id("message")).getText();

console.log("Result:", text);


// check result
if(text.includes("Login Successful")){

console.log("Test Passed");

}else{

console.log("Test Failed");

}

}
catch(error){

console.log("Error:", error);

}
finally{

await driver.quit();

}

}

loginTest();