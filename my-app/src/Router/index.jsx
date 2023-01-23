import Book from '../Pages/Book.jsx'
import Column from '../Pages/Column.jsx'
import Interviews from '../Pages/Interviews.jsx'
import Issues from '../Pages/Issues.jsx'
import { Route, Routes, Navigate } from 'react-router-dom'
import SearchPage from '../Pages/SearchPage.jsx'
import IssueDetail from '../Pages/IssueDetail.jsx'
import BookDetail from '../Pages/BookDetail.jsx'
import AddIssue  from '../Pages/AddIssue'
function RouterConfig() {
    return <Routes>
        <Route path='/issues' element={<Issues />}></Route>
        <Route path='/issues/:id' element={<IssueDetail />}></Route>
        <Route path='/Column' element={<Column />}></Route>
        <Route path='/Book' element={<Book />}></Route>
        <Route path='/Book/:id' element={<BookDetail />}></Route>
        <Route path='/Interviews' element={<Interviews />}></Route>
        <Route path='/addIssue' element={<AddIssue />}></Route>
        <Route path='/search' element={<SearchPage />}></Route>
        <Route path='/' element={<Navigate to='/issues' replace></Navigate>}></Route>
    </Routes>
}
export default RouterConfig