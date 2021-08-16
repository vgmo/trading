import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chart from 'react-apexcharts'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';

import { fetchDataFromServer } from '../utils/data_provider';
import { processData } from '../utils/parse_data';
import { CandleStickChart } from '../Components/CandleStickChart'

const useStyles = makeStyles({
  flexContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: '0px 40px 40px 40px'
  },
  cardTitle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  list: {
    marginTop: 0,
    listStyle: "none",
  },
  chartContainer: {
    width: '15vw',
  },
  chart: {
    width: '67vw'
  },
  actionArea: {
    'border-top': '2px #eee dashed',
    'border-bottom': '2px #eee dashed',
  }
});

export function DonutCardComponent(props) {
  const classes = useStyles();
  const [buySignal, setBuySignal] = useState(0)
  const [series, setSeries] = useState([])
  const options = { legend: { show: false }, colors: ['#d9463e', '#85bb65'], labels: ["Sell", "Buy"] }
  const date = new Date()
  const { ticker } = props;
  let [chartData, setChartData] = useState(null);

  useEffect(() => {
    let isSubscribed = true;
    async function getData(ticker) {
      if (isSubscribed) {
        const data = await fetchDataFromServer(ticker);

        if (data) {
          setChartData(processData(data.data));
          setBuySignal(data.buy_percent);
          setSeries([(100 - data.buy_percent), data.buy_percent]);
        }
      }
    }

    getData(ticker);

    return () => (isSubscribed = false)
  }, [ticker])

  return (
    <div className={`donut ${classes.flexContainer}`}>
      <Card className={classes.root}>
        <CardHeader
          title={ticker}
          subheader={`Updated: ${date.toISOString().slice(0, 10)}`}
        />

        <CardActionArea className={classes.actionArea}>
          <div className={classes.chartContainer}>
            <Chart options={options} series={series} type="donut" />

            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                <b>Multi-resolution Algorithm</b> set your holdings to <b>{buySignal}%</b>
              </Typography>
            </CardContent>
          </div>
        </CardActionArea>

        {chartData && <CandleStickChart ticker={ticker} data={chartData} className={classes.chart} />}
      </Card>
    </div>
  )
}

export default DonutCardComponent