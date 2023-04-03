import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

import firebase1 from '../firebase'

/* ----------------------------------------------
-                                              |
-                                              |
- Sync Firebase with webkit file system        |
-                                              |
- file is the image file (object type)         |
- file.mane will provide the name of the image |
- Path where images will store                 |
-                                              |
-                                              |
------------------------------------------------
*/

export const SyncWithFirebase = (path) => {
  const requestFileSystem =
    window.requestFileSystem || window.webkitRequestFileSystem
  requestFileSystem(
    window.PERSISTENT,
    1024 * 1024,
    function (fs) {
      ReadWebkitFiles(fs.root, path)
    },
    () => {
      console.log('something went wrong...')
    }
  )
}

/* ----------------------------------------------------------------
-                                                                |
- READ FILE FROM WEBKIT FILE SYSTEM                              |
-                                                                |
- RootDirEntry is the current root directory path (object type)  |
- path is the place where the image is storing (sting type)      |
-                                                                |
-                                                                |
- ----------------------------------------------------------------
*/
function ReadWebkitFiles (rootDirectory, path) {
  rootDirectory.createReader().readEntries(
    function (entries) {
      entries.forEach(function (entry) {
        ReplicationFiles(entry, path)
      })
    },
    () => {
      console.log('having some error')
    }
  )
}

/* ------------------------------------------------------------------
-                                                                   |
-                                                                   |
- THIS FUNCTION IS RESPONSIBLE TO CREATE THE FOLDER IN FIREBASE     |
-                                                                   |
- entry data path it might be a file or folder having files         |
- storagePath is the path where image will place at the end         |
- file.name is the name of the file                                 |
- path is the place where the image is storing (sting type)         |
-                                                                   |
-                                                                   |
- -------------------------------------------------------------------
*/
const ReplicationFiles = (entry, storagePath) => {
  if (entry.isFile) {
    entry.file(function (file) {
      const path = `${storagePath}/${file.name}`
      SyncFireBaseStorage(file, path)
    })
  } else if (entry.isDirectory) {
    ReadWebkitFiles(entry, `${storagePath}/${entry.name}`)
  }
}

/* ----------------------------------------------------
-                                                     |
- Sync Firebase with webkit file system               |
-                                                     |
- file is the image file (object type)                |
- file.mane will provide the name of the image        |
- Path where images will store                        |
-                                                     |
-                                                     |
------------------------------------------------------
*/
const SyncFireBaseStorage = (file, path) => {
  const storageRef = ref(firebase1, path)
  const uploadTask = uploadBytesResumable(storageRef, file)

  uploadTask.on(
    'state_changed',
    (snapshot) => {
      Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
    },
    (error) => {
      console.log('error', error)
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {})
    }
  )
}
