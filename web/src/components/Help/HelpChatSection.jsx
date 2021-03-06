import React from 'react';
import { Typography } from 'antd';
import { Subheader } from './HelpStyles';

const { Text } = Typography;

export default function HelpChatSection() {
  return (
    <div style={{ padding: '0 2rem' }}>
      <div style={{ paddingBottom: '2rem' }}>
        <Subheader>
          <Text>Description</Text>
        </Subheader>
        <Text type='secondary' style={{ textIndent: '30px' }}>
          Chat is a feature that allows members in a team to communicate in real time. As it is very basic in its
          implementation, it's mainly aimed for quick conversations. For better text communication within a team, we
          recommend products like Slack or Microsoft Teams. For voice/video communication, software like Zoom, WebEx,
          and Discord can be used. To begin chatting, click on the chat icon at the bottom right of the dashboard:
        </Text>
        <details style={{ outline: 'none', marginTop: '1rem' }}>
          <summary>Image of Chat Icon</summary>
          <img src='/images/help/chat-icon.png' alt='chat' style={{ margin: '0.5rem' }} />
        </details>
      </div>

      <div style={{ paddingBottom: '2rem' }}>
        <Subheader>
          <Text>Features</Text>
        </Subheader>
        <Text type='secondary'>
          In the chat interface, messages from other users will start on the left whereas the current user's messages
          will stick to the right. When hovering over chats, users may see when that message was sent. At the top-right,
          a counter reflecting the number of currently online members can be observed. When clicking the information
          icon at the top-right, the interface will change to show in more detail which members are currently online
          along with their roles.
        </Text>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem 2rem 0 2rem',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <img
              src='/images/help/chat.png'
              style={{ width: '25rem', height: 'auto', margin: '0 2rem 1rem 2rem' }}
              alt='team chat'
            />
          </div>
          <div style={{ textAlign: 'center' }}>
            <img
              src='/images/help/chat-users.png'
              style={{ width: '25rem', height: 'auto', margin: '0 2rem 1rem 2rem' }}
              alt='online users'
            />
          </div>
        </div>
      </div>
    </div>
  );
}
