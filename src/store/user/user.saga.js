import { takeLatest, put, all, call } from 'redux-saga/effects';

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

    }
};

export function* onCheckUserSession() {
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* userSagas() {
    yield all([call(onCheckUserSession)])
}