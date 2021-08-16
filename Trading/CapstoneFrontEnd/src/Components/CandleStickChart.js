
import React, { Component } from "react";
import PropTypes from "prop-types";
import { scaleTime } from "d3-scale";
import { utcDay } from "d3-time";

import { ChartCanvas, Chart } from "react-stockcharts";
import { CandlestickSeries, LineSeries } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last, timeIntervalBarWidth } from "react-stockcharts/lib/utils";
import { MovingAverageTooltip } from "react-stockcharts/lib/tooltip";
import { CrossHairCursor } from "react-stockcharts/lib/coordinates";

function createAccessor(key) {
  return (d) => d[key];
}
const xAccessor = createAccessor('date');
const sma5Accessor = createAccessor('sma_5');
const sma10Accessor = createAccessor('sma_10');
const sma20Accessor = createAccessor('sma_20');
const sma62Accessor = createAccessor('sma_62');

export class CandleStickChart extends Component {
  render() {
    const { width, data, ratio, ticker } = this.props;

    if (!data) {
      return <p>something went wrong!</p>
    }

    const xExtents = [
      xAccessor(last(data)),
      xAccessor(data[data.length - 100])
    ];

    const margin = { left: 50, right: 50, top: 10, bottom: 30 };

    return (
      <ChartCanvas
        height={800}
        ratio={ratio}
        width={width}
        margin={margin}
        type="hybrid"
        seriesName={ticker}
        data={data}
        xAccessor={xAccessor}
        xScale={scaleTime()}
        mouseMoveEvent={false}
        panEvent={false}
        zoomEvent={false}
        xExtents={xExtents}
      >
        <Chart id={1} yExtents={d => [d.high, d.low]}>
          <XAxis axisAt="bottom" orient="bottom" ticks={10} />
          <YAxis axisAt="left" orient="left" ticks={10} />

          <CandlestickSeries width={timeIntervalBarWidth(utcDay)} />
          <LineSeries yAccessor={sma5Accessor} stroke={`#a44a3f`} />
          <LineSeries yAccessor={sma10Accessor} stroke={`#f19c79`} />
          <LineSeries yAccessor={sma20Accessor} stroke={`#93acb5`} />
          <LineSeries yAccessor={sma62Accessor} stroke={`#6c756b`} />
          <MovingAverageTooltip
            origin={[-30, 10]}
            options={[
              {
                yAccessor: sma5Accessor,
                type: "SMA 5 day",
                stroke: '#a44a3f',
                windowSize: ''
              },
              {
                yAccessor: sma10Accessor,
                type: "SMA 10 day",
                stroke: `#f19c79`,
                windowSize: ''
              },
              {
                yAccessor: sma20Accessor,
                type: "SMA 20 day",
                stroke: `#93acb5`,
                windowSize: ''
              },
              {
                yAccessor: sma62Accessor,
                type: "SMA 62 day",
                stroke: `#6c756b`,
                windowSize: ''
              },
            ]}
          />
        </Chart>
        <CrossHairCursor />
      </ChartCanvas>
    );
  }
}

CandleStickChart.propTypes = {
  ticker: PropTypes.string.isRequired,
  data: PropTypes.any.isRequired
};

CandleStickChart = fitWidth(CandleStickChart);
