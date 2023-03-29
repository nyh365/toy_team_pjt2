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
import PrevChallenge from 'pages/Challenge/PrevChallenge';
// react-cookie
import { CookiesProvider } from 'react-cookie';
// react-query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import UserLogin from 'pages/Login/UserLogin';
import Notice from 'pages/Notice/Notice';
import BookViewer from 'components/viewer/BookViewer';
import BookDetail from 'pages/Book/BookDetail';
import { userStore } from 'store/userStore';
import SocialLogin from 'pages/Login/SocialLogin';
import ChallengeDetail from 'pages/Challenge/ChallengeDetail';
const queryClient = new QueryClient();
function App() {
  const [userId, setUserId] = useState();
  const id = userStore((state) => state.userId);
  useEffect(() => {
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
            <Route path="/myprofile/edit/nickname" element={<NicknameEdit />} />
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
            <Route path="/books/viewer/:bookId" element={<BookViewer />} />
            <Route
              path="/books/:bookId"
              element={<BookDetail userId={userId} />}
            />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </CookiesProvider>
    </LocalizationProvider>
  );
}

export default App;
