import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject, listAll } from "firebase/storage";
export const storage = getStorage();

export const fnUploadFile = (uid, file) => {
  return new Promise((resolve)=>{
    const storageRef = ref(storage, `${uid}/${Date.now()}-${file.name}`);
    uploadBytes(storageRef,file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((outputUrl)=>{
        resolve({
          outputUrl: outputUrl,
          storageUrl: `${uid}/${Date.now()}-${file.name}`,
          orgUrl: file.name,
        }) //resolve
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
}

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