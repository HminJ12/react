import { getFirestore, Timestamp, collection, doc, addDoc, setDoc, getDoc, getDocs, updateDoc, deleteDoc, writeBatch, query, where, orderBy, limit, onSnapshot,  arrayUnion, arrayRemove, startAt, startAfter, endAt, endBefore, getCountFromServer} from "firebase/firestore";
export const db = getFirestore();


export const fnAddDoc = (collectName, data) => {
  return new Promise((resolve)=>{
    addDoc(collection(db,collectName),data).then((doc)=>{ //문서가 만들어진다, 문서가 업로드
      resolve()
    })
  })
}

export const fnDeleteCollection = (collectionName) => {
  return new Promise((resolve)=>{
    const batch = writeBatch(db);
    const querySnapshot =  getDocs(collection(db, collectionName)).then((querySnapshot)=>{
      querySnapshot.forEach((v) => {
        const docRef = doc(db, collectionName, v.id);
        batch.delete(docRef);
      })//forEach
      batch.commit().then(()=>{
        resolve()
      })//batch then
    })//getDoc then
  })
} 

export const fnGetDocsCnt = (collectionName) => {
  return new Promise((resolve)=>{
    getCountFromServer( collection(db, collectionName)).
    then((snapshot)=>{
      resolve(snapshot.data().count)
    })
  })
}

export const fnGetDocs = (collectionName, limitCnt,nextDoc=null) => {
  return new Promise((resolve)=>{
    const queryString = nextDoc
      ? query(collection(db, collectionName), orderBy('timestamp', 'desc'), startAfter(nextDoc), limit(limitCnt))
      : query(collection(db, collectionName), orderBy('timestamp', 'desc'), limit(limitCnt))
    getDocs(queryString)
      .then((querySnapshot) => {
        resolve({
          docsArr: querySnapshot.docs,
          nextDoc: querySnapshot.docs[querySnapshot.docs.length - 1]
        })
      })//getDocs
  }) 
} //문서 여러개 가져오겠다
//'desc' 내림차순 

export const fnGetDoc = (collectionName, docid) => {
  return new Promise((resolve)=>{
    const docRef = doc(db, collectionName, docid);
    getDoc(docRef).then((doc) => {
      resolve(doc.data())
    })
  })
} //문서 1개

export const fnUpdateDoc = (collectionName, docid, data) => {
  return new Promise((resolve)=>{
    const docRef = doc(db, collectionName, docid);
    updateDoc(docRef, data).then(()=>{
      resolve()
    })//updateDoc then
  })
} //여기서 data는 객체

export const fnDeleteDoc = (collectionName, docid) => {
  return new Promise((resolve)=>{
    deleteDoc(doc(db, collectionName, docid)).then(()=>{
      resolve()
    })//deleteDoc then
  })
}