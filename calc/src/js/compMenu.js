export const fnGetTheme = ()=>{
  //themeStorage : {1:false, 2:false, 3:false} 이렇게 저장할 거다
  let themeStorage =  window.localStorage.getItem('themeStorage') //일단 themeStorage를 가져오겠다
  let theme
  let className

  if(themeStorage){
    theme = JSON.parse(window.localStorage.getItem('themeStorage')) //true, false
 
    if(theme[1]){
      className = 'gray'
    }else if(theme[2]){
      className = 'skyblue' 
    }else{
      className = 'beige'
    }
    document.body.setAttribute('class', className)
  }else{
    theme = {1:true, 2:false, 3:false}
    window.localStorage.setItem('themeStorage', JSON.stringify(theme))
  } //웹사이트 처음 접속할 때
  return theme
}