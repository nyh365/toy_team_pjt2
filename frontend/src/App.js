import React from 'react';
import { useState, useEffect } from 'react';
import {
  Route,
  Routes,
  BrowserRouter,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import NavBar from 'components/common/NavBar';

// component
import Home from './pages/Home/Home';
import MyProfile from 'pages/MyProfile/MyProfile';
import MyProfileEdit from 'pages/MyProfile/MyProfileEdit';
import NicknameEdit from 'pages/MyProfile/NicknameEdit';
import IntroductionEdit from 'pages/MyProfile/IntroductionEdit';
import AdminNavBar from 'pages/Admin/AdminNavBar';
import AdminNotice from 'pages/Admin/AdminNotice';
import AdminChallenge from 'pages/Admin/AdminChallenge';
import AdminCommentReport from 'pages/Admin/AdminCommentReport';
import AdminBookReport from 'pages/Admin/AdminBookReport';
import ChallengeCreaete from 'pages/Admin/ChallengeCreate';
import NoticeCreate from 'pages/Admin/NoticeCreate';
import NoticeEdit from 'pages/Admin/NoticeEdit';
import PrevChallenge from 'pages/Challenge/PrevChallenge';
// react-cookie
import { CookiesProvider } from 'react-cookie';
// react-query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import UserLogin from 'pages/Login/UserLogin';
import Notice from 'pages/Notice/Notice';
import BookViewer from 'pages/Book/BookViewer';
import BookDetail from 'pages/Book/BookDetail';
import NewBookEditor from 'pages/Edit/NewBookEditor';
import { userStore } from 'store/userStore';
import SocialLogin from 'pages/Login/SocialLogin';
import ChallengeDetail from 'pages/Challenge/ChallengeDetail';
import FlipViewer from 'pages/Book/FlipViewer';
const queryClient = new QueryClient();
function App() {
  const [userId, setUserId] = useState();
  const id = userStore((state) => state.userId);
  useEffect(() => {
    userStore.subscribe((state) => setUserId(state.userId));
    if (id === '') setUserId(localStorage.getItem('userId'));
    else setUserId(id);
  }, [userId]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <CookiesProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter className="App">
            <NavBar />
            <AdminNavBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<UserLogin />} />
              <Route path="/oauth" element={<SocialLogin />} />
              <Route path="/notice" element={<Notice />} />
              <Route path="/myprofile" element={<MyProfile />} />
              <Route path="/myprofile/edit" element={<MyProfileEdit />} />
              <Route
                path="/myprofile/edit/nickname"
                element={<NicknameEdit />}
              />
              <Route path="/prevchallenge" element={<PrevChallenge />} />
              <Route
                path="/challenge/:challengeId"
                element={<ChallengeDetail />}
              />
              <Route
                path="/myprofile/edit/introduction"
                element={<IntroductionEdit />}
              />
              <Route path="/admin/notice" element={<AdminNotice />} />
              <Route path="/admin/challenge" element={<AdminChallenge />} />
              <Route path="/admin/report/book" element={<AdminBookReport />} />
              <Route
                path="/admin/report/comment"
                element={<AdminCommentReport />}
              />
              <Route
                path="/admin/challenge/create"
                element={<ChallengeCreaete />}
              />
              <Route path="/admin/notice/create" element={<NoticeCreate />} />
              <Route
                path="/admin/notice/edit/:noticeId"
                element={<NoticeEdit />}
              />
              <Route path="/books/viewer/:bookId" element={<FlipViewer />} />
              <Route path="/books/:userId/:bookId" element={<BookDetail />} />
              <Route path="/newbook/:userId" element={<NewBookEditor />} />
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </CookiesProvider>
    </LocalizationProvider>
  );
}

export default App;
