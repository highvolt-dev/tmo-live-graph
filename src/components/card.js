import React from 'react';

function Card(props) {

  return (
    <div className={props.signal}>
      <h2>{props.title}</h2>
      {props.main ? (
        <>
          <h3>Band {props.band ? props.band : 'N/A'}</h3>
          {props.signal === 'lte' && props.CA ? (
            <>
            <h3>Carrier Aggregation</h3>
            <dl>
              <dt>Download</dt>
              <dd>{props.CA.download ? `+${props.CA.download}` : 'None'}</dd>
              {props.CA.carriers.hasOwnProperty('download') ? <>
              {props.CA.carriers.download.map((carrier, i) => <>
                <dt>DL CA Add({i + 1})</dt>
                <dd>Band {carrier['ScellBand']}</dd>
              </> )}
              </> : ''}
              <dt>Upload</dt>
              <dd>{props.CA.upload ? `+${props.CA.upload}` : 'None'}</dd>
              {props.CA.carriers.hasOwnProperty('upload') ? <>
              {props.CA.carriers.upload.map((carrier, i) => <>
                <dt>UL CA Add({i + 1})</dt>
                <dd>Band {carrier['ScellBand']}</dd>
              </> )}
              </> : ''}
              {props.CA.carriers.hasOwnProperty('unspecified') ? <>
              {props.CA.carriers.unspecified.map((carrier, i) => <>
                <dt>CA Add({i + 1})</dt>
                <dd>Band {carrier['ScellBand']}</dd>
              </> )}
              </> : ''}
            </dl>
            </>
          ) : props.signal === 'lte' ? 'NO CA' : ''}
          <h3>RSRP</h3>
          <dl>
            <dt>Current:</dt>
            <dd>
              {props.RSRPCurrent ? (
              <>
              {props.RSRPCurrent} <span className="unit">dBm</span>
              </>
              ) : 'N/A'}
            </dd>
            <dt>Best:</dt>
            <dd>
              {props.RSRPBest ? (
              <>
              {props.RSRPBest} <span className="unit">dBm</span>
              </>
              )  : 'N/A'}
            </dd>
          </dl>
          <h3>SNR</h3>
          <dl>
            <dt>Current:</dt>
            <dd>
              {props.SNRCurrent ? (
              <>
              {props.SNRCurrent} <span className="unit">dB</span>
              </>
              ) : 'N/A'}
            </dd>
            <dt>Best:</dt>
            <dd>
              {props.SNRBest ? (
              <>
              {props.SNRBest} <span className="unit">dB</span>
              </>
                ) : 'N/A'}
            </dd>
          </dl>
        </>
      ) : (
        <>
          <h3>RSRQ</h3>
          <dl>
            <dt>Current:</dt>
            <dd>
              {props.RSRQCurrent ? (
              <>
              {props.RSRQCurrent} <span className="unit">dB</span>
              </>
              ) : 'N/A'}
            </dd>
            <dt>Best:</dt>
            <dd>
              {props.RSRQBest ? (
              <>
              {props.RSRQBest} <span className="unit">dB</span>
              </>
              ) : 'N/A'}
            </dd>
          </dl>
        </>
      )}
    </div>
  );
}

export default Card;
