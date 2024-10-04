import React, { useState } from 'react'
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';

export const Authentication = () => {

  const [view, setView] = useState("login");
   const [cookies, setCookie] = useCookies();
     const navigator = useNavigate();
  return (
    <div>Authentication Page</div>
  )
}
