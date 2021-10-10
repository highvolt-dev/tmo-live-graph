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

  const renderComposedChart = (
    <ComposedChart id="composed-chart" width={Math.min(1000, window.innerWidth)} height={Math.min(500, Math.floor(window.innerHeight * 0.4))} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
      <CartesianGrid stroke="#ccc" strokeDasharray=" 5 5" />
      <Area yAxisId="left"  type="monotone" dataKey="lte.SNRCurrent" stroke="red" fillOpacity={0.5} fill="red" />

      <Line yAxisId="right" type="monotone" dataKey="lte.RSRPCurrent" stroke="crimson" />

      <Area yAxisId="left"  type="monotone" dataKey="nr.SNRCurrent" stroke="blue"  fillOpacity={0.5} fill="blue" />

      <Line yAxisId="right" type="monotone" dataKey="nr.RSRPCurrent" stroke="aqua" />

      <XAxis dataKey="time" />
      <YAxis yAxisId="left" label="SNR" unit="dB" domain={[-5, 40]} tickCount={10} />
      <YAxis yAxisId="right" label="RSRP" unit="dBm" domain={[-140, -44]} tickCount={10} orientation='right' />

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

  const renderRSRQChart = (
    <ComposedChart id="rsrq-chart" width={Math.min(1000, window.innerWidth)} height={Math.min(500, Math.floor(window.innerHeight * 0.4))} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
      <CartesianGrid stroke="#ccc" strokeDasharray=" 5 5" />
      <Area type="monotone" dataKey="lte.RSRQCurrent" stroke="red" fillOpacity={0.5} fill="red" />

      <Area type="monotone" dataKey="nr.RSRQCurrent" stroke="blue"  fillOpacity={0.5} fill="blue" />

      <XAxis dataKey="time" />
      <YAxis label="RSRQ" unit="dB" domain={[-19.5, -3]} tickCount={9} />

      <ReferenceLine y={data.length ? data.map(plot => plot.lte.RSRQCurrent).reduce((max, val) => val > max ? val : max, -19.5) : ''} label="Max LTE RSRQ" stroke="red" strokeDasharray="3 3" isFront />
      <ReferenceLine y={data.length ? data.map(plot => plot.lte.RSRQCurrent).reduce((min, val) => val < min ? val : min, -3) : ''} label="Min LTE RSRQ" stroke="red" strokeDasharray="3 3" isFront />
      <ReferenceLine y={data.length ? data.map(plot => plot.nr.RSRQCurrent).reduce((max, val) => val > max ? val : max, -19.5) : ''} label="Max NR RSRQ" stroke="blue" strokeDasharray="3 3" isFront />
      <ReferenceLine y={data.length ? data.map(plot => plot.nr.RSRQCurrent).reduce((min, val) => val < min ? val : min, -3) : ''} label="Min NR RSRQ" stroke="blue" strokeDasharray="3 3" isFront />
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
            <h2>4G LTE</h2>
            <h3>Band {data.length ? data.slice(-1)[0].lte.Band : 'N/A'}</h3>
            <h3>RSRP</h3>
            <dl>
              <dt>Current:</dt>
              <dd>
                {data.length ? (
                <>
                {data.slice(-1)[0].lte.RSRPCurrent} <span className="unit">dBm</span>
                </>
                ) : ''}
              </dd>
              <dt>Best:</dt>
              <dd>
                {data.length ? (
                <>
                {data.map(plot => plot.lte.RSRPCurrent).reduce((best, val) => val > best ? val : best, -140)} <span className="unit">dBm</span>
                </>
                )  : ''}
              </dd>
            </dl>
            <h3>SNR</h3>
            <dl>
              <dt>Current:</dt>
              <dd>
                {data.length ? (
                <>
                {data.slice(-1)[0].lte.SNRCurrent} <span className="unit">dB</span>
                </>
                ) : ''}
              </dd>
              <dt>Best:</dt>
              <dd>
                {data.length ? (
                <>
                {data.map(plot => plot.lte.SNRCurrent).reduce((best, val) => val > best ? val : best, -19.5)} <span className="unit">dB</span>
                </>
                 ) : ''}
              </dd>
            </dl>
          </div>
          <div className="nr">
            <h2>5G NR</h2>
            <h3>Band {data.length ? data.slice(-1)[0].nr.Band : 'N/A'}</h3>
            <h3>RSRP</h3>
            <dl>
              <dt>Current:</dt>
              <dd>
                {data.length ? (
                <>
                {data.slice(-1)[0].nr.RSRPCurrent} <span className="unit">dBm</span>
                </>
                 ) : ''}
              </dd>
              <dt>Best:</dt>
              <dd>
                {data.length ? (
                <>
                {data.map(plot => plot.nr.RSRPCurrent).reduce((best, val) => val > best ? val : best, -140)} <span className="unit">dBm</span>
                </>
                 ) : ''}
              </dd>
            </dl>
            <h3>SNR</h3>
            <dl>
              <dt>Current:</dt>
              <dd>
                {data.length ? (
                <>
                {data.slice(-1)[0].nr.SNRCurrent} <span className="unit">dB</span>
                </>
                 ) : ''}
              </dd>
              <dt>Best:</dt>
              <dd>
                {data.length ? (
                <>
                {data.map(plot => plot.nr.SNRCurrent).reduce((best, val) => val > best ? val : best, -5)} <span className="unit">dB</span>
                </>
                 ) : ''}
              </dd>
            </dl>
          </div>
        </div>
      </header>
      <main className="App-body">
        {renderComposedChart}
      </main>
      <header className="App-header">
        <div className="summary">
          <div className="lte">
            <h2>4G LTE</h2>
            <h3>RSRQ</h3>
            <dl>
              <dt>Current:</dt>
              <dd>
                {data.length ? (
                <>
                {data.slice(-1)[0].lte.RSRQCurrent} <span className="unit">dB</span>
                </>
                ) : ''}
              </dd>
              <dt>Best:</dt>
              <dd>
                {data.length ? (
                <>
                {data.map(plot => plot.lte.RSRQCurrent).reduce((best, val) => val > best ? val : best, -19.5)} <span className="unit">dB</span>
                </>
                 ) : ''}
              </dd>
            </dl>
          </div>
          <div className="nr">
            <h2>5G NR</h2>
            <h3>RSRQ</h3>
            <dl>
              <dt>Current:</dt>
              <dd>
                {data.length ? (
                <>
                {data.slice(-1)[0].nr.RSRQCurrent} <span className="unit">dB</span>
                </>
                ) : ''}
              </dd>
              <dt>Best:</dt>
              <dd>
                {data.length ? (
                <>
                {data.map(plot => plot.nr.RSRQCurrent).reduce((best, val) => val > best ? val : best, -19.5)} <span className="unit">dB</span>
                </>
                 ) : ''}
              </dd>
            </dl>
          </div>
        </div>
      </header>
      <main className="App-body">
        {renderRSRQChart}
      </main>
    </div>
  );
}

export default App;
