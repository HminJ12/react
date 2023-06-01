import { getFirestore, Timestamp, collection, doc, addDoc, setDoc, getDoc, getDocs, updateDoc, deleteDoc, writeBatch, query, where, orderBy, limit, onSnapshot, arrayUnion, arrayRemove, startAt, startAfter, endAt, endBefore, } from "firebase/firestore";

const db = getFirestore();



export const fnAddDoc = (collectionName, dataObj) => {
  return new Promise((resolve) => {
    addDoc(collection(db, collectionName), dataObj).then((doc) => {
      resolve()
    })
  })
}

export const fnWatchCollection = (collectionName, fnSetState1, fnSetState2) => {
  onSnapshot(
    collection(db, collectionName),
    (snapshot) => {
      fnSetState1(snapshot.docs)
      fnSetState2(snapshot.docs)
    },
    (error) => {
      alert(error.message)
    }
  )
} //이벤트 등록하는 거, fnsetState 내가 만든 함수 이름

export const fnGetDocs = (collectionName) => {
  return new Promise((resolve) => {
    getDocs(collection(db, collectionName)).then((querySnapshot) => {
      resolve(querySnapshot.docs)
    }).catch((error) => {
      alert(error.message)
    })
  })
} //fnGetDocs() 문서 목록 가져오기 함수

export const fnGetDoc = (collectionName, docid) => {
  return new Promise((resolve) => {
    const docRef = doc(db, collectionName, docid);
    getDoc(docRef).then((doc) => {
      resolve(doc.data())
    }).catch((error) => {
      alert(error.message)
    })
  })
}

export const fnDeldeteDoc = (collectionName, docid) => {
  return new Promise((resolve)=>{
    deleteDoc(doc(db, collectionName, docid)).then(()=>{
      resolve()
    }).catch((error)=>{
      alert(error.message)
    })
  })
}

export const fnUpdateDoc = (collectionName, docid, dataObj) => {
  return new Promise((resolve)=>{
    const docRef = doc(db, collectionName, docid);
    updateDoc(docRef, dataObj).then((doc)=>{
      resolve()
    })//updateDoc then
  })
}


