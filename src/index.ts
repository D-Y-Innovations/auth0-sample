import * as Koa from 'koa'
import * as bp from 'koa-bodyparser'
import { router } from './router'

const app = new Koa()

app.use(bp())

app.use(router.routes())

app.on('error', (err, ctx) => {
    ctx.response.body = { success: false, message: err }
    ctx.response.status = 400
})

app.listen(3000)

console.log('created app succeessfully')
