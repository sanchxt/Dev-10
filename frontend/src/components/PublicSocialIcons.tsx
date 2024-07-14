import { FaInstagram, FaTwitter } from "react-icons/fa6";

const socialIcons = [
  {
    link: "https://www.twitter.com",
    icon: <FaTwitter size={24} color="#000" />,
  },
  {
    link: "https://www.instagram.com",
    icon: <FaInstagram size={24} color="#000" />,
  },
];

const PublicSocialIcons = () => {
  return (
    <div className="flex-grow flex justify-end items-end pb-8 pr-8 gap-8 w-full">
      {socialIcons.map((item, idx) => (
        <a
          href={item.link}
          key={idx}
          className="bg-white/70 p-2 rounded-full"
          target="_blank"
          rel="noreferrer"
        >
          {item.icon}
        </a>
      ))}
    </div>
  );
};

export default PublicSocialIcons;
