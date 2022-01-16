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
              <dd>{props.CA.ca.X_ALU_COM_DLCarrierAggregationNumberOfEntries ? `+${props.CA.ca.X_ALU_COM_DLCarrierAggregationNumberOfEntries}` : 'None'}</dd>
              <dt>Upload</dt>
              <dd>{props.CA.ca.X_ALU_COM_ULCarrierAggregationNumberOfEntries ? `+${props.CA.ca.X_ALU_COM_ULCarrierAggregationNumberOfEntries}` : 'None'}</dd>
              {Object.keys(props.CA.ca).filter(key => props.CA.ca.hasOwnProperty(key) && !isNaN(key)).map(key => <>
                <dt>CA Add({key})</dt>
                <dd>Band {props.CA.ca[key]['ScellBand']}</dd>
              </> )}
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
