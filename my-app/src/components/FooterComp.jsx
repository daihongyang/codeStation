//主页底部组件
import React from 'react'

export default function FooterComp() {
    return (
        <div>
            <p className="links">
                <span className="linkItem">友情链接：</span>
                <a
                    href="https://duyi.ke.qq.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="linkItem"
                >
                    我的-github
                </a>
                <a
                    href="http://www.yuanjin.tech/"
                    target="_blank"
                    rel="noreferrer"
                    className="linkItem"
                >
                    我的博客
                </a>
                <a
                    href="http://yanhongzhi.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="linkItem"
                >
                    Mr.Yan
                </a>
                <a
                    href="https://blog.csdn.net/jackfrued"
                    target="_blank"
                    rel="noreferrer"
                    className="linkItem"
                >
                    骆昊的技术专栏
                </a>
            </p>
            <p>© 2022 - Coder Station</p>
            <p>Powered by Create React App</p>
            <p>Made by daihongyang</p>
        </div>
    );
}
