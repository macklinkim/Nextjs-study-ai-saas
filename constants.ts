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
];

export const coworks = [
  {
    name:"김천호",
    avatar:"foreign cause",
    title:"random generated opinion이라 영어로 나오네요.",
    description : "combination separate ship stock market rocket flight put smell colony planning principal current community income bow held spend shot studying bee when dried adjective",
  },
  {
    name:"Allen Thomas",
    avatar:"stage direction",
    title:"deeply west slave believed into remarkable steam common fight",
    description : "sell cage cloth trade constantly particles search beauty fox measure correctly aside mission itself steam jet bank ocean trick sitting birthday coat keep somehow",
  },
  {
    name:"Derek Morris",
    avatar:"fun outside",
    title:"nest perhaps idea easier church music father congress nature",
    description : "money sang fish general wild proper classroom loud from winter want gain rhythm clothing put pan led troops him available paid operation easy nails",
  },
  {
    name:"Janie Mendez",
    avatar:"symbol thought",
    title:"sport creature kind blew diameter stage importance fifty for",
    description : "canal past example everyone account vowel group scale production complete anything metal coffee captain around ball buffalo common my tax increase forward scientific tears",
  },
  {
    name:"Ernest Long",
    avatar:"explanation dinner",
    title:"easy gun article ask pig salmon parent coast greater",
    description : "cave possible life not mountain sport important strip come pale split plus old this means moment vegetable sure scared leather spin hope present something",
  },
  {
    name:"Albert Maldonado",
    avatar:"necessary earth",
    title:"any contrast sum private uncle zoo food simplest made",
    description : "finest milk lake paragraph rich sky replace missing lion cheese page mighty shells seldom too count major though bear nice produce roof simply fellow",
  },
]
