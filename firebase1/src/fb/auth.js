import { getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut, deleteUser, onAuthStateChanged, setPersistence, browserSessionPersistence, browserLocalPersistence } from "firebase/auth";

export const auth = getAuth();

export const fnCreateUser = (email, password) => {
  return new Promise((resolve) => {
    createUserWithEmailAndPassword(auth, email, password).then((result) => {
      resolve(result.user) //다음 함수 실행되라, let user = result.user
    }).catch((error) => {
      alert(error.message)
    });
  }) //then 비동기라 이메일 인증받고 기다려야 하기 때문에 return new Promise해야 함
}

export const fnUpdateProfile = (nickName, photoUrl) => {
  return new Promise((resolve) => {
    updateProfile(auth.currentUser, { displayName: nickName, photoURL: photoUrl }).then(() => {
      resolve()
    }).catch((error) => {
      alert(error.message)
    });
  })
}

export const fnSignIn = (email, password) => {
  return new Promise((resolve) => {
    signInWithEmailAndPassword(auth, email, password).then((result) => {
      resolve() //const user = result.user; // auth.currentUser와 동일
    }).catch((error) => {
      alert(error.message)
    });
  })
}

export const fnSendEmailVerification = () => {
  return new Promise((resolve) => {
    sendEmailVerification(auth.currentUser).then(() => {
      alert('인증 메일을 확인 후 로그인 해주세요')
      resolve()
    });
  })
}

export const fnCheckEmailVerification = () => {
  return (
    (auth.currentUser.emailVerified) ? true : false
  )
} //비동기할 필요가 없다, 로그인한 다음에 실행되는 함수

export const fnSignInGoogle = () => {
  return new Promise((resolve)=>{
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth,provider).then((result) => {
      resolve()
    }).catch((error) => {
      alert(error.message)
    });
  })  
}


export const fnSetPersistence = (checked) => {
  return new Promise((resolve)=>{
    if (checked) {
      setPersistence(auth, browserLocalPersistence)
        .then(() => {
          resolve()
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    } else {
      setPersistence(auth, browserSessionPersistence)
        .then(() => {
          resolve()
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    }
  })
}


export const fnSignOut = () => {
  return new Promise((resolve) => {
    signOut(auth).then(() => {
      resolve()
    }).catch((error) => {
      alert(error.message)
    });
  })
}

export const fnDeleteUser = () => {
  return new Promise((resolve)=>{
    deleteUser(auth.currentUser).then(() => {
      resolve()
    }).catch((error) => {
      if (error.message === 'auth/requires-recent-login') {
        alert('로그아웃 후 다시 로그인 하신 후 회원탈퇴를 실행해주세요\n강제 로그아웃 하겠습니다');
        fnSignOut()
      } else {
        alert(error.message)
      }
    });
  })
}

/* \n 줄내림 */