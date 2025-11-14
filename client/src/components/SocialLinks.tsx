import { Mail, Github, Linkedin, Download, Phone } from "lucide-react";

interface SocialLinksProps {
  email: string;
  github: string;
  linkedin: string;
  phone: string;
  className?: string;
  showLabels?: boolean;
}

export default function SocialLinks({
  email,
  github,
  linkedin,
  phone,
  className = "",
  showLabels = false,
}: SocialLinksProps) {
  const links = [
    {
      id: "email",
      icon: Mail,
      href: `mailto:${email}`,
      label: "Email",
      color: "hover:text-red-500 hover:border-red-500",
      bgColor: "hover:bg-red-500/10",
    },
    {
      id: "github",
      icon: Github,
      href: `https://github.com/${github}`,
      label: "GitHub",
      color: "hover:text-gray-700 hover:border-gray-700",
      bgColor: "hover:bg-gray-700/10",
      external: true,
    },
    {
      id: "linkedin",
      icon: Linkedin,
      href: `https://linkedin.com/in/${linkedin}`,
      label: "LinkedIn",
      color: "hover:text-blue-600 hover:border-blue-600",
      bgColor: "hover:bg-blue-600/10",
      external: true,
    },
    {
      id: "phone",
      icon: Phone,
      href: `tel:${phone}`,
      label: "Phone",
      color: "hover:text-green-500 hover:border-green-500",
      bgColor: "hover:bg-green-500/10",
    },
  ];

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {links.map((link) => {
        const Icon = link.icon;
        return (
          <a
            key={link.id}
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
            className={`w-12 h-12 rounded-full bg-card/50 backdrop-blur border border-border/50 flex items-center justify-center transition-all ${link.color} ${link.bgColor}`}
            title={link.label}
          >
            <Icon className="w-5 h-5" />
          </a>
        );
      })}
    </div>
  );
}
