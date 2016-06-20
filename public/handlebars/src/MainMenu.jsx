'use strict'
import React from 'react'

module.exports = ((props)=>{
  const mainmenu = [];
  props.menu.forEach((menuitem)=>{
    console.log(JSON.stringify(menuitem));
    mainmenu.push(<li><a href={menuitem.href}>{menuitem.title}</a></li>);
  });
  return <ul>
    {mainmenu}
  </ul>;
});
