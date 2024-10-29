import { FC } from 'react';

interface CookieSetting {
  label: string;
  enabled: boolean;
}

const cookieSettings: CookieSetting[] = [
  { label: "Strictly Necessary", enabled: true },
  { label: "Functional Cookies", enabled: true },
  { label: "Performance Cookies", enabled: true },
];

export const CookieSettings: FC = () => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md text-white space-y-4">
      <h4 className="text-lg font-semibold">Cookie Settings</h4>
      {cookieSettings.map((setting, idx) => (
        <div key={idx} className="flex items-center justify-between">
          <span>{setting.label}</span>
          <input
            type="checkbox"
            checked={setting.enabled}
            className="bg-primary w-5 h-5 rounded-full"
            readOnly
          />
        </div>
      ))}
    </div>
  );
};
