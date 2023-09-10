import React, { ReactElement, useEffect, useState } from 'react';
import { assert } from '../util';
import './BytesPanel.css';
import { CommonArgs } from './common';
import { to_domstr_representation } from './HoverStyleBodge';

const BytesPanel = (
  displayFunc: (n: number) => string
): React.FC<CommonArgs> => {
  return React.memo(({ displayText }) => {
    const [children, setChildren] = useState<ReactElement[]>([]);
    const encoder = new TextEncoder();

    useEffect(() => {
      let key = 0;
      const newChildren = [...displayText].flatMap((char, idx) =>
        [...encoder.encode(char)].map((byte) => (
          <div
            data-char={to_domstr_representation(char)}
            data-stridx={idx}
            key={++key}
          >
            {displayFunc(byte)}
          </div>
        ))
      );
      setChildren(() => newChildren);
    }, [displayText]);

    return <div className="BytesPanel">{children}</div>;
  }, (prevProps, nextProps) => prevProps.displayText === nextProps.displayText);
};

export const BinaryPanel = BytesPanel((byte) =>
  byte.toString(2).padStart(8, "0")
);
export const HexPanel = BytesPanel((byte) =>
  byte.toString(16).padStart(2, "0")
);

