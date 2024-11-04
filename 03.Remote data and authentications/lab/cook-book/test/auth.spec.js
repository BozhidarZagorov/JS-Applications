import { expect } from 'chai'
import {chromium} from 'playwright-chromium'

let browser
let page
const homeUrl ='http://localhost:3000'

before(async ()=>{browser = await chromium.launch()})
beforeEach(async () => {page = await browser.newPage()})
afterEach(async ()=> {await page.close()})
after(async ()=>{await browser.close()})

describe('loginPage',async () => {
    it('should load default user',async () => {
        await page.goto(homeUrl)
        await page.click('a[href="/login"]')

        await page.fill('input[name=email]','peter@abv.bg')
        await page.fill('input[name=password]','123456')
        await page.click('input[value=Login]')
        
        await page.waitForSelector('#home-section')

        expect(await page.isVisible('#home-section')).to.be.true
    })
})