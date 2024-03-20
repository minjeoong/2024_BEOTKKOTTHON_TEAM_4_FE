'use client';

import * as React from 'react';
import { VerificationInputWrap } from './style';
import Image from 'next/image';
import { css } from '@emotion/react';

import { Colors, Icons, Images } from '@globalStyles';
import { Fragment, useRef, useState } from 'react';

export default function VarificationInput({
  onChangeValue,
}): React.JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);
  const Button = ['cell1', 'cell2', 'cell3', 'cell4', 'cell5', 'cell6'];

  const [active, setActive] = React.useState(0); //현재 입력된 숫자 인덱스
  const [password, setPassword] = React.useState(''); //현재 입력된 숫자

  return (
    <VerificationInputWrap>
      <button
        className="button"
        onClick={() => {
          inputRef.current?.focus();
          setActive(password.length);
        }}
      >
        {Button.map((item, index) => (
          <div
            id={item}
            key={index}
            className={
              active === index
                ? 'password_cell_active'
                : 'password_cell_disabled'
            }
          >
            <div className="mt-2">{password[index]}</div>
          </div>
        ))}
      </button>
      <input
        className={'input'}
        ref={inputRef}
        id="password"
        type="text"
        maxLength={6}
        value={password} //password
        onChange={(e) => {
          setPassword(e.target.value);
          setActive(e.target.value.length - 1);
        }}
      />
    </VerificationInputWrap>
  );
}