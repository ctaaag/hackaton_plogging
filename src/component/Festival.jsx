import React, {useState, useEffect} from "react";
import { Container, Row } from 'react-bootstrap'
import Location from "./Location";
import Banner from "./Banner";
import FestivalCard from "./FestivalCard";
import '../Scroll.css'

const Festival = (props) => {
  const [post, setPost] = useState([]);
  const [fade, setFade] = useState("");

  const FilterCard = () => {
    if(props.category === "전체") return props.data;
    else return props.data.filter(el => el.location === props.category)
  }

  useEffect(()=> {
    setPost([...FilterCard()]);
  },[props.category])

  useEffect(() => {
    setTimeout(() => {
      setFade("scrollend")
    }, 100)
  
    return () => {
      setFade("");
    }
  }, [])
  
  
  return (
    <>
     <div className="festival_container" >
      <Banner />
      <h4 className="festival" style={{ margin: "0 0 30px 10px", fontFamily: "SCDream7" }}>진행 중인 행사</h4>
      <Location category={props.category} setCategory={props.setCategory}/>
      <div className={`scroll ${fade}`}>
        <img src="/scrolldown2.png" />
        <div>Scroll Down</div>
      </div>

      <Container style={{position: "absolute"}}>
        <Row>
          {
            post.length 
            ? post.map((item, i) => <FestivalCard data={item} i={i} key={item.id} /> )
            : null
          }
        </Row>
      </Container>
    </div>
    </>
  );
};


export default Festival;
