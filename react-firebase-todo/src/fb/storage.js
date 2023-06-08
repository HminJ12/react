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
          orgURL: file.name,
        }) //resolve
      })
    })
  })
}