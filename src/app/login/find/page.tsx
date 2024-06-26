'use client';

import * as React from 'react';
import { SignupWrapper } from './style';
import { css } from '@emotion/react';

import { Colors, Icons, Images } from '@/styles';
import { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import BackHeader from '@/app/_component/molecule/BackHeader';
import InputForm from '@/app/_component/atom/InputForm';
import FilterModal from '@/app/_component/organism/filterModal';
import { agencyRanges, ageRanges, situationRanges } from '@/constants';
import { OnChangeValueType, ParamsType } from '@/types/globalType';
import {
  parseIdentity,
  filterNumericInput,
  checkParamsFilled,
  SecureLocalStorage,
} from '@/hooks/useUtil';
import BottomButton from '@/app/_component/atom/BottomButton';
import FilterRadioModal from '@/app/_component/organism/filterRadioModal';
import { PATH } from '@/routes/path';

export default function Signup(): React.JSX.Element {
  const [params, setParams] = useState<ParamsType>({
    identity_first: '',
    identity_last: '',
    userName: '',
    phoneNumber: '',
    telecom: '',
  });
  // api 요청 시 identity_first 을 parseIdentity 사용하여 변환

  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const onChangeValue: OnChangeValueType = (field, value) => {
    setParams((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleNextButtonClick = () => {
    if (checkParamsFilled(params)) {
      SecureLocalStorage.setItem('userName', params.userName);
      SecureLocalStorage.setItem('phoneNumber', params.phoneNumber);
      SecureLocalStorage.setItem('telecom', params.telecom);
      SecureLocalStorage.setItem('identity_first', params.identity_first);
      SecureLocalStorage.setItem('identity_last', params.identity_last);

      router.push(PATH.LOGIN_MORE);
    }
  };

  const handleAgencySelect = (selectedOptions) => {
    onChangeValue('telecom', selectedOptions);
    setIsModalOpen(false);
  };
  const resetAgencyOptions = () => {
    onChangeValue('telecom', '');
  };

  return (
    <SignupWrapper>
      <BackHeader title={'아이디/비밀번호 찾기'} url={''} />
      <div className="top">정보를 입력해 주세요</div>
      <div className="container">
        <div className="item">
          <InputForm
            placeholder="이름"
            value={params.userName}
            descriptionTop={'이름'}
            type="text"
            onChange={(e) => {
              onChangeValue('userName', e.target.value);
            }}
          />
        </div>
        <div className="item">
          <InputForm
            placeholder="통신사"
            value={params.telecom}
            descriptionTop={'통신사'}
            rightIcon={Icons.arrow_down}
            type="text"
            customStyle={css`
              & > .input__content > .input__content--right__icon > img {
                width: 24px;
                height: 24px;
              }
            `}
            onClick={() => {
              setIsModalOpen(true);
            }}
            readOnly
          />
        </div>
        <div className="item">
          <InputForm
            placeholder="번호 입력"
            value={params.phoneNumber}
            descriptionTop={'휴대폰 번호'}
            type="text"
            onChange={(e) => {
              let filteredValue = filterNumericInput(e);
              if (filteredValue.length > 11) {
                filteredValue = filteredValue.slice(0, 11);
              }
              onChangeValue('phoneNumber', filteredValue);
            }}
          />
        </div>
        <div className="item">
          <div className="input_title">주민등록번호</div>
          <div className="item_row">
            <InputForm
              placeholder="YYMMDD"
              value={params.identity_first}
              type="text"
              maxLength={6}
              customStyle={css`
                width: 50%;
              `}
              onChange={(e) => {
                let filteredValue = filterNumericInput(e);
                onChangeValue('identity_first', filteredValue);
              }}
            />
            <p>-</p>
            <InputForm
              placeholder=""
              value={params.identity_last}
              type="text"
              maxLength={1}
              customStyle={css`
                width: 60px;
              `}
              onChange={(e) => {
                onChangeValue('identity_last', filterNumericInput(e));
              }}
            />
            <div className="hiden_item">
              <p></p>
              <p></p>
              <p></p>
              <p></p>
              <p></p>
              <p></p>
            </div>
          </div>
        </div>
      </div>

      <Fragment>
        <FilterRadioModal
          isOpen={isModalOpen}
          title="통신사를 선택해 주세요"
          options={agencyRanges}
          selectedOptions={params.telecom}
          onClose={() => setIsModalOpen(false)}
          onOptionSelect={handleAgencySelect}
          onReset={resetAgencyOptions}
        />
      </Fragment>
      <BottomButton
        filled={checkParamsFilled(params)}
        handleNextButtonClick={handleNextButtonClick}
      />
    </SignupWrapper>
  );
}
