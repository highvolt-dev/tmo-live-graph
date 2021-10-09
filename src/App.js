import React, { useState, useEffect, useRef } from 'react';
import {  Area, ComposedChart, Line, CartesianGrid, ReferenceLine, XAxis, YAxis, Tooltip } from 'recharts';
import './App.css';

// https://stackoverflow.com/a/62798382
function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

function App() {
  const [data, setData] = useState([]);

  const renderLineChart = (
    <ComposedChart width={Math.min(1000, window.innerWidth)} height={500} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
      <CartesianGrid stroke="#ccc" strokeDasharray=" 5 5" />
      <Area yAxisId="left"  type="monotone" dataKey="lte.SNRCurrent" stroke="red" fillOpacity={0.5} fill="red" />

      <Line yAxisId="right" type="monotone" dataKey="lte.RSRPCurrent" stroke="crimson" />

      <Area yAxisId="left"  type="monotone" dataKey="nr.SNRCurrent" stroke="blue"  fillOpacity={0.5} fill="blue" />

      <Line yAxisId="right" type="monotone" dataKey="nr.RSRPCurrent" stroke="aqua" />

      <XAxis dataKey="time" />
      <YAxis yAxisId="left" label="SNR" domain={[-5, 40]} />
      <YAxis yAxisId="right" label="RSRP" domain={[-140, -44]} orientation='right' />

      <ReferenceLine yAxisId="left" y={data.length ? data.map(plot => plot.lte.SNRCurrent).reduce((max, val) => val > max ? val : max, -5) : ''} label="Max LTE SNR" stroke="red" strokeDasharray="3 3" isFront />
      <ReferenceLine yAxisId="left" y={data.length ? data.map(plot => plot.lte.SNRCurrent).reduce((min, val) => val < min ? val : min, 40) : ''} label="Min LTE SNR" stroke="red" strokeDasharray="3 3" isFront />
      <ReferenceLine yAxisId="right" y={data.length ? data.map(plot => plot.lte.RSRPCurrent).reduce((max, val) => val > max ? val : max, -140) : ''} label="Max LTE RSRP" stroke="crimson" strokeDasharray="3 3" isFront />
      <ReferenceLine yAxisId="right" y={data.length ? data.map(plot => plot.lte.RSRPCurrent).reduce((min, val) => val < min ? val : min, -44) : ''} label="Min LTE RSRP" stroke="crimson" strokeDasharray="3 3" isFront />
      <ReferenceLine yAxisId="left" y={data.length ? data.map(plot => plot.nr.SNRCurrent).reduce((max, val) => val > max ? val : max, -5) : ''} label="Max NR SNR" stroke="blue" strokeDasharray="3 3" isFront />
      <ReferenceLine yAxisId="left" y={data.length ? data.map(plot => plot.nr.SNRCurrent).reduce((min, val) => val < min ? val : min, 40) : ''} label="Min NR SNR" stroke="blue" strokeDasharray="3 3" isFront />
      <ReferenceLine yAxisId="right" y={data.length ? data.map(plot => plot.nr.RSRPCurrent).reduce((max, val) => val > max ? val : max, -140) : ''} label="Max NR RSRP" stroke="aqua" strokeDasharray="3 3" isFront />
      <ReferenceLine yAxisId="right" y={data.length ? data.map(plot => plot.nr.RSRPCurrent).reduce((min, val) => val < min ? val : min, -44) : ''} label="Min NR RSRP" stroke="aqua" strokeDasharray="3 3" isFront />
      <Tooltip />
    </ComposedChart>
  );

  useInterval(async () => {
    const res = await fetch('/fastmile_radio_status_web_app.cgi', {
      headers: {
        'Accept': 'application/json'
      }
    });
    const json = await res.json();
    const date = new Date();
    const primary = {...json['cell_LTE_stats_cfg'][0]['stat']};
    const secondary = {...json['cell_5G_stats_cfg'][0]['stat']};
    setData(data => [...data.slice(-24), {date, time: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}` , lte: primary, nr: secondary}]);
  }, 2000);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Tmo Live Graph</h1>
        <div className="summary">
          <div className="lte">
            <h2>LTE</h2>
            <h3>Band {data.length ? data.slice(-1)[0].lte.Band : 'N/A'}</h3>
            <h3>RSRP</h3>
            <dl>
              <dt>Current:</dt>
              <dd>{data.length ? data.slice(-1)[0].lte.RSRPCurrent : ''}</dd>
              <dt>Best:</dt>
              <dd>{data.length ? data.map(plot => plot.lte.RSRPCurrent).reduce((best, val) => val > best ? val : best, -140) : ''}</dd>
            </dl>
            <h3>SNR</h3>
            <dl>
              <dt>Current:</dt>
              <dd>{data.length ? data.slice(-1)[0].lte.SNRCurrent : ''}</dd>
              <dt>Best:</dt>
              <dd>{data.length ? data.map(plot => plot.lte.SNRCurrent).reduce((best, val) => val > best ? val : best, -5) : ''}</dd>
            </dl>
          </div>
          <div className="nr">
            <h2>NR</h2>
            <h3>Band {data.length ? data.slice(-1)[0].nr.Band : 'N/A'}</h3>
            <h3>RSRP</h3>
            <dl>
              <dt>Current:</dt>
              <dd>{data.length ? data.slice(-1)[0].nr.RSRPCurrent : ''}</dd>
              <dt>Best:</dt>
              <dd>{data.length ? data.map(plot => plot.nr.RSRPCurrent).reduce((best, val) => val > best ? val : best, -140) : ''}</dd>
            </dl>
            <h3>SNR</h3>
            <dl>
              <dt>Current:</dt>
              <dd>{data.length ? data.slice(-1)[0].nr.SNRCurrent : ''}</dd>
              <dt>Best:</dt>
              <dd>{data.length ? data.map(plot => plot.nr.SNRCurrent).reduce((best, val) => val > best ? val : best, -5) : ''}</dd>
            </dl>
          </div>
        </div>
      </header>
      <main className="App-body">
        {renderLineChart}
      </main>
    </div>
  );
}

export default App;
