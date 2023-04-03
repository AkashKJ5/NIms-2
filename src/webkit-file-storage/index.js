/* ---------------------------------------------------------------
-                                                                |
-                                                                |
- Storing the  images in webkit API                              |
-                                                                |
- img is the image file (object type)                            |
- Path where images will store                                   |
- **CreateDir this will create folder inside root directory**    |
- CreateDir (type function)                                      |
-                                                                |
-**AddImages this will add the images at given folder**          |
- AddImages (type function)                                      |
-                                                                |
-                                                                |
-----------------------------------------------------------------
*/
export const webkitFileStorage = async (img, Path) => {
  const folderName = Path
  return await window.webkitRequestFileSystem(
    window.PERSISTENT,
    1024 * 1024,
    (fs) => {
      CreateDir(fs.root, folderName.split('/'), folderName, fs.root, img)
    },
    (err) => {
      console.error(err)
    }
  )
}

/* ---------------------------------------------------------------
-                                                                |
-                                                                |
- CREATE DIRECTORY INSIDE WEBKIT API                             |
-                                                                |
- RootDirEntry is the current root directory path (object type)  |
- folders this the folder where the image is storing (sting type)|
-                                                                |
-                                                                |
-                                                                |
-----------------------------------------------------------------
*/
function CreateDir (rootDirEntry, folders, folderName, rootFolder, img) {
  rootDirEntry.getDirectory(
    folders[0],
    { create: true },
    (dirEntry) => {
      if (folders.length) {
        CreateDir(dirEntry, folders.slice(1), folderName, rootFolder, img)
      } else {
        console.log('folderhas been created.....?')
        AddImages(rootFolder, folderName, img)
      }
    },
    (err) => {
      console.error(err)
    }
  )
}

/* --------------------------------------------------------------------
-                                                                     |
-                                                                     |
- Add THE IMAGE AT THE GIVEN PATH                                     |
-                                                                     |
- RootDirEntry is the current root directory path (object type)       |
- folderName this the folder where the image is storing (sting type)  |
- img is the image file (object type)                                 |
- img.mane will provide the name of the image                         |
-                                                                     |
-                                                                     |
-                                                                     |
----------------------------------------------------------------------
*/
function AddImages (rootDirEntry, folderName, img) {
  return rootDirEntry.getDirectory(
    folderName,
    {},
    (dirEntry) => {
      dirEntry.getFile(
        `${img.name}`,
        { create: true },
        (fileEntry) => {
          return fileEntry.createWriter(
            (fileWriter) => {
              fileWriter.onwriteend = () => {
                console.log('Image saved to folder')
                return 'done'
              }
              fileWriter.onerror = (err) => {
                console.error(err)
              }
              fileWriter.write(img)
            },
            (err) => {
              console.error(err)
            }
          )
        },
        (err) => {
          console.error(err)
        }
      )
    },
    (err) => {
      console.error(err)
    }
  )
}
