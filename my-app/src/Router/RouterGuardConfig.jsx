//路由守卫配置数组
export const configArr =  [
    {
        path: '/issues',
        isNeedLogin: false
    },
    {
        path: '/issues/:id',
        isNeedLogin: false
    },
    {
        path:'/book',
        isNeedLogin:false
    },
    {
        path:'/book/:id',
        isNeedLogin:false
    },
    {
        path:'/interviews',
        isNeedLogin:false
    },
    {
        path:'/addIssue',
        isNeedLogin:true,
    },
    {
        path:'/search',
        isNeedLogin:false
    },
    {
        path:'/personal',
        isNeedLogin:true
    },
    {
        path:'/',
        isNeedLogin:false
    }
]