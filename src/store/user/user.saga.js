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


/* signUp start **** */
export function* signUp({payload: {email, password, displayName}}) {
    try{
        //呼叫FB function(createAuthUserWithEmailAndPassword), 傳入 email, password, 然後取出 user object
        const { user } = yield call(createAuthUserWithEmailAndPassword, email, password);
        //成功 sign up then call the reducer action(SIGN_UP_SUCCESS), SIGN_UP_SUCCESS並不會對reducer產生作用, 其目的是觸發另一個 saga 
        yield put(signUpSuccess( user, {displayName} ));
    }catch(error){
        yield put(signInFailed(error));
    }
}

export function* onSignUpStart() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp)
}
/* signUp end **** */


/* signUp success and sign in start **** */
export function* signInAfterSignUp({payload: { user, additionalDetails }}) {
    yield call(getSnapshotFromUserAuth, user, additionalDetails);
}

export function* onSignUpSuccess() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp)
}
/* signUp success and sign in start **** */


/* signout starts **** */
export function* signOut() {
    try {
        yield call(signOutUser); //call fb function
        yield put(signOutSuccess()); //triggers action
    } catch(error) {
        yield put(signOutFailed(error)); //triggers action
    }
}

export function* onSignOutStart() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut)
}
/* signout ends **** */


export function* userSagas() {
    yield all
    ([
        call(onCheckUserSession), 
        call(onGoogleSignInStart), 
        call(onEmailSignInStart),
        call(onSignUpStart),
        call(onSignUpSuccess),
        call(onSignOutStart)
    ])
}