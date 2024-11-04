import {chromium} from 'playwright-chromium'
import { expect } from 'chai'

let browser
let page
const homeUrl ='http://localhost:3000'

//arrange
before(async ()=>{browser = await chromium.launch()})
beforeEach(async () => {page = await browser.newPage()})
afterEach(async ()=> {await page.close()})
after(async ()=>{await browser.close()})

describe('homepage', async () => {
    it('should load the home page catalog', async()=>{
        //act
        await page.goto(homeUrl)
        const isVisible = await page.isVisible('#home-section')
        //assert
        expect(isVisible).to.be.true
    })
    it('should load details page',async () => {
        await page.goto(homeUrl)
    
        await page.click('#home-section article:first-of-type')
        await page.waitForLoadState()
    
        expect(await page.isVisible('div.ingredients')).to.be.true
    })
})
