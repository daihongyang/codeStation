import React from 'react'
import { useEffect, useState } from 'react'
import { getUserByPointRank } from '../api/user'
import RankItem from './RankItem'
import { Card } from 'antd'
export default function RankList() {
    const [rankInfo, setRankInfo] = useState([])

    useEffect(() => {
        async function fetchUser() {
            const { data } = await getUserByPointRank()
            setRankInfo(data)
        }
        fetchUser()
    }, [])
    let rankList = []
    if (rankInfo.length) {
        for (let i = 0; i < rankInfo.length; i++) {
            rankList.push(
                <RankItem rank={i + 1} key={rankInfo[i]._id} rankInfo={rankInfo[i]} />
            )
        }
    }
    return (
        <div>
            <Card title='积分排行榜'>
                {rankList}
            </Card>

        </div>
    )
}
