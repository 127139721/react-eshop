import { takeLatest, put, all, call, take } from 'redux-saga/effects';

import { USER_ACTION_TYPES } from './user.types';

import {
    signInSuccess,
    signInFailed,
    signUpSuccess,
    signUpFailed,
    signOutSuccess,
    signOutFailed,
    } from './user.action';

import {
    getCurrentUser,
    createUserDocumentFromAuth,
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword,
    createAuthUserWithEmailAndPassword,
    signOutUser,
    } from '../../utils/firebase/firebase.utils';

export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
    try {
            const userSnapshot = yield call(
                createUserDocumentFromAuth, //要被呼叫之function
                userAuth, //傳給此function參數1
                additionalDetails //參數2
            );
            //using yield put function to dispatch signInSuccess
            yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
        } catch (error) {
            yield put(signInFailed(error));
    }
}

export function* isUserAuthenticated() {
    try{
        //yield非同步呼叫getCurrentUser()得知目前是否登入
        const userAuth = yield call(getCurrentUser);
        //若無登入則回null, 就return
        if(!userAuth) return;
        yield call(getSnapshotFromUserAuth, userAuth);
    } catch(error){
        yield put(signInFailed(error));
    }
};

export function* onCheckUserSession() {
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

/* signIn with google start **** */
export function* signInWithGoogle() {
    try{
        //呼叫FB function
        const { user } = yield call(signInWithGooglePopup);
        yield call(getSnapshotFromUserAuth, user);
    }catch(error){
        yield put(signInFailed(error));
    }
}

//using dispatch to trigger this(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START)
export function* onGoogleSignInStart() {
    yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}
/* signIn with google end **** */


/* signIn with form start **** */
export function* signInWithEmail({ payload: { email, password } }) {
    try{
        //呼叫FB function(signInAuthUserWithEmailAndPassword), 傳入 email, password, 然後取出 user object
        const { user } = yield call(signInAuthUserWithEmailAndPassword, email, password);
        //傳user object 給 getSnapshotFromUserAuth() 去登入
        yield call(getSnapshotFromUserAuth, user);
    }catch(error){
        yield put(signInFailed(error));
    }
}

export function* onEmailSignInStart() {
    //USER_ACTION_TYPES.EMAIL_SIGN_IN_START 觸發 user.action, 然後這裡會 return payload, 在把 payload 傳給 signInWithEmail
    yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}
/* signIn with form end **** */



export function* userSagas() {
    yield all
    ([
        call(onCheckUserSession), 
        call(onGoogleSignInStart), 
        call(onEmailSignInStart)
    ])
}