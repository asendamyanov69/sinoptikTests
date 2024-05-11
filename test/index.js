const { By, until } = require('selenium-webdriver');
const assert = require('assert');
const $ = require('../selectors/sinoptikPageSelectors');
const homepage = require('../Page/homepage');

describe('Dinamo task', function () {

  beforeEach(async function () {

  });

  it('Open sinoptik, search for Varna and validate 14 day week days and dates', async function () {
    // Part 1 of the task
    await homepage.enterUrl('https://www.sinoptik.bg/');
    await homepage.clickById($.COOKIES_AGREE_BUTTON);

    //Part 2 of the task
    await homepage.enterSearch($.SEARCH_FIELD, 'Варна');
    await driver.wait(until.elementIsVisible(driver.findElement(By.className($.AUTO_COMPLETE_DROPDOWN))), 2000);
    await homepage.clickByXpath($.VARNA_BULGARIA_SUGGESTION);

    //Part 3 of the task
    assert.equal("Варна", await driver.findElement(By.className($.CURRENT_CITY_NAME_LABEL)).getText());

    //Part 4 of the task
    await homepage.clickByClassName($.FORTEEN_DAY_FORECAST_BUTTON);
    let currentDate = new Date().getDate();
    let currentMonth = new Date().getMonth();
    let currentDayOfTheWeek = new Date().getDay();
    const daysOfTheWeek = ['Пн.', 'Вт.', 'Ср.', 'Чт.', 'Пт.', 'Сб.', 'Нд.'];
    const monthsOfTheYear = [' яну', ' феб', ' мар', ' апр', ' май', ' юни', ' юли', ' авг', ' сеп', ' окт', ' ное', ' дек'];
    let sevenDayForecastTable = driver.findElement(By.className($.SEVERAL_DAY_FORECAST_TABLE));
    let singleDayList = await sevenDayForecastTable.findElements(By.className($.SINGLE_DAY_LABEL));
    let singleDateList = await sevenDayForecastTable.findElements(By.className($.SINGLE_DATE_LABEL));

    for (i = 0; i <= 6; i++) {
      let dayIndex = (currentDayOfTheWeek - 1) + i;
      if (dayIndex >= 7) {
        dayIndex = dayIndex - 7;
      };

      assert.equal(await singleDayList[i].getText(), daysOfTheWeek[dayIndex]);
      assert.equal(await singleDateList[i].getText(), (currentDate + i) + monthsOfTheYear[currentMonth]);
    };
  });

  afterEach(async function () {
    await homepage.closeBrowser();
  });
});
