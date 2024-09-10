

class ReusablesComponents {

    async waitAndClick(selector) {
        await selector.waitForDisplayed()
        await selector.click()
    }

    async waitAndSetValue(selector, value) {
        await selector.waitForDisplayed()
        await selector.setValue(value)
    }

    async waitScrollAndClick(selector) {
        await selector.scrollIntoView({ block: 'end' })
        await selector.waitForDisplayed()
        await selector.click()
    }

    async waitAndGetText(selector) {
        await selector.waitForDisplayed()
        return await selector.getText()
    }
}

export default new ReusablesComponents()