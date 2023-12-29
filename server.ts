// @ts-ignore
import {Application } from 'https://deno.land/x/oak@v12.0.0/mod.ts';
import router from './router.ts'

const app = new Application();

app.use(router.routes())
app.use(router.allowedMethods())

app.addEventListener('listen',({port})=>{
console.log(`listening on ${port}`)
})

await app.listen({ port: 3000 });