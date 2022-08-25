/** @jsxImportSource @emotion/react */

import { mq } from '../../styles/mq';
import React from 'react';
import { ThemeContext } from '../../context/theme-context';
import { useRouter } from 'next/router';

interface AuthPanelButtonProps {
  type: string;
  label: string;
  onClick: VoidFunction;
}

export const AuthPanelButton: React.FC<AuthPanelButtonProps> = ({
  type,
  label,
  onClick,
}) => {
  const router = useRouter();
  const theme = React.useContext(ThemeContext);
  let style;
  if (type === 'primary') {
    style = theme.components.buttonPrimary;
  } else if (type === 'secondary') {
    style = theme.components.buttonSecondary;
  }

  return (
    <button
      css={mq({
        ...(style as { [key: string]: string }),
        padding: '12px 28px',
        fontSize: '14px',
        fontWeight: 700,
        outline: 'none',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
      })}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      {label}
    </button>
  );
};
