import Reusables from '@pageobjects/reusables.js'

class CheckOutPage {
    get chechOutPage() { return $('//app-checkout') }
    get countryDropdown() { return $('//div[@class="suggestions"]') }
    get countryInput() { return $('//input[@id="country"]') }
    get countryName() { return $('//li//a[text()="India"]') }
    get dropdownLoading() { return $('//div[@class="lds-ellipsis"]') }
    get purchaseButton() { return $('//input[@value="Purchase"]') }
    get successMessage() { return $('//div[@class="alert alert-success alert-dismissible"]') }
    get termsAndConditionCheckbox() { return $('//label[@for="checkbox2"]') }

    async selectCountry(partialName) {
        await Reusables.waitAndClick(this.countryInput)
        await this.countryInput.setValue(partialName)
        await this.dropdownLoading.waitForDisplayed()
        await this.dropdownLoading.waitForDisplayed({ reverse: true })
        await this.countryDropdown.waitForDisplayed()
        await Reusables.waitAndClick(this.countryName)
        await this.countryDropdown.waitForDisplayed({ reverse: true })
    }

    async clickPurchaseButton() {
        await Reusables.waitAndClick(this.purchaseButton)
    }

    async clickTermsAndCondition() {
        await Reusables.waitAndClick(this.termsAndConditionCheckbox)
    }

    async verifySuccessMessage(message) {
        const text = await Reusables.waitAndGetText(this.successMessage)
        await expect(text).toContain(message)
    }
}

export default new CheckOutPage()