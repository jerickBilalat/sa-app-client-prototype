import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Card(title, bodyText, subBodyText, onClick ) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Typography component="p" variant="h4">
        {bodyText}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        {subBodyText}
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={ (e) => onClick(e) }>
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}