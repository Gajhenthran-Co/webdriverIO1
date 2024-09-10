import Page from '@pageobjects/page.js'
import ReusablesComponents from '@pageobjects/reusables.js'
import ProductPage from '@pageobjects/productPage.js'

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    get usernameInput() { return $('//input[@id="username"]') }
    get passwordInput() { return $('//input[@id="password"]') }
    get userDropdown() { return $('//select[@class="form-control"]') }
    get termsConditionCheckbox() { return $('//input[@id="terms"]') }
    get signInBtn() { return $('//input[@id="signInBtn"]') }

    async enterUsername(value) {
        await ReusablesComponents.waitAndSetValue(this.usernameInput, value)
    }

    async enterPassword(value) {
        await ReusablesComponents.waitAndSetValue(this.passwordInput, value)
    }

    async selectTermsCheckbox() {
        await ReusablesComponents.waitAndClick(this.termsConditionCheckbox)
        await expect(this.termsConditionCheckbox).toBeSelected()
    }

    async clickSignInBtn() {
        await ReusablesComponents.waitAndClick(this.signInBtn)
    }

    async selectUserType(text) {
        await this.userDropdown.selectByVisibleText(text)
        await expect(await this.userDropdown.getText()).toContain(text)
    }

    async login(username, password, userType) {
        await this.enterUsername(username)
        await this.enterPassword(password)
        await this.selectUserType(userType)
        await this.selectTermsCheckbox()
        await this.clickSignInBtn()
        await ProductPage.shopPage.waitForDisplayed()
    }

    async open() {
        await super.open();
    }
}

export default new LoginPage();
