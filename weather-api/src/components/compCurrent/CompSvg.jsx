import React from 'react';

const CompSvg = ({currentData}) => {
	const {sunrise, sunset, dt} = currentData
	const fnGetDegree = () => {
		let range = sunset - sunrise
		let ratio = (dt - sunrise) / range
		if(ratio > 1) ratio = 1
		if(ratio < 0) ratio = 0 
		let offset = 1 - ratio

		let sun = ratio * 100
		

		return {offset, sun} 
	} //dt가 내가 마커한 지역 현재시간 
	
	const {offset, sun} = fnGetDegree()

	

  return (
    <svg viewBox="0 0 400 200">
      <path className="line" d="M25,200c0-96.65,78.35-175,175-175s175,78.35,175,175" />
      <path style={{strokeDashoffset:`${offset}`}} className="dash" pathLength="1" d="M25,200c0-96.65,78.35-175,175-175s175,78.35,175,175" />
      <path style={{offsetDistance:`${sun}%`}} className="sun" d="M0-18.77c-10.37,0-18.77,8.41-18.77,18.77S-10.37,18.77,0,18.77S18.77,10.37,18.77,0S10.37-18.77,0-18.77z
		M0-20.03c1.04,0,1.88-0.84,1.88-1.88v-6.26c0-1.04-0.84-1.88-1.88-1.88s-1.88,0.84-1.88,1.88v6.26C-1.88-20.87-1.04-20.03,0-20.03
		z M-12.58-18.03c0.35,0.6,0.98,0.94,1.63,0.94c0.32,0,0.64-0.08,0.94-0.25c0.9-0.52,1.21-1.67,0.69-2.56l-3.13-5.42
		c-0.52-0.9-1.67-1.21-2.56-0.69c-0.9,0.52-1.21,1.67-0.69,2.56L-12.58-18.03z M-25.33-12.46l5.42,3.13
		c0.3,0.17,0.62,0.25,0.94,0.25c0.65,0,1.28-0.34,1.63-0.94c0.52-0.9,0.21-2.05-0.69-2.56l-5.42-3.13c-0.9-0.52-2.05-0.21-2.56,0.69
		C-26.53-14.12-26.23-12.97-25.33-12.46z M-20.03,0c0-1.04-0.84-1.88-1.88-1.88h-6.26c-1.04,0-1.88,0.84-1.88,1.88
		s0.84,1.88,1.88,1.88h6.26C-20.87,1.88-20.03,1.04-20.03,0z M-19.91,9.33l-5.42,3.13c-0.9,0.52-1.21,1.67-0.69,2.56
		c0.35,0.6,0.98,0.94,1.63,0.94c0.32,0,0.64-0.08,0.94-0.25l5.42-3.13c0.9-0.52,1.21-1.67,0.69-2.56
		C-17.86,9.12-19.01,8.81-19.91,9.33z M-10.01,17.34c-0.9-0.52-2.05-0.21-2.56,0.69l-3.13,5.42c-0.52,0.9-0.21,2.05,0.69,2.56
		c0.3,0.17,0.62,0.25,0.94,0.25c0.65,0,1.28-0.34,1.63-0.94l3.13-5.42C-8.81,19.01-9.12,17.86-10.01,17.34z M0,20.03
		c-1.04,0-1.88,0.84-1.88,1.88v6.26c0,1.04,0.84,1.88,1.88,1.88s1.88-0.84,1.88-1.88V21.9C1.88,20.87,1.04,20.03,0,20.03z
		M12.58,18.03c-0.52-0.9-1.67-1.21-2.56-0.69c-0.9,0.52-1.21,1.67-0.69,2.56l3.13,5.42c0.35,0.6,0.98,0.94,1.63,0.94
		c0.32,0,0.64-0.08,0.94-0.25c0.9-0.52,1.21-1.67,0.69-2.56L12.58,18.03z M25.33,12.46l-5.42-3.13c-0.9-0.52-2.05-0.21-2.56,0.69
		c-0.52,0.9-0.21,2.05,0.69,2.56l5.42,3.13c0.3,0.17,0.62,0.25,0.94,0.25c0.65,0,1.28-0.34,1.63-0.94
		C26.53,14.12,26.23,12.97,25.33,12.46z M28.16-1.88H21.9c-1.04,0-1.88,0.84-1.88,1.88s0.84,1.88,1.88,1.88h6.26
		c1.04,0,1.88-0.84,1.88-1.88S29.2-1.88,28.16-1.88z M18.97-9.07c0.32,0,0.64-0.08,0.94-0.25l5.42-3.13
		c0.9-0.52,1.21-1.67,0.69-2.56c-0.52-0.9-1.67-1.21-2.56-0.69l-5.42,3.13c-0.9,0.52-1.21,1.67-0.69,2.56
		C17.69-9.41,18.32-9.07,18.97-9.07z M10.01-17.34c0.3,0.17,0.62,0.25,0.94,0.25c0.65,0,1.28-0.34,1.63-0.94l3.13-5.42
		c0.52-0.9,0.21-2.05-0.69-2.56c-0.9-0.52-2.05-0.21-2.56,0.69l-3.13,5.42C8.81-19.01,9.12-17.86,10.01-17.34z" />
    </svg>
  );
};

export default CompSvg;