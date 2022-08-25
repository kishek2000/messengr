/* eslint-disable @next/next/no-img-element */
/** @jsxImportSource @emotion/react */

import React from 'react';
import { ThemeContext } from '../../context/theme-context';
import { mq } from '../../styles/mq';

interface ChatAvatarProps {
  avatar?: string;
  size?: string;
}

export const ChatAvatar: React.FC<ChatAvatarProps> = ({
  avatar = '',
  size = 'medium',
}) => {
  const theme = React.useContext(ThemeContext);

  const getSize = () => {
    switch (size) {
      case 'large':
        return {
          width: ['60px', '68px'],
          height: ['60px', '68px'],
        };
      case 'medium':
        return {
          width: ['48px', '56px'],
          height: ['48px', '56px'],
        };
      case 'small':
        return {
          width: ['24px', '28px'],
          height: ['24px', '28px'],
        };
      default:
        break;
    }
  };

  const defaultStyle = avatar === '' ? theme.components.chatAvatar : {};

  return (
    <div
      css={mq({
        ...(defaultStyle as { [key: string]: string }),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        overflow: 'none',
        ...getSize(),
      })}
    >
      {avatar !== '' ? (
        <img
          css={mq({
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: '50% 50%',
            borderRadius: '50%',
          })}
          src={avatar}
          alt=""
        />
      ) : null}
    </div>
  );
};
