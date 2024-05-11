const { By, Builder } = require('selenium-webdriver');

let driver = new Builder().forBrowser('firefox').build();
driver.manage().setTimeouts({ implicit: (10000) });

class BasePage {

    constructor() {
        global.driver = driver;
    }

    async goToUrl(theURL) {
        await driver.get(theURL);
    }

    async enterTextById(id, searchText) {
        await driver.findElement(By.id(id)).sendKeys(searchText);
    }

    async clickById(id) {
        await driver.findElement(By.id(id)).click();
    }

    async clickByClassName(className) {
        await driver.findElement(By.className(className)).click();
    }

    async clickByXpath(xpath) {
        await driver.findElement(By.xpath(xpath)).click();
    }

    async closeBrowser() {
        await driver.quit();
    }

}

module.exports = BasePage;