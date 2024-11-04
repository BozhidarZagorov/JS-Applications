import {chromium} from 'playwright-chromium'

it('should screenshot the home page',async ()=>{
    const browser = await chromium.launch({headless:true, slowMo:10})
    const page = await browser.newPage()

    await page.goto('http://localhost:3000')
    await page.screenshot({path: 'screenshot.png'})
    await browser.close()
})

