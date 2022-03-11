import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Nav, Modal, Button } from 'react-bootstrap';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Avatar from '@material-ui/core/Avatar';

import { userLogout } from '../User/user_Actions';
import constants from '../../utils/constants';
import 'bootstrap/dist/css/bootstrap.min.css';
import { userActions } from '../User/userSlice';
import UserLogin from '../User/UserLogin';

import classes from './Navbar.module.css';

const NavBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const userData = useSelector((state) => state.user.userData);

  const { name, email, image } = userData;

  const userLoginHandler = (event) => {
    dispatch(userActions.setModalShow());
  };

  const userProfileHandler = (event) => {
    history.push(`/${name}`);
  };
  const userLogOutHandler = (event) => {
    const token = JSON.parse(localStorage.getItem(constants.token));
    dispatch(userLogout(token));
    if (location.pathname === `/${name}`) {
      history.push('/');
    }
  };
  // checking if user is logged in
  const userLoggedIn = email ? (
    <div className={classes.userLoggedIn} onClick={userProfileHandler}>
      <span>
        <Avatar alt={name} src={image} />
      </span>
      <span className={classes.username}>{`Hey ${name}`}</span>
    </div>
  ) : (
    <div onClick={userLoginHandler}>
      <span>
        <AccountCircleIcon />
      </span>
      <span>{constants.authButton}</span>
      <UserLogin />
    </div>
  );

  const homeHandler = () => {
    history.push('/');
  };

  const logOut = email && <div className={classes.userLogout}>Log-Out</div>;

  return (
    <Navbar className={classes.nav} expand={constants.navExpand}>
      <Navbar.Brand onClick={homeHandler} className={classes.homeButton}>
        {constants.hotelBook}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls={constants.navbarControls} />
      <Navbar.Collapse className={constants.navColapse}>
        <Nav className={classes.userLogin}>{userLoggedIn}</Nav>
        <Nav onClick={userLogOutHandler}>{logOut}</Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
