import redisConnect from './redisConnection'
import * as ioredis from 'ioredis'
import getConfig from '../../config/index';

export interface redisTool {
    setString(key:string,value:any):Promise<string|void>
    getString(key:any):Promise<string>
    delString(key:string):Promise<number|null>
    getDbSize():Promise<number>
    connToRedis():Promise<unknown>
}

interface redisConfig {
    port:number,
    host:string,
    password?:string
    db?:number
    family?:number
}

const env = process.env.NODE_ENV;
let redisConfig:redisConfig = {
    port: getConfig(env).port_redis,
    host: getConfig(env).host_redis
}

class RedisTool implements redisTool {
    redis:ioredis.Redis
    config:redisConfig
    constructor(opt?:any){
      this.redis = null;
        if(opt){
            this.config = Object.assign(redisConfig,opt)
        }else{
            this.config = redisConfig
        }
        // this.connToRedis()
      this.connToRedis().then(res=>{
          if(res){
              console.log('redis connet success')
          }
      }).catch(e=>{
          console.error('The Redis Can not Connect:'+e)
      })
    }

    /**连接redis */
    connToRedis(){
        return new Promise((resolve, reject) => {  
            if(this.redis) {
                resolve(true) //已创建
            } else {
                redisConnect(this.config).then((resp:ioredis.Redis) =>  { 
                    this.redis = resp
                    resolve(true) }
                ).catch(err => { reject(err) })
            }
        })
    }

    /**存储string类型的key-value */
    async setString(key:string,value:any){
        let val:string = typeof(value)!=='string'?JSON.stringify(value):value;
        let k:string = typeof(value)!=='string'?JSON.stringify(key):key;
        try {
            const res = await this.redis.set(k, val);
            return res;
        }
        catch (e) {
            console.error(e);
        }
    }

    /**获取string类型的key-value */
    async getString(key:any){
        let id:string = typeof(key)!=='string'?JSON.stringify(key):key;
        try{
            const res = await this.redis.get(id);
            return res
        }catch(e){
            console.error(e);
            return null
        }
    }

    /**删除string类型的key-value */
    async delString(key:string){
        let id:string = typeof(key)!=='string'?JSON.stringify(key):key;
        try{
            const res =  await this.redis.del(id);
            return res
        }catch(e){
            console.error(e);
            return null
        }
    }

    /**获取当前数据库key的数量 */
    async getDbSize(){
        try{
            const res = await this.redis.dbsize();
            return res
        }catch(e){
            console.error(e);
            return null
        }
    }

}

export const default_redis = new RedisTool();
export const redis_db1 = new RedisTool({db:1})
// export const redis_db2 = new RedisTool({db:2})
// export const redis_db3 = new RedisTool({db:3})
// export const redis_db4 = new RedisTool({db:4})

export default default_redis