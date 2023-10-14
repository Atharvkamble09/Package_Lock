import React, { useContext, useState } from 'react';
import { DataContext } from '../../contexts/Provider';

const Navbar = ()=>{
  const {loading,selectOption,onChangeHandler, sortOption, onOptionChangeHandler} = useContext(DataContext);
  console.log(selectOption)

    //handler
    

    return <>
    
    <select value={selectOption} onChange={onChangeHandler}>
      <option value={0}>User</option>
      <option value={1}>Status</option >
      <option value={2}>Priority</option>
    </select>

    <select value={sortOption} onChange={onOptionChangeHandler}>
      <option value={0}>Names</option>
      <option value={1}>Priority</option >
    </select>
    </>;
}

export default Navbar;