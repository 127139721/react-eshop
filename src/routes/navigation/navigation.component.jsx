import { Outlet, Link } from 'react-router-dom';
import React, {useContext, Fragment} from 'react'

import './navigation.styles.scss'
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { UserContext } from '../../contexts/user.context';
import { signOutUser } from '../../utils/firebase/firebase.utils';

const Navigation = () => {
    const { currentUser, setCurrentUser } = useContext(UserContext); //sunscribe context 如果值有更新, 此component就會re-rendering
    
    const signOutHandler = async() => {
      await signOutUser(); //使用firebase 的 signout function
      setCurrentUser(null); //登出後設置 context currentUser 為 null
    };

    return (
      <Fragment>
        <div className='navigation'>
          <Link className='logo-container' to='/'>
            <CrwnLogo className='logo' />
          </Link>
          <div className='nav-links-container'>
            <Link className='nav-link' to='/shop'>
              SHOP
            </Link>
  
            {currentUser ? (
              <span className='nav-link' onClick={signOutHandler}>
                {' '}
                SIGN OUT{' '}
              </span>
            ) : (
              <Link className='nav-link' to='/auth'>
                SIGN IN
              </Link>
            )}
          </div>
        </div>
        <Outlet />
      </Fragment>
    );

};

export default Navigation;