const { Builder, By, until } = require("selenium-webdriver");

async function loginTest(){

let driver = await new Builder()
.forBrowser("chrome")
.build();

try{

await driver.get("http://localhost:3000/login.html");

// wait page load
await driver.wait(until.elementLocated(By.id("username")),5000);

// enter username
await driver.findElement(By.id("username"))
.clear();

await driver.findElement(By.id("username"))
.sendKeys("admin");

// enter password
await driver.findElement(By.id("password"))
.clear();

await driver.findElement(By.id("password"))
.sendKeys("1234");

// click login
await driver.findElement(By.xpath("//button[text()='Login']"))
.click();


// wait until message text changes
await driver.wait(async () => {

let msg = await driver.findElement(By.id("message")).getText();

return msg.includes("Login");

},5000);


// get message text
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