/** @jsxImportSource @emotion/react */

import { mq } from '../../styles/mq';
import React from 'react';
import { ThemeContext } from '../../context/theme-context';

interface AuthPanelInputProps {
  name: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (name: string, e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AuthPanelInput: React.FC<AuthPanelInputProps> = ({
  name,
  placeholder,
  type = 'text',
  value,
  onChange,
}) => {
  const theme = React.useContext(ThemeContext);

  return (
    <input
      css={mq({
        ...(theme.input.search as { [key: string]: string }),
        fontSize: ['14px', '16px'],
        width: 'calc(100% - 28px)',
        padding: '14px 14px',
        borderRadius: '4px',
      })}
      placeholder={placeholder}
      autoComplete="false"
      type={type}
      onChange={(e) => onChange(name, e)}
      value={value}
    />
  );
};
