import { useHistory } from 'react-router';

import constants from '../../utils/constants';
import classes from './Footer.module.css';

const Footer = () => {
  const history = useHistory();

  //about page handler
  const aboutPageHandler = () => {
    history.push('/aboutCompany');
  };

  // terms and condition page handler
  const termsHandler = () => {
    history.push('/termsAndConditons');
  };

  return (
    <div>
      <div>
        <strong>{constants.company}</strong>
      </div>
      <div className={classes.footerItems} onClick={aboutPageHandler}>
        {constants.aboutCompany}
      </div>
      <div className={classes.footerItems} onClick={termsHandler}>
        {constants.termsAndConditions}
      </div>
    </div>
  );
};
export default Footer;
