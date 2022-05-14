import React, { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import {
  Chat,
  Channel,
  ChannelHeader,
  ChannelList,
  MessageList,
  MessageInput,
  Thread,
  Window,
} from 'stream-chat-react';
import '@stream-io/stream-chat-css/dist/css/index.css';

const filters = { type: 'messaging' };
const options = { state: true, presence: true, limit: 10 };
const sort = { last_message_at: -1 };

const App = () => {
  const [client, setClient] = useState(null);
  const userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoicGF0aWVudC13b29kLTgiLCJleHAiOjE2NTE2MTM5ODZ9.rGU2tn0a0eI4pw6sfUufO0aUEq-PxR14osDuaOMr0A0';

  useEffect(() => {
    const newClient = new StreamChat('dz5f4d5kzrue');

    const handleConnectionChange = ({ online = false }) => {
      if (!online) return console.log('connection lost');
      setClient(newClient);
    };

    newClient.on('connection.changed', handleConnectionChange);

    newClient.connectUser(
      {
        id: 'patient-wood-8',
        name: 'Obi Adama',
        image: 'https://getstream.io/random_png/?id=patient-wood-8&name=patient',
      },
      userToken,
    );

    return () => {
      newClient.off('connection.changed', handleConnectionChange);
      newClient.disconnectUser().then(() => console.log('connection closed'));
    };
  }, []);

  if (!client) return null;

  return (
    <Chat client={client}>
      <ChannelList filters={filters} sort={sort} options={options} />
      <Channel>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  );
};

export default App;