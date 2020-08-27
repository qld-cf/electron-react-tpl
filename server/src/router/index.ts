import * as fs from 'fs';
import * as koa from 'koa';
import * as Route from 'koa-router'

const routerMount = (app:koa) => {
    fs.readdirSync(__dirname).forEach((file:string) => {
        if(file === 'index.js'||file === 'index.js.map'){
            return
        };
        const router:Route = require(`./${file}/index.js`);
        app.use(router.routes()).use(router.allowedMethods());
    })
};

export default routerMount