import { HeartIcon, HomeIcon, PlusIcon, UserIcon } from "lucide-react";
import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";

export const FrameProdutor = () => {
  const posts = [
    {
      id: 1,
      username: "Ana_Banana",
      profileImage:
        "https://c.animaapp.com/mf4i8n54IravkL/img/agro-gril--agr-noma--soja-safra-16-17---5909--1.png",
      postImage:
        "https://c.animaapp.com/mf4i8n54IravkL/img/imagem-do-whatsapp-de-2025-05-18---s--17-26-35-c41c43a1.png",
      description:
        "Quantidade: 15, Tipo: Banana, Preco: 15,00, Validade: 2 meses",
    },
    {
      id: 2,
      username: "Zé_do_alface",
      profileImage:
        "https://c.animaapp.com/mf4i8n54IravkL/img/foto-agr-nomo-de-sessenta-anos-inspecion-.png",
      postImage: "https://c.animaapp.com/mf4i8n54IravkL/img/photo-1.png",
      description: "",
    },
  ];

  const navigationItems = [
    {
      icon: HomeIcon,
      src: "https://c.animaapp.com/mf4i8n54IravkL/img/webpagehome-85808-1.png",
    },
    {
      icon: PlusIcon,
      src: "https://c.animaapp.com/mf4i8n54IravkL/img/add-circle-create-expand-new-plus-icon-123218-1.png",
    },
    {
      icon: UserIcon,
      src: "https://c.animaapp.com/mf4i8n54IravkL/img/4092564-about-mobile-ui-profile-ui-user-website-114033-1.png",
    },
  ];

  return (
    <main
      className="bg-white grid justify-items-center w-screen min-h-screen"
      data-model-id="27:3"
    >
      <div className="bg-white overflow-hidden w-[281px] h-[554px] relative translate-y-[-1rem] animate-fade-in opacity-0">
        {/* Header */}
        <header className="flex items-center justify-between p-2 h-[70px] translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
          <div className="flex items-center gap-2">
            <img
              className="w-[45px] h-[49px] object-cover"
              alt="Captura de tela"
              src="https://c.animaapp.com/mf4i8n54IravkL/img/captura-de-tela-21-5-2025-72135-manage-wix-com-removebg-preview-.png"
            />
            <div className="[font-family:'Rozha_One',Helvetica] font-normal text-[#372308] text-4xl tracking-[0] leading-[normal]">
              f
            </div>
          </div>
          <Button variant="ghost" size="sm" className="h-auto p-1">
            <img
              className="w-[22px] h-[22px] object-cover"
              alt="Reorder three icon"
              src="https://c.animaapp.com/mf4i8n54IravkL/img/reorder-three-icon-233999-1.png"
            />
          </Button>
        </header>

        {/* Search Bar */}
        <div className="mx-[75px] mb-4 h-[19px] bg-[#f2f2f2] rounded translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]" />

        {/* Posts Feed */}
        <section className="space-y-4 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:600ms]">
          {posts.map((post, index) => (
            <Card
              key={post.id}
              className="border-none shadow-none bg-transparent"
            >
              <CardContent className="p-0">
                {/* Post Header */}
                <div className="flex items-center gap-2 px-2 mb-2">
                  <Avatar className="w-[35px] h-[35px]">
                    <AvatarImage src={post.profileImage} alt={post.username} />
                    <AvatarFallback>{post.username.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="[font-family:'Inter',Helvetica] font-bold text-black text-[11px] text-center tracking-[0] leading-[normal]">
                    {post.username}
                  </div>
                </div>

                {/* Post Image */}
                <div className="relative mb-2">
                  <img
                    className="w-[281px] h-[139px] object-cover"
                    alt={`Post by ${post.username}`}
                    src={post.postImage}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 left-2 h-auto p-1 hover:bg-white/20 transition-colors"
                  >
                    <HeartIcon className="w-4 h-4 text-white" />
                  </Button>
                </div>

                {/* Post Content */}
                <div className="px-2">
                  <div className="[font-family:'Inter',Helvetica] font-bold text-black text-[10px] tracking-[0] leading-[normal] mb-1">
                    {post.username}
                  </div>
                  {post.description && (
                    <div className="[font-family:'Inter',Helvetica] font-normal text-black text-[10px] tracking-[0] leading-[normal] mb-4">
                      {post.description}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Bottom Navigation */}
        <nav className="absolute bottom-0 left-[-7px] w-[295px] h-8 bg-[#a2ab5e] flex items-center justify-center gap-[28px] translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:800ms]">
          {navigationItems.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              className="h-auto p-1 hover:bg-white/20 transition-colors"
            >
              <img
                className="w-[34px] h-8 object-cover"
                alt={`Navigation ${index + 1}`}
                src={item.src}
              />
            </Button>
          ))}
        </nav>
      </div>
    </main>
  );
};
