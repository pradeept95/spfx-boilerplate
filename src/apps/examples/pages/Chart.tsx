/* eslint-disable */
import * as React from 'react';
import { LineChartBasicExample } from '../components/Charts/LineChart';
import { SankeyChartInboxExample } from '../components/Charts/SankeyChart';
import { AreaChartBasicExample } from '../components/Charts/AreaCharts';
import { DonutChartBasicExample } from '../components/Charts/DonutChart';
import { Divider } from '@fluentui/react-components';
import { GaugeChartBasicExample } from '../components/Charts/GaugeChart';



export function ChartExample () {
  return (
    <>
      <h2>Line Chart</h2>
      <Divider />
      <LineChartBasicExample />
      <h2>Sankey Chart</h2>
      <Divider />
      <SankeyChartInboxExample />
      <h2>Area Chart</h2>
      <Divider />
      <AreaChartBasicExample />
      <h2>Gauge Chart</h2>
      <GaugeChartBasicExample />
      <h2>Donut Chart</h2>
      <DonutChartBasicExample />
    </>
  );
}