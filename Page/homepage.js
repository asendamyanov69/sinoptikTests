let BasePage = require('../Page/basepage');

class HomePage extends BasePage {

    async enterUrl(theURL) {
        await this.goToUrl(theURL);
    }

    async enterSearch(searchField, searchText) {
        await this.enterTextById(searchField, searchText);
    }
    
}
module.exports = new HomePage();