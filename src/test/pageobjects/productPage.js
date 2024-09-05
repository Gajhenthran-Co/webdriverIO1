import Reusables from '@pageobjects/reusables.js'
import ViewCartPage from '@pageobjects/viewCartPage.js'

class ProductPage {
    get shopPage() { return $('//app-shop//div[@class="container"]//h1[text()="Shop Name"]') }
    getCheckOutBtn(checkOutNumber) { return `//a[@class="nav-link btn btn-primary"][contains(text()," Checkout ( ${checkOutNumber} )")]` }
    getAddToCartBtn(productName) { return `//h4[@class="card-title"]//a[text()="${productName}"]/ancestor::div[@class="card h-100"]//button[text()="Add "]` }

    async addToCart(productName) {
        await Reusables.waitScrollAndClick($(this.getAddToCartBtn(productName)))
    }

    async clickCheckoutButton(checkOutNumber) {
        await Reusables.waitScrollAndClick($(this.getCheckOutBtn(checkOutNumber)))
    }

    async addProductToCardAndCheckout(products) {
        let noOfProductAdded
        for (let i = 0; i < await products.length; i++) {
            await this.addToCart(products[i])
            noOfProductAdded = i+1
        }
        await this.clickCheckoutButton(noOfProductAdded)
        await ViewCartPage.cartPage.waitForDisplayed()
    }
}

export default new ProductPage()