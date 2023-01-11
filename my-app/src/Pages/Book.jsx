import React, { useEffect, useState } from 'react'
import styles from '../styles/Books.module.css'
import PageHeader from '../components/PageHeader'
import { getBooksInfo } from '../api/book'
import BookItem from '../components/BookItem'
import { Pagination,Skeleton } from 'antd'
export default function Book() {
  const [pageInfo, setPageInfo] = useState({
    current: 1,
    pageSize: 15,
    total: 0
  })
  const [bookList, setBookList] = useState([])
  useEffect(() => {
    async function fetchData() {
      const res = await getBooksInfo({
        current: pageInfo.current,
        pageSize: pageInfo.pageSize
      })
      // console.log(res.data)
      setPageInfo({
        current: res.data.currentPage,
        pageSize: res.data.eachPage,
        total: res.data.count
      })
      setBookList(res.data.data)
    }
    fetchData()
  }, [pageInfo.current,pageInfo.pageSize])
  // console.log(pageInfo)
  function handlePageChange(current, pageSize) {
    setPageInfo(
      {
        current,
        pageSize,
        total: pageInfo.total
      }
    )
  }
  let books = []
  for (let i = 0; i < bookList.length; i++) {
    books.push(<BookItem bookInfo={bookList[i]} key={i} />)
  }
  // console.log(pageInfo)
  if(!books.length){
    books = <Skeleton/>
  }
  return (
    <div className={styles.bookContainer}>
      <PageHeader title='必读书籍'></PageHeader>
      <div className={styles.bookItem}>
        {books}
      </div>
      <div className='paginationContainer'>
        <Pagination showQuickJumper defaultCurrent={1}  {...pageInfo} onChange={handlePageChange} />
      </div>
    </div>
  )
}
