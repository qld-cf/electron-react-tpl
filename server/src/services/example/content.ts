const getContent = <T>(code:T):string=>{
    let res:any;
    if(typeof(code)!=='string'){
        res = `${String(code)} is not string`
    }else{
        res = `${code} is string`
    }
    return res
}

export {getContent}