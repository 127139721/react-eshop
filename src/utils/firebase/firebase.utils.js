import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged, //用來記錄登入出狀態
} from 'firebase/auth';
import {
  getFirestore,
  doc, //取得doc instance
  getDoc, //使用doc instanec 取得 doc data
  setDoc, //使用doc instanec 設置 doc data
  collection, //建立新的 collection on FB
  writeBatch, //寫入到 FB
  query, //從FB 抓出資料
  getDocs, //從FB 取出doc 
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyC9p7rF3HtNzwimr2lakTWzJNv_MB-RFeo',
  authDomain: 'crwn-clothing-db-72111.firebaseapp.com',
  projectId: 'crwn-clothing-db-72111',
  storageBucket: 'crwn-clothing-db-72111.appspot.com',
  messagingSenderId: '1079390895808',
  appId: '1:1079390895808:web:2a9514de273f3602847725',
};

//初始firebase
const firebaseApp = initializeApp(firebaseConfig);

//使用FB(firebase)的google function Provider
const googleProvider = new GoogleAuthProvider();

//規定users 每次登入都需要至少提供一個帳號
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

//get an auth instance
export const auth = getAuth();

//user登入或登出, 都會觸發到這裡, 紀錄登入出狀態, 使用這個方法的 component 需要傳入一個 callback function
export const onAuthStateChangedListener = (callback) =>
  //listener 會監聽user login/out
  onAuthStateChanged(auth, callback);

//for sagas
export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
      //fb 的 onAuthStateChanged() 一共可以傳入三變數
      const unsubscribe = onAuthStateChanged(
        auth, //auth object
        //callback function
        (userAuth) => { //server returns a userAuth promise
          unsubscribe(); //release resource
          resolve(userAuth); //resolve userAuth promise
        },
        reject //when something goes wrong
      );
    });
};

//將auth instance & FB funciton provider 傳入 signInWithPopup(FB function), 再以 signInWithGooglePopup export 給別的 component 使用
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

//setting firebase store database 
export const db = getFirestore();

//寫入資料到 FB
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const batch = writeBatch(db);
  const collectionRef = collection(db, collectionKey);
  
  objectsToAdd.forEach((object) => {
     const docRef = doc(collectionRef, object.title.toLowerCase());
     batch.set(docRef, object);
  });

  await batch.commit();
  console.log('done');
};

//creating a user into our database
export const createUserDocumentFromAuth = async(userAuth, additionalInformation = {}) => {
  if (!userAuth) 
    return;

  //db:database instance, 'users': collection name, userAuth.uid:值(從已經登入之auth instance抓出的user id)
  const userDocRef = doc(db, 'users', userAuth.uid); // get a ref of the document
  const userSnapshot = await getDoc(userDocRef); // 用這個userDocRef 去建立一個 snapshot instance提供更多funcions(ex.可以用來確認user是否存在) 

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      //建立 users' documents
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
};

//從FB 的 doc 中取出資料
export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(docSnapshot => docSnapshot.data());
  
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

//登出
export const signOutUser = async() => await signOut(auth);

