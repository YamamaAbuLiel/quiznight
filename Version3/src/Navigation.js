 import React from "react";
 import {  Link } from 'react-router-dom';
 import { useBackgroundContext } from './BackgroundContext';


 import "./Navigation.css"

 function NavigationMenu() {
  const { selectedBackground } = useBackgroundContext();

    return (
      <div className="Cont page-container" style={{ backgroundImage: `url(${selectedBackground})` }}>
        <button> <Link to="/back" className="link-style">تغيير الخلفية</Link></button>
        <button><Link to="/paper" className="link-style">اسئلة ورقية</Link></button>
        <button><Link to="/quiz" className="link-style">من سيربح المليون؟</Link></button>
        <button><Link to="/family-feud" className="link-style">صراع العائلات</Link></button>
       
      </div>
    );
  }
  export default NavigationMenu;
