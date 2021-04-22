const puppeteer = require('puppeteer');

class Browser{
    browser;
    lmsPage;
    total;
    cookie = [];
    async initBrowser(){
        this.browser = await puppeteer.launch({
                        headless:false
                        });
        this.lmsPage = await this.browser.newPage();
        await this.lmsPage.goto('https://lms.kau.ac.kr/login/index.php')
    }

    async loginLmsPage(id, pwd){
        await this.lmsPage.waitForSelector('#region-main > div > div > div > div.col-loginbox > div:nth-child(1) > div.col-login.col-login-person')
        console.log('loaded')
        await this.lmsPage.type('#input-username', id)
        await this.lmsPage.type('#input-password', pwd)
        await this.lmsPage.click(`#region-main > div > div > div > div.col-loginbox > div:nth-child(1) > 
                div.col-login.col-login-person > form > div.submitform > input`)
        await this.lmsPage.waitForSelector('head')

        console.log('lms login')
        let isLoginSuccess = await this.lmsPage.$$eval('head > meta', element => {
            console.log('isLoginSuccess')
            for(let tag of element){
                if(tag.getAttribute('name') == 'keywords'){
                    return (tag.getAttribute('content') == 'moodle, coursemos, 코스모스')? false : true;
                }
            }
            })
        
        if (isLoginSuccess) {
            let cookies = await this.lmsPage.cookies()
            this.browser.close()
            for(let cook of cookies){
                if(cook['name'] == 'MoodleSession'){
                    cook['url'] = "http://"+cook['domain']
                    this.cookie.push(cook)
                }
            }
        }
        console.log(isLoginSuccess)
        return isLoginSuccess
    } 
}

module.exports = Browser;