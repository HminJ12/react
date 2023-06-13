import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject, listAll } from "firebase/storage";
export const storage = getStorage();

export const fnUploadFile = (uid, file) => {
  return new Promise((resolve)=>{
    const path = `${uid}/${Date.now()}-${file.name}`
    const storageRef = ref(storage, path); //업로드하는 시간
    uploadBytes(storageRef,file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((outputUrl)=>{
        resolve({
          outputUrl: outputUrl,
          storageUrl: path,
          orgUrl: file.name,
        }) //resolve, then은 업로드 완료된 시간
      })
    })
  })
}

export const fnDeleteObject = (path) => {
  return new Promise((resolve)=>{
    const storageRef= ref(storage, path);
    deleteObject(storageRef).then(() => {
      resolve()
    })
  })
} //파일 지우기

export const fnDeleteFolder = (folderName) => {
  return new Promise((resolve)=>{
    const folderRef = ref(storage, folderName);
    listAll(folderRef)
      .then((dir) => {
        dir.items.forEach((v) => {
          const fileRef = ref(storage, `${folderRef.fullPath}/${v.name}`);
          deleteObject(fileRef)
        })
        resolve()
      })
  })
}