import devConfig from './dev';
import prodConfig from './prod';

interface configDefault {
    baseUrl: string,
    baseHost: string,
    basePort: number
    baseSocketPort: number,
    host_redis: string,
    port_redis: number,
}

const getConfig = (type: string): configDefault => {
    let config: configDefault;
    if (typeof (type) !== 'string') {
        type = String(type)
    }
    if (type === 'production') {
        config = prodConfig
    }
    if (type === 'development') {
        config = devConfig
    }
    return config
}

export default getConfig