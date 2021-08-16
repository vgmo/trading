import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { DonutCardComponent } from '../Components/DonutCardComponent';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    'background-color': '#eee',
  },
  tabs: {
    'background-color': '#eee',
  },
  tabPanel: {
    height: '1vh'
  }
});

export default function Signals() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [tickers] = useState(["TQQQ", "TNA", "UPRO"]);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        className={classes.tabs}
        centered
      >
        {tickers.map(ticker => <Tab label={ticker} key={ticker} />)}
      </Tabs>

      {tickers.map((ticker, index) => (
        index === value && <DonutCardComponent className={classes.tabPanel} value={value} index={index} key={index} ticker={ticker} />
      ))}
    </Paper>
  );
}