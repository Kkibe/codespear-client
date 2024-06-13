import React from 'react';
import './Courses.css';
import { NavLink } from 'react-router-dom';
import { KeyboardArrowDown } from '@mui/icons-material';
import { CoursesItem } from '../../components/courseItem/CoursesItem';
import { CoursesInfo } from '../../courses';

import { getStorage, ref, getMetadata, listAll, getDownloadURL } from "firebase/storage"
import { storage } from '../../firebase';

export const Courses = () => {
  
  const fetchImages = async () => {
    const storageRef = await ref(storage, "dataset");
    const result = await listAll(listRef);
  
    const urlPromises = result.items.map((imageRef) => getDownloadURL(imageRef));
  
    return Promise.all(urlPromises);
  };
  
  const loadImages = async () => {
    const urls = await fetchImages();
    console.log(urls)
    setFiles(urls);
  };
  const handleScroll = () => {
    window.scrollTo({
        top: 350,
        left: 0,
        behavior: 'smooth'
    })
  }

  //paginate list results

  async function pageTokenExample(){
    // Create a reference under which you want to list
    const storage = getStorage();
    const listRef = ref(storage, 'files/uid');
  
    // Fetch the first page of 100.
    const firstPage = await list(listRef, { maxResults: 100 });
  
    // Use the result.
    // processItems(firstPage.items)
    // processPrefixes(firstPage.prefixes)
  
    // Fetch the second page if there are more elements.
    if (firstPage.nextPageToken) {
      const secondPage = await list(listRef, {
        maxResults: 100,
        pageToken: firstPage.nextPageToken,
      });
      // processItems(secondPage.items)
      // processPrefixes(secondPage.prefixes)
    }
  
    
  //list all files
    // Create a reference under which you want to list
//const listRef = ref(storage, 'files/uid');

// Find all the prefixes and items.
listAll(listRef)
  .then((res) => {
    res.prefixes.forEach((folderRef) => {
      // All the prefixes under listRef.
      // You may call listAll() recursively on them.
    });
    res.items.forEach((itemRef) => {
      // All the items under listRef.
    });
  }).catch((error) => {
    // Uh-oh, an error occurred!
  });

  
  //get file metadata
  // Create a reference to the file whose metadata we want to retrieve
//
const forestRef = ref(storage, 'images/forest.jpg');

// Get metadata properties
getMetadata(forestRef)
  .then((metadata) => {
    // Metadata now contains the metadata for 'images/forest.jpg'
  })
  .catch((error) => {
    // Uh-oh, an error occurred!
  });

  //update file metadata

// Create file metadata to update
const newMetadata = {
  cacheControl: 'public,max-age=300',
  contentType: 'image/jpeg'
};

// Update metadata properties
updateMetadata(forestRef, newMetadata)
  .then((metadata) => {
    // Updated metadata for 'images/forest.jpg' is returned in the Promise
  }).catch((error) => {
  });

  //delete file metadata
  // Create file metadata with property to delete
const deleteMetadata = {
  contentType: null
};

// Delete the metadata property
updateMetadata(forestRef, deleteMetadata)
  .then((metadata) => {
    // metadata.contentType should be null
  }).catch((error) => {
    // Uh-oh, an error occurred!
  });


  //custom metadata
  const metadata = {
    customMetadata: {
      'location': 'Yosemite, CA, USA',
      'activity': 'Hiking'
    }
  };
  //fullPath
  //name
  //size
  //timeCreated
  //updated
  //cacheControl
  //contentType
  //contentLanguage
  //customMetadata

  //upload file with metadata
  const storageRef = ref(storage, 'some-child');
  // Create a reference to 'mountains.jpg'
const mountainsRef = ref(storage, 'mountains.jpg');

// Create a reference to 'images/mountains.jpg'
const mountainImagesRef = ref(storage, 'images/mountains.jpg');

// While the file names are the same, the references point to different files
mountainsRef.name === mountainImagesRef.name;           // true
mountainsRef.fullPath === mountainImagesRef.fullPath;   // false 
  // 'file' comes from the Blob or File API
uploadBytes(storageRef, file).then((snapshot) => {
  console.log('Uploaded a blob or file!');
});
  
//upload byte from a byte array
const bytes = new Uint8Array([0x48, 0x65, 0x6c, 0x6c, 0x6f, 0x2c, 0x20, 0x77, 0x6f, 0x72, 0x6c, 0x64, 0x21]);
uploadBytes(storageRef, bytes).then((snapshot) => {
  console.log('Uploaded an array!');
});

//const metadata = {
 // contentType: 'image/jpeg',
//};

// Upload the file and metadata
const uploadTask = uploadBytes(storageRef, file, metadata);
  
  //manage uploads
  // Upload the file and metadata
//const uploadTask = uploadBytesResumable(storageRef, file);

// Pause the upload
uploadTask.pause();

// Resume the upload
uploadTask.resume();

// Cancel the upload
uploadTask.cancel();
  // Register three observers:
// 1. 'state_changed' observer, called any time the state changes
// 2. Error observer, called on failure
// 3. Completion observer, called on successful completion
uploadTask.on('state_changed', 
(snapshot) => {
  // Observe state change events such as progress, pause, and resume
  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  console.log('Upload is ' + progress + '% done');
  switch (snapshot.state) {
    case 'paused':
      console.log('Upload is paused');
      break;
    case 'running':
      console.log('Upload is running');
      break;
  }
}, 
(error) => {
  // Handle unsuccessful uploads
}, 
() => {
  // Handle successful uploads on complete
  // For instance, get the download URL: https://firebasestorage.googleapis.com/...
  getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    console.log('File available at', downloadURL);
  });
}
);
  
  /*
  // Listen for state changes, errors, and completion of the upload.
uploadTask.on('state_changed',
  (snapshot) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;
      case 'storage/canceled':
        // User canceled the upload
        break;

      // ...

      case 'storage/unknown':
        // Unknown error occurred, inspect error.serverResponse
        break;
    }
  }, 
  () => {
    // Upload completed successfully, now we can get the download URL
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
    });
  }
);
  */

  // documentTags is an ALPHABETICALLY SORTED array of tags we are querying for
async function queryDocuments(documentTags)
{
    let indexCollectionRef = db.collection("tag-tree")
    for (const tag of documentTags) {
        indexCollectionRef = indexCollectionRef.doc("index").collection(tag)
    }
    // returns all documents that are tagged 
    //  ordering can be applied to the query on any one of the sorting fields
    return await indexCollectionRef.get()
}
  return (
    <div>
        <div className="tags">
          <NavLink to='/courses?tags=CSS' title='javascript'>JavaScript</NavLink>
          <NavLink to='/' title='python'>Python</NavLink>
          <NavLink to='/' title='Java'>Java</NavLink>
          <NavLink to='/' title='C'>C</NavLink>
          <NavLink to='/' title='C++'>C++</NavLink>
          <NavLink to='/' title='jQuey'>jQuery</NavLink>
          <NavLink to='/' title='PHP'>PHP</NavLink>
          <NavLink to='/' title='MySQL'>MySQL</NavLink>
        </div>
        <div className='flyer'>
            <h2>Explore Technologies</h2>
            <div className='button' onClick={handleScroll}>
              <KeyboardArrowDown />
            </div>
        </div>
        <h2>Trending Technologies</h2>
        <div className="courses-container">
          {CoursesInfo.map(course => {
            return (
              <CoursesItem data={course} key={course.id}/>
            )
          })}
        </div>
    </div>
  )
}
}