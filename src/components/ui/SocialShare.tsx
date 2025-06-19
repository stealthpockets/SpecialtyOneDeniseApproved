import { TwitterShareButton, LinkedinShareButton, FacebookShareButton, EmailShareButton } from 'react-share';
import { Twitter, Linkedin, Facebook, Mail } from 'lucide-react';

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
  variant?: 'default' | 'minimal' | 'large';
  className?: string;
}

export const SocialShare = ({ 
  url, 
  title, 
  description = '', 
  variant = 'default',
  className = '' 
}: SocialShareProps) => {
  const baseButtonClass = "flex items-center justify-center transition-all duration-200 font-medium";
  
  const buttonVariants = {
    default: "px-4 sm:px-6 py-3 min-h-[44px] border-2 rounded-lg text-sm md:text-base",
    minimal: "p-3 rounded-full hover:scale-110",
    large: "px-6 sm:px-8 py-3 md:py-4 min-h-[44px] rounded-lg text-base md:text-lg font-semibold"
  };

  const iconSize = variant === 'large' ? 24 : variant === 'minimal' ? 20 : 18;

  return (
    <div className={`flex flex-wrap gap-3 md:gap-4 ${className}`}>
      <TwitterShareButton url={url} title={title}>
        <div className={`${baseButtonClass} ${buttonVariants[variant]} border-blue-400 text-blue-600 hover:bg-blue-50 hover:border-blue-600 hover:text-blue-700`}>
          <Twitter size={iconSize} className="mr-2" />
          {variant !== 'minimal' && 'Twitter'}
        </div>
      </TwitterShareButton>

      <LinkedinShareButton url={url} title={title} summary={description}>
        <div className={`${baseButtonClass} ${buttonVariants[variant]} border-blue-700 text-blue-800 hover:bg-blue-50 hover:border-blue-800 hover:text-blue-900`}>
          <Linkedin size={iconSize} className="mr-2" />
          {variant !== 'minimal' && 'LinkedIn'}
        </div>
      </LinkedinShareButton>      <FacebookShareButton url={url} hashtag="#SpecialtyOne">
        <div className={`${baseButtonClass} ${buttonVariants[variant]} border-blue-600 text-blue-700 hover:bg-blue-50 hover:border-blue-700 hover:text-blue-800`}>
          <Facebook size={iconSize} className="mr-2" />
          {variant !== 'minimal' && 'Facebook'}
        </div>
      </FacebookShareButton>

      <EmailShareButton url={url} subject={title} body={description}>
        <div className={`${baseButtonClass} ${buttonVariants[variant]} border-gray-400 text-gray-600 hover:bg-gray-50 hover:border-gray-600 hover:text-gray-700`}>
          <Mail size={iconSize} className="mr-2" />
          {variant !== 'minimal' && 'Email'}
        </div>
      </EmailShareButton>
    </div>
  );
};
