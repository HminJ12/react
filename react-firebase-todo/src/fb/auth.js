import { getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification, signInWithEmailAndPassword, sendPasswordResetEmail,signInWithPopup, GoogleAuthProvider, signOut, deleteUser ,onAuthStateChanged, setPersistence, browserSessionPersistence, browserLocalPersistence } from "firebase/auth";
export const auth = getAuth();


export const fnCreateUser = (email, password, _setFadeOut) => {
  return new Promise((resolve)=>{
    createUserWithEmailAndPassword(auth, email, password).then((result) => {
      resolve()
    }).catch((error) => {
      alert(error.message)
      _setFadeOut(true)
    })
  })
} //회원가입 등록 함수

export const fnUpdateProfile = (displayName, photoURL) => {
  return new Promise((resolve)=>{
    updateProfile(auth.currentUser, {
      displayName, photoURL
    }).then(() => {
      resolve()
    }).catch((error) => {
      alert(error.message)
    });
  })
}

export const fnSendEmailVerification = () => {
  return new Promise((resolve)=>{
    sendEmailVerification(auth.currentUser).then(() => {
      resolve()
    });
  })
} //인증메일 보내는 함수

export const fnSignin = (email, password, setfadeOut) => {
  return new Promise((resolve)=>{
    signInWithEmailAndPassword(auth, email, password).then((result) => {
      resolve()
    }).catch((error) => {
      alert(error.message)
      setfadeOut(true)
    });
  })
}

export const fnSetPersistence = (checked, setFadeOut) => {
  return new Promise((resolve)=>{
    const persistence = (checked)? browserLocalPersistence : browserSessionPersistence
    setPersistence(auth, persistence)
    .then(() => {
      resolve()
    }).catch(()=>{
      setFadeOut(true)
    })
  })
}

export const fnSignInWithPopup = (setFadeOut) => {
  return new Promise((resolve)=>{
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth,provider).then((result) => {
      resolve()
    }).catch((error) => {
      alert(error.message)
      setFadeOut(true)
    })
  })
}

export const fnsendPasswordResetEmail = (email) => {
  return new Promise((resolve)=>{
    sendPasswordResetEmail(auth, email).then(() => {
      resolve()
    })
  })
}


export const fnSignOut = () => {
  return new Promise((resolve)=>{
    signOut(auth).then(() => {
      resolve()
    })
  })
} //로그아웃 함수

export const fnDeleteUser = (_setFadeOut) => {
  return new Promise((resolve)=>{
    deleteUser(auth.currentUser).then(() => {
      resolve()
    }).catch((error) => {
      alert('로그아웃 후 다시 로그인 하신 후 회원탈퇴를 실행해주세요');
      _setFadeOut(true)
    })
  })
}