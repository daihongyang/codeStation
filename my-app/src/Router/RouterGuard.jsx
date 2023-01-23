import React from 'react'
import RouterConfig from './index'
import {configArr} from './RouterGuardConfig'
import { useLocation } from 'react-router-dom'
import {Alert} from 'antd'
import { useNavigate } from 'react-router-dom'
//导航守卫
export default function RouterGuard() {
    const navigate  = useNavigate()
    //关闭回调函数
    function handleClose(){
        navigate('/')
    }
    const location = useLocation()
    const config = configArr.filter((item)=>{
        return item.path === location.pathname
    })[0]
    let router = null
    if(config.isNeedLogin&&!localStorage.getItem('userToken')){
        //如果需要登录但是没登陆
        router = <Alert
        message="codeStation"
        description="您还没有登录哦！登陆即可查看更多内容"
        type="warning"
        closable
        onClose={handleClose}
      />
    }
    else{
        //如果不需要登录
        router = <RouterConfig/>
    }
    return (
        <>
            {router}
        </>
    )
}
