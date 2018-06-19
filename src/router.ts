import * as Router from 'koa-router'
import * as auth0 from 'auth0'
import * as axios from 'axios'

export const router = new Router({})

const login_url = `https://leetao.auth0.com/authorize?response_type=code&client_id=WefDC85NfdidcIAeLcr51pt7mZlCd8GW&redirect_uri=http://localhost:3000/login/callback&scope=openid%20profile&connection=google-oauth2`


router.get('/login', async ctx => {
    ctx.redirect(login_url)
})

router.get('/login/callback', async ctx => {
    const code = ctx.request.query.code
    
    const data = await getIdToken(code)

    ctx.response.body = { success: true, data }
    ctx.response.status = 200
})


async function getIdToken(code: string) {

    const res = await axios.default.post('https://leetao.auth0.com/oauth/token', 
    {
        grant_type: "authorization_code",
        client_id: "WefDC85NfdidcIAeLcr51pt7mZlCd8GW",
        client_secret: "DplA6hPv9A6-j2Vj1abkSGgW9CoeCHpgLk6zB5OLrYSEdUATeMunKkHnuvgZuhnr",
        code,
        redirect_uri: ""
    },
    {
        headers: {
            'Content-Type': 'application/json'
        }
    })

    return res.data
}