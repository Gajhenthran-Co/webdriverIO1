import LoginPage from '@src/test/pageobjects/loginPage.js'
import ProductPage from '@src/test/pageobjects/productPage.js'
import ViewCartPage from '@src/test/pageobjects/viewCartPage.js'
import CheckOutPage from '@src/test/pageobjects/checkOutPage.js'
import * as zephyrHelpers from '@dbouckaert/zephyr-scale-reporter'

const userName = global.content.loginInfo.username
const password = global.content.loginInfo.password
const teacherUser = global.content.userTypes.teacher
const products = [global.content.products[0].name, global.content.products[1].name]
const countryName = global.content.country.partialName
const successMsg = global.content.successMsg
let testcaseArray
console.log(zephyrHelpers);

describe('End to End Ecommerce Automation Test', () => {
    // before(async function () {
    //     // FIRST: setting variables for zephyrHelpers (without the project ID)
    //     await zephyrHelpers.init({
    //         zephyrURL: 'https://<url.to.your.jira.env>',
    //         zephyrUser: credentials.zephyrUser,
    //         zephyrPass: credentials.zephyrPassword,
    //         jiraUser: 'me@company.org',
    //         zephyrProjectName: projectName,
    //         zephyrFolderName: folderName,
    //         environment: process.env.ENV,
    //         defaultJiraId: 'JIRAUSER123',
    //     })
    //     // SECOND: filter all testcases, looking for a match based on our project ID
    //     testcaseArray = await zephyrHelpers.getAllTestcases()
    // })
    it('AZ111 Login into Ecommerce website and Add product to cart', async () => {
        await LoginPage.open()
        await LoginPage.login(userName, password, teacherUser)
        await ProductPage.addProductToCardAndCheckout(products)
    })
    it('AZ222 Verify product present in the cart and goto checkout page', async () => {
        await ViewCartPage.verifyProductsPresentInCart(products)
        await ViewCartPage.verifyProductQuantity(products)
        await ViewCartPage.checkTotalPrice()
        await ViewCartPage.clickProceedToCheckoutBtn()
    })
    it('TR123 Select country and complete purchase', async () => {
        await CheckOutPage.selectCountry(countryName)
        await CheckOutPage.clickTermsAndCondition()
        await CheckOutPage.clickPurchaseButton()
        await CheckOutPage.verifySuccessMessage(successMsg)
    })
    // it('Call /users without authorisation header', async function () {
    //     let payloadResult, responseCodeResult
    //     const testName = 'GET /users without authorisation header (Sad flow)'
    //     const testrunId = await zephyrHelpers.createNewTestrun({
    //         testcaseArray: testcaseArray,
    //         name: testName,
    //     })

    //     await request(baseURL)
    //         .get(
    //             `/users?id=${getUser.id}&userIdentification=${getUser.userIdentification}&username=${getUser.username}`
    //         )
    //         .then((res) => {
    //             responseCodeResult = zephyrHelpers.softAssert.equals(res.statusCode, 401)
    //             payloadResult = zephyrHelpers.softAssert.includes(res.body.error, 'Unauthorized')
    //         })

    //     zephyrHelpers.updateTestResult({
    //         testRunId: testrunId,
    //         testStatus: payloadResult && responseCodeResult,
    //     })
    //     await zephyrHelpers.softAssert.assertAll()
    // })
})