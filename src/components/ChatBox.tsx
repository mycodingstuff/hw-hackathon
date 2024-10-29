import { FC } from 'react';

export const ChatBox: FC = () => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md text-white flex flex-col space-y-2">
      <div className="bg-gray-700 p-3 rounded-lg">
        <p>Hey, I’m having trouble with my account.</p>
      </div>
      <div className="bg-primary text-white p-3 rounded-lg self-end">
        <p>What seems to be the problem?</p>
      </div>
      <input
        type="text"
        placeholder="Type your message..."
        className="bg-gray-700 text-white p-2 rounded-md mt-4"
      />
    </div>
  );
};
