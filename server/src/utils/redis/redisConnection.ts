import * as ioredis from 'ioredis';
import { resolve } from 'dns';

interface redisConfig {
    port:number,
    host:string,
    password?:string
    db?:number //连接的数据库id，默认为0，即第一个数据库
    family?:number //可填参数：4、6 （ipv4\ipv6)
}

let clientCreate = (config:redisConfig,callback_:Function) => {
    let redis:ioredis.Redis = new ioredis(config);
    redis.on('connect',()=>{ //根据 connect 事件判断连接成功
        callback_(null,redis) //链接成功， 返回 redis 连接对象
    })
    redis.on('error',(err)=>{ //根据 error 事件判断连接失败
        callback_(err,null) //捕捉异常， 返回 error
    })
}

let redisConn = (options?:redisConfig) => {
    let config = options
    return new Promise((resolve,reject) => { //返回API调用方 一个 promise 对象
        clientCreate(config,(err:any,conn:ioredis.Redis) => {
            if(err) {
                reject(err)
            }
            resolve(conn) //返回连接的redis对象
        })
    })
}

export default redisConn