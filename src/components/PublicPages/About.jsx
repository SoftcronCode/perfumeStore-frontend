import React, {useEffect} from 'react'

const About = () => {

  const localStorageSessionId = localStorage.getItem('user_id');

  useEffect(() => {
    document.title = "About Us | Zordik";
  }, []);

  return (
    <>
    <h2>About Us Page</h2>
    <p>Session ID : {localStorageSessionId}</p>
    </>
  )
}

export default About