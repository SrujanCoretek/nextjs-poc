import React, { useImperativeHandle, useRef } from 'react';
import {
  INPUT_DISABLE,
  INPUT_ENABLE,
  PRIMARY_INPUT_WRAPPER,
} from '../styles/theme';

export interface Props {
  value?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
  icon?: string;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  [key: string]: unknown;
}

export const defaultProps = {
  disabled: false,
  readOnly: false,
  className: '',
  placeholder: '',
};

type NativeAttrs = Omit<React.InputHTMLAttributes<any>, keyof Props>;

export type InputPropsType = Props & NativeAttrs;

const Input = React.forwardRef<
  HTMLInputElement,
  React.PropsWithChildren<InputPropsType>
>(
  (
    {
      className,
      value,
      label,
      disabled,
      placeholder,
      icon,
      onFocus,
      onBlur,
      ...props
    },
    ref: React.Ref<HTMLInputElement | null>
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => inputRef.current);

    const focusHandler = (e: React.FocusEvent<HTMLInputElement>) => {
      onFocus && onFocus(e);
    };
    const blurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
      onBlur && onBlur(e);
    };

    const classNames =
      PRIMARY_INPUT_WRAPPER +
      ' ' +
      (disabled ? INPUT_DISABLE : INPUT_ENABLE) +
      ' ' +
      className;

    return (
      <React.Fragment>
        <div className="my-auto ">
          <img alt="icon" src={icon} />
        </div>

        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          className={classNames}
          id={label}
          value={value}
          disabled={disabled}
          onFocus={focusHandler}
          onBlur={blurHandler}
          autoComplete="off"
          {...props}
        />
      </React.Fragment>
    );
  }
);

Input.displayName = 'Input';

export default Input;
