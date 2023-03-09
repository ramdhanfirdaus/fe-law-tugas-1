import {Route, Routes, Navigate} from 'react-router-dom'
import {MasterLayout} from '../metronic/layout/MasterLayout'
import { SearchTitleWrapper } from "../pages/SearchTitleWrapper";
import { SaveQuestionWrapper } from "../pages/SaveQuestionWrapper";
import { QuestionTagsWrapper } from "../pages/QuestionTagsWrapper";
import ProfilePage from "../modules/profile/ProfilePage";

const PrivateRoutes = () => {

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='auth/*' element={<Navigate to='/search/by-title' />} />
        {/* Pages */}
        <Route path='search/by-tags' element={<QuestionTagsWrapper />} />
        <Route path='search/by-title' element={<SearchTitleWrapper />} />
        <Route path='save-question' element={<SaveQuestionWrapper />} />
        <Route path='update-profile' element={<ProfilePage />} />
        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}

export {PrivateRoutes}
