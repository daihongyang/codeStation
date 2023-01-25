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
        path:'/Column',
        isNeedLogin:false
    },
    {
        path:'/Book',
        isNeedLogin:false
    },
    {
        path:'Book/:id',
        isNeedLogin:false
    },
    {
        path:'/Interviews',
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
        path:'/Personal',
        isNeedLogin:true
    },
    {
        path:'/',
        isNeedLogin:false
    }
]