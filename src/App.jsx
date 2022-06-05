import React, { useEffect, useState } from 'react'
import {BrowserRouter,Route,Routes,Link} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

import Menubar from './component/Menubar'
import Main from './component/Main';
import Festival from './component/Festival';
import Profile from './component/Profile';
import DetailFestival from "./component/DetailFestival";
import './Scroll.css'
import './styles/fonts/font.css'

export default function App() {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [data, setData] = useState(null);
  const [category, setCategory] = useState("전체");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // 요청이 시작 할 때에는 error 와 users 를 초기화하고
        setError(null);
        setData(null);
        // loading 상태를 true 로 바꿉니다.
        setLoading(true);
        const response = await axios.get(
          "https://raw.githubusercontent.com/ctaaag/hackaton_plogging/main/flogging_data.json"
        );
        setData([...response.data]);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };

    fetchUsers();
  }, []);

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!data) return null;
  return (
    <>
      <Menubar />
      <div className="temp">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route
              path="/event"
              element={
                <Festival
                  setCategory={setCategory}
                  category={category}
                  data={data}
                />
              }
            />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/detail/:id"
              element={<DetailFestival data={data} />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

