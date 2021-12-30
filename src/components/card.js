import React from 'react';

function Card(props) {

  return (
    <div className={props.signal}>
      <h2>{props.title}</h2>
      {props.main ? (
        <>
          <h3>Band {props.band}</h3>
          <h3>RSRP</h3>
          <dl>
            <dt>Current:</dt>
            <dd>
              {props.RSRPCurrent ? (
              <>
              {props.RSRPCurrent} <span className="unit">dBm</span>
              </>
              ) : ''}
            </dd>
            <dt>Best:</dt>
            <dd>
              {props.RSRPBest ? (
              <>
              {props.RSRPBest} <span className="unit">dBm</span>
              </>
              )  : ''}
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
              ) : ''}
            </dd>
            <dt>Best:</dt>
            <dd>
              {props.SNRBest ? (
              <>
              {props.SNRBest} <span className="unit">dB</span>
              </>
                ) : ''}
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
              ) : ''}
            </dd>
            <dt>Best:</dt>
            <dd>
              {props.RSRQBest ? (
              <>
              {props.RSRQBest} <span className="unit">dB</span>
              </>
              ) : ''}
            </dd>
          </dl>
        </>
      )}
    </div>
  );
}

export default Card;
