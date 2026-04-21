const { Builder, By, until } = require("selenium-webdriver");

async function loginTest(){

let driver = await new Builder()
.forBrowser("chrome")
.build();

try{

await driver.get("http://localhost:3000/login.html");

await driver.findElement(By.id("username"))
.sendKeys("admin");

await driver.findElement(By.id("password"))
.sendKeys("1234");

await driver.findElement(By.tagName("button"))
.click();

let message = await driver.wait(

until.elementLocated(By.id("message")),
5000

);

let text = await message.getText();

if(text==="Login Successful"){

console.log("Test Passed");

}else{

console.log("Test Failed");

}

}
finally{

await driver.quit();

}

}

loginTest();