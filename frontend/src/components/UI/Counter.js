import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';

import classes from './Counter.module.css';

const Counter = ({ quantity, onDecrease, onIncrease }) => {
  return (
    <div className={classes.counter}>
      <span onClick={onDecrease}>
        <RemoveIcon />
      </span>
      <h4>{quantity}</h4>
      <span onClick={onIncrease}>
        <AddIcon />
      </span>
    </div>
  );
};
export default Counter;
