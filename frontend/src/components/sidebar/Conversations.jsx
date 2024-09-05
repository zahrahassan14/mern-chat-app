import useGetConversations from '../../hooks/useGetConversations';
import { getRandomEmoji } from '../../utils/emojis';
import Conversation from './Conversation';
import { useState } from 'react';

const Conversations = () => {
  const { loading, conversations } = useGetConversations();
  const [filter, setFilter] = useState('latest');

  const filteredConversations = conversations.sort((a, b) => {
    if (filter === 'alphabetical') return a.fullName.localeCompare(b.fullName);
    return new Date(b.lastMessageDate) - new Date(a.lastMessageDate); // Sort by latest
  });

  return (
    <div className="py-2 flex flex-col overflow-auto">
      <div className="filter-options flex gap-2 mb-2">
      
        <button onClick={() => setFilter('alphabetical')} className="bg-gray-300 px-2 py-1 rounded">
          A-Z
        </button>
      </div>

      {filteredConversations.map((conversation, idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          emoji={getRandomEmoji()}
          lastIdx={idx === conversations.length - 1}
        />
      ))}

      {loading ? <span className='loading loading-spinner mx-auto'></span> : null}
    </div>
  );
};

export default Conversations;
