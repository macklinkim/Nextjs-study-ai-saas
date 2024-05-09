import { ArrowRight, Code, ImageIcon, LayoutDashboard, MessageSquareMore, MessageSquareText, MessagesSquare, Music, Settings, VideoIcon } from "lucide-react";
export const MAX_FREE_COUNTS = 5;
export const tools = [
  {
    label: "메인페이지",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-gray-300",
    bgColor:"text-gray-300/10",
    
  },
  {
    label: "AI 질문(ChatGPT3.5)",
    icon: MessageSquareMore,
    href: "/conversation3",
    color: "text-gray-500",
    bgColor:"text-gray-500/10",
    
  },
  {
    label: "AI 질문(ChatGPT4)",
    icon: MessagesSquare,
    href: "/conversation",
    color: "text-sky-500",
    bgColor:"text-sky-500/10",
    
  },
  {
    label: "AI 질문(Llama3)",
    icon: MessageSquareText,
    href: "/conversation2",
    color: "text-violet-400",
    bgColor:"text-violet-400/10",
    
  },
  {
    label: "이미지 생성",
    icon: ImageIcon,
    href: "/image",
    color: "text-pink-300",
    bgColor:"text-pink-300/10",
    
  },
  {
    label: "비디오 생성",
    icon: VideoIcon,
    href: "/video",
    color: "text-green-300",
    bgColor:"text-green-300/10",
    
  },
  {
    label: "음악 생성",
    icon: Music,
    href: "/music",
    color: "text-sky-300",
    bgColor:"text-sky-300/10",
    
  },
  {
    label: "프로그램 코드 생성",
    icon: Code,
    href: "/code",
    color: "text-orange-300",
    bgColor:"text-orange-300/10",
    
  },
  {
    label: "설정",
    icon: Settings,
    href: "/settings",
    color: "text-gray-400",
    bgColor:"text-gray-400/10",
    
  },
]