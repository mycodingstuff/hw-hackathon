import { FC } from 'react';

export const PaymentMethod: FC = () => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md text-white space-y-4">
      <h4 className="text-lg font-semibold">Payment Method</h4>
      <input
        type="text"
        placeholder="Name"
        className="bg-gray-700 text-white p-2 rounded-md w-full"
      />
      <input
        type="text"
        placeholder="City"
        className="bg-gray-700 text-white p-2 rounded-md w-full"
      />
      <input
        type="text"
        placeholder="Card Number"
        className="bg-gray-700 text-white p-2 rounded-md w-full"
      />
      {/* Add more fields as necessary */}
      <button className="bg-primary w-full py-2 rounded-md mt-4">Continue</button>
    </div>
  );
};
