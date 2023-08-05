 import React from "react";
 import {  Link } from 'react-router-dom';
 import { useBackgroundContext } from './BackgroundContext';


 import "./Navigation.css"

 function NavigationMenu() {
  const { selectedBackground } = useBackgroundContext();

    return (
      <div className="Cont page-container" style={{ backgroundImage: `url(${selectedBackground})` }}>
        <button> <Link to="/back">اختيار السمة</Link></button>
        <button><Link to="/paper">paper group</Link>        </button>
        <button><Link to="/quiz">من سيربح المليون؟</Link></button>
        <button><Link to="/family-feud">صراع العائلات</Link></button>
       
      </div>
    );
  }
  export default NavigationMenu;
