import React, { useEffect, useState } from 'react'
import styles from '../styles/BookDetail.module.css'
import { useParams } from 'react-router-dom'
import { getBookInfoById } from '../api/book'
import { Image, Collapse, Statistic, Row, Col, message  } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { getTypeList } from '../redux/typeSlice'
import Discuss from '../components/Discuss'
import { updateUserToNewInfo } from '../redux/userSlice'
import { formatDate } from '../utils/tools'
export default function BookDetail() {
  const dispatch = useDispatch()
  const { id } = useParams()
  const [bookInfo, setBookInfo] = useState({})
  useEffect(() => {
    async function fetchData() {
      const res = await getBookInfoById(id)
      setBookInfo(res.data)
    }
    fetchData()
  }, [id])
  const { typeList } = useSelector((state) => {
    return state.type
  })
  const {isLogin,userInfo} = useSelector((state)=>{
    return state.user
  })
  useEffect(() => {
    if (!typeList.length) {
      dispatch(getTypeList())
    }
  }, [])
  function handleLink(e){
    if(!isLogin){
      //如果没登陆
      message.warn('请先登录')
      e.preventDefault()
    }
    else{
      if(userInfo.points<bookInfo.requirePoints){
        message.warn('积分不足，再攒攒吧')
        e.preventDefault()
      }
      else{
        dispatch(updateUserToNewInfo({
          userId: userInfo._id,
          newInfo: {
              points: userInfo.points - bookInfo.requirePoints
          }
      }))
      message.success(`已扣除积分${ bookInfo.requirePoints}`)
      }
    }
  }
  // console.log(bookInfo)
  let type = ''
  if (bookInfo) {
    type = typeList.find((item) => {
      return item._id===bookInfo.typeId
    })?.typeName
  }
  return (
    <div className={styles.bookDetailContainer}>
      {/* 书籍介绍 */}
      <div className={styles.bookInfo}>
        {/* 书籍图片 */}
        <div className={styles.bookPic}>
          <Image src={bookInfo.bookPic}></Image>
          <div className={styles.link}>
            <a href={bookInfo.downloadLink} rel="noreferrer" target="_blank" onClick={handleLink}>网盘链接</a>
          </div>
        </div>
        {/* 中间书籍详细信息 */}
        <div className={styles.bookDesc}>
          <div className={styles.bookTitle}>
            {bookInfo.bookTitle}
          </div>
          <div style={{ marginTop: '15px' }}>
            <Collapse ghost >
              <Collapse.Panel header="简介" key="1">
                <div
                  className='bookIntro'
                  dangerouslySetInnerHTML={{ __html: bookInfo.bookIntro }}
                >
                </div> 
              </Collapse.Panel>
            </Collapse>
          </div>
        </div>
        {/* 评论数和阅读量 */}
        <Row gutter={6} className={styles.bookStatus}>
          <Col span={8}>
            <Statistic className={styles.num} title="评论" value={bookInfo.commentNumber} />
          </Col>
          <Col span={8}>
            <Statistic className={styles.num} title="浏览" value={bookInfo.scanNumber} />
          </Col>
          <Col span={8}>
            <Statistic className={styles.num} title="分类" value={type} />
          </Col>
          <Col span={8}>
            <Statistic className={styles.num} title="所需积分" value={bookInfo.requirePoints} />
          </Col>
          <Col span={10}>
            <Statistic className={styles.num} title="上架日期" value={formatDate(bookInfo.onShelfDate,'year')} />
          </Col>
        </Row>
      </div>
      {/* 书籍评论 */}
      <div className={styles.bookComment}>
        <Discuss bookId={bookInfo?._id} commentType={2} bookInfo={bookInfo}></Discuss>
      </div>
    </div>
  )
}
