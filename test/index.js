const {By, Builder, until} = require('selenium-webdriver');
const assert = require('assert');

  describe('Dinamo task', function () {
    let driver;

    before(async function () {
      driver = await new Builder().forBrowser('firefox').build();
    });
    
    it('Open sinoptik, search for Varna and validate 14 day week days and dates', async function () {
      // Part 1 of the task
      await driver.get('https://www.sinoptik.bg/');
      let cookiesAgreeButton = await driver.findElement(By.id('didomi-notice-agree-button'));
      await cookiesAgreeButton.click();

      //Part 2 of the task
      let searchField = await driver.findElement(By.id('searchField'));
      await searchField.sendKeys('Варна');
      let suggestionDropdown = await driver.findElement(By.className('autocomplete'));
      await driver.wait(until.elementIsVisible(suggestionDropdown), 2000)
      let varnaDropdownElement = await driver.findElement(By.xpath('//*[text() = ", България"]'));
      await varnaDropdownElement.click();

      //Part 3 of the task
      let currentCityName = await driver.findElement(By.className('currentCity')).getText();
      assert.equal("Варна", currentCityName);
  
      //Part 4 of the task
      let fortheenDayForecastButton = await driver.findElement(By.className('wf14day'));
      await fortheenDayForecastButton.click();
      let currentDate = new Date().getDate();
      let currentMonth = new Date().getMonth();
      let currentDayOfTheWeek = new Date().getDay();
      const daysOfTheWeek = ['Пн.', 'Вт.', 'Ср.', 'Чт.', 'Пт.', 'Сб.', 'Нд.'];
      const monthsOfTheYear = [' яну', ' феб', ' мар', ' апр', ' май', ' юни', ' юли', ' авг', ' сеп', ' окт', ' ное', ' дек'];
      let sevenDayForecastTable = driver.findElement(By.className('slide'));
      let singleDayList = await sevenDayForecastTable.findElements(By.className('wf10dayRightDay'));
      let singleDateList = await sevenDayForecastTable.findElements(By.className('wf10dayRightDate'));
      
      for(i=0; i<=6; i++) {
        let dayIndex = (currentDayOfTheWeek - 1) + i;
          if( dayIndex >= 7){
            dayIndex = dayIndex -7;
          };

        assert.equal(await singleDayList[i].getText(), daysOfTheWeek[dayIndex]);
        assert.equal(await singleDateList[i].getText(), (currentDate + i) + monthsOfTheYear[currentMonth]);
      };
    });

    after(async () => await driver.quit());
  });
