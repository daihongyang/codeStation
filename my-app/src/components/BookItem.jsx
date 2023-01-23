import React from 'react'
import styles from '../styles/BookItem.module.css'
import { Image } from 'antd'
import { useNavigate } from 'react-router-dom';
import { updateBookInfo } from '../api/book';
export default function BookItem(props) {
  // console.log(props.bookInfo)
  const reg = /<[^<>]+>/g;
  let bookIntro = props.bookInfo?.bookIntro.replace(reg, "");
  bookIntro = bookIntro.replace(/^内容简介|内容介绍/,'')
  const navigate = useNavigate()
  function handleClick(){
    navigate(`/Book/${props.bookInfo?._id}`)
    updateBookInfo(props.bookInfo._id,{
      scanNumber: ++props.bookInfo.scanNumber
    })
  }
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.bookPic}>
          <Image src={props.bookInfo.bookPic} width={'100%'} height={'100%'}></Image>
        </div>
      </div>
      <div className={styles.right} onClick={handleClick}>
        <div className={styles.title}>
          {props.bookInfo.bookTitle}
        </div>
        <div className={styles.bookIntro}>{bookIntro}</div>
      </div>
    </div>
  )
}
