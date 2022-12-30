import Book from '../Pages/Book.jsx'
import Column from '../Pages/Column.jsx'
import Interviews from '../Pages/Interviews.jsx'
import Issues from '../Pages/Issues.jsx'
import { Route, Routes, Navigate } from 'react-router-dom'
function RouterConfig() {
    return <Routes>
        <Route path='/issues' element={<Issues />}></Route>
        <Route path='/Column' element={<Column />}></Route>
        <Route path='/Book' element={<Book />}></Route>
        <Route path='/Interviews' element={<Interviews />}></Route>
        <Route path='/' element={<Navigate to='/issues' replace></Navigate>}></Route>
    </Routes>
}
export default RouterConfig