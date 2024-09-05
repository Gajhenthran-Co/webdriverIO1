import Reusables from '@pageobjects/reusables.js'
import CheckOutPage from '@pageobjects/checkOutPage.js'

const products = global.content.products

class ViewCartPage {
    getProductQuantity(productName) { return `//a[text()="${productName}"]/ancestor::tr//td//input[@type="number"]` }
    get cartPage() { return $('//div[@class="container"]//table[@class="table table-hover"]') }
    get productsInCart() { return $$('//h4[@class="media-heading"]//a') }
    get productPrices() { return $$('//tr/td[4]/strong') }
    get totalPrice() { return $('h3 strong') }
    get proceedToCheckoutBtn() { return $('//button[contains(text(),"Checkout")]') }

    async verifyProductsPresentInCart(productNames) {
        for (let i = 0; i < this.productsInCart.length; i++) {
            const name = await Reusables.waitAndGetText(this.productsInCart[i])
            await expect(productNames.includes(name)).toBe(true)
        }
    }

    async verifyProductQuantity(productNames) {
        for (let i = 0; i < productNames; i++) {
            const quantity = await Reusables.waitAndGetText($(this.getProductQuantity(productNames[i])))
            const expectedQuantity = products.find(x => x.name === `${productNames[i]}`)?.quantity
            await expect(quantity).toBe(expectedQuantity)
        }
    }

    async checkTotalPrice() {
        const sumOfProducts = (await Promise.all(await this.productPrices.map(async (productPrice) => parseInt((await productPrice.getText()).split(".")[1].trim()))))
            .reduce((acc, price) => acc + price, 0)
        await this.totalPrice.waitForDisplayed()
        const totalStrValue = await this.totalPrice.getText()
        if (totalStrValue) {
            const totalIntValue = parseInt(totalStrValue.replace(/[₹.\s]/g, ''), 10)
            expect(totalIntValue).toBe(sumOfProducts)
        } else {
            throw new Error('Element text is null')
        }
    }

    async clickProceedToCheckoutBtn() {
        await Reusables.waitAndClick(this.proceedToCheckoutBtn)
        await CheckOutPage.chechOutPage.waitForDisplayed()
    }
}

export default new ViewCartPage()