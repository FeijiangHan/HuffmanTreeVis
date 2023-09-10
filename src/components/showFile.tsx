import React, { useState } from 'react';
import { assert } from '../util';

const hasNonAsciiCharacters = (str: string) => /[^\u0000-\u007f]/.test(str);
//首先引入
// const {connection} = require('../tools/Mysql')

// testing file input
function GetFile({
  setDisplayText,
  resetPage,
}: {
  setDisplayText: React.Dispatch<React.SetStateAction<string>>;
  resetPage: Function;
}) {
    // //连接数据库
    // connection.connect((err: any) => {
    //   if(err) {
    //       console.log("数据库连接失败");
    //   }
    //   console.log("数据库连接成功");
    // })

    const getDataBaseHandler = () => {

    }
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    resetPage();
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target!.result;
      if (text === null) {
        alert('请选择一个txt文件');
      } else {
        // should be unreachable since we would only get an arraybuffer if that
        // was what we asked the browser for, which we don't, but typescript
        // doesn't know that in this situtation so we still need either a cast or
        // a condition to narrow the type
        assert(
          !(text instanceof ArrayBuffer),
          'unreachable case - file input gave us an arraybuffer unexpectedly',
        );
      }
      if (text !== null && hasNonAsciiCharacters(text)) {
        alert('please select a file with only ascii characters (nice try)');
      } else if (text !== null) {
        setDisplayText(text);
      }
    };
    reader.readAsText(e.target.files![0]);
    e.target.value = '';
  };

  return (
    <>
      <input
        type="file"
        accept=".txt"
        style={{ color: 'transparent' }} // removes the "no file chosen" text
        onChange={(e) => changeHandler(e)}
      />
      {/* <button onClick={getDataBaseHandler}>从数据库获取数据</button> */}
    </>
  );
}

export default GetFile;
