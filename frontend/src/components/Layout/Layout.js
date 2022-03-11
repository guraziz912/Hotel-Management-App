//Inbuilt dependcies import

import { useLocation } from 'react-router-dom';

//Custom imports
import SearchNavBar from '../Filter/SearchFilter/SearchNavBarFilter';
import BookingSuccessNotification from '../Notifications/BookingSuccessNotification';
import ErrorNotifications from '../Notifications/ErrorNotifications';
import SuccessLoginNotifications from '../Notifications/SuccessLoginNotification';
import Footer from './Footer';
import Navbar from './Navbar';

import classes from './Layout.module.css';

const Layout = (props) => {
  const location = useLocation();

  const searchNavBar =
    location.pathname === '/' ||
    location.pathname === '/booking' ||
    location.pathname === '/checkout' ? null : (
      <SearchNavBar />
    );
  return (
    <>
      <header>
        <ErrorNotifications />
        <SuccessLoginNotifications />
        <BookingSuccessNotification />
        <Navbar />
        {searchNavBar}
      </header>
      <main>{props.children}</main>
      <footer className={classes.footer}>
        <Footer />
      </footer>
    </>
  );
};
export default Layout;
