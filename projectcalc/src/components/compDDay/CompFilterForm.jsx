import React, { useContext, useState } from 'react';
import { DDayContext } from './CompDDay';

const CompFilterForm = ({_filterActive, _setFilterActive, _serchText, _setSearchText}) => {

  const {_ddayArr, _setDdayArr, _ddayOutputArr, _setDdayOutputArr} = useContext(DDayContext)

  const fnSortHandler = function(e){
    const sortType = e.currentTarget.value
    let sortedArr
    if(sortType === 'latest') { //최신등록순
      sortedArr = [..._ddayArr] //원본 카피해서 넣음
    }else if(sortType === 'time') { //시간정렬, 원본을 카피해서 순서를 바꾼 다음에 넣는다
      sortedArr = [..._ddayArr].sort((a,b)=>{
        if(a.dday > b.dday){
          return 1
        }else if(a.dday < b.dday){
          return -1
        }else{
          return 0
        }
      })
    }else if(sortType === 'title') { //제목순
      sortedArr = [..._ddayArr].sort((a,b)=>{
        if(a.title.toLowerCase() > b.title.toLowerCase()){
          return 1
        }else if(a.title.toLowerCase() < b.title.toLowerCase()){
          return -1
        }else{
          return 0
        }
      })
    }
    _setDdayOutputArr(sortedArr)
    _setFilterActive('')
    document.querySelector(`.filter-btn`).classList.remove(`active`)
  }

  const fnSearchHandler = function(e){
    let searchText = e.target.value
    _setSearchText(searchText)
    let searchArr = (searchText) ? _ddayArr.filter(v => v.title.includes(searchText)) : [..._ddayArr]  
    _setDdayOutputArr(searchArr)
  }

  const fnSubmitHandler = function(e){
    e.preventDefault()
    _setSearchText('')
    _setFilterActive('')
    document.querySelector(`.filter-btn`).classList.remove(`active`)
  }

  return (
    <form onSubmit={fnSubmitHandler} className={`filter-form ${_filterActive}`}>
      <fieldset>
        <legend><i className="fa-solid fa-arrow-up-short-wide"></i> 정렬</legend>
        <button type='button' onClick={fnSortHandler} value='latest'>최신등록순</button>
        <button type='button' onClick={fnSortHandler} value='time'>DDay시간</button>
        <button type='button' onClick={fnSortHandler} value='title'>DDay제목</button>
      </fieldset>
      <fieldset>
        <legend><i className="fa-solid fa-magnifying-glass"></i> 검색</legend>
        <input onInput={fnSearchHandler} value={_serchText} type="text" />
      </fieldset>
    </form>
  );
};

export default CompFilterForm;