import React from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";

const formFields = [
  {
    id: "email",
    label: "Email:",
    placeholder: "Digite seu E-mail aqui",
    type: "email",
  },
  {
    id: "password",
    label: "Senha:",
    placeholder: "Digite sua senha aqui",
    type: "password",
  },
  {
    id: "document",
    label: "CNPJ/CPF:",
    placeholder: "Digite seu CNPJ ou CPF aqui",
    type: "text",
  },
];

export const Frame = () => {
  return (
    <div
      className="bg-[#4f5a00] grid justify-items-center [align-items:start] w-screen min-h-screen"
      data-model-id="51:47"
    >
      <div className="bg-[#4f5a00] overflow-hidden w-[281px] h-[554px] relative">
        <div className="w-[284px] h-[350px] -top-7 -left-0.5 bg-[url(https://c.animaapp.com/mf4hrtqcQ1OTcH/img/rectangle-17.svg)] absolute bg-[100%_100%] translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:0ms]">
          <img
            className="absolute w-[281px] h-[311px] top-[29px] left-0.5 object-cover translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]"
            alt="Preview"
            src="https://c.animaapp.com/mf4hrtqcQ1OTcH/img/preview-1.png"
          />
        </div>

        <div className="absolute top-[524px] left-[67px] [font-family:'Inter',Helvetica] font-normal text-white text-[10px] tracking-[0] leading-[normal] whitespace-nowrap translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:800ms]">
          Todos os Direitos reservados©
        </div>

        <Button className="w-[196px] h-[35px] top-[366px] left-[38px] bg-[url(https://c.animaapp.com/mf4hrtqcQ1OTcH/img/rectangle-19.svg)] absolute bg-[100%_100%] border-0 rounded-none p-0 hover:opacity-80 transition-opacity translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms] h-auto">
          <div className="w-[177px] top-[5px] left-3.5 absolute [font-family:'Inter',Helvetica] font-black text-white text-xl tracking-[0] leading-[normal] whitespace-nowrap">
            Deseja comprar?
          </div>
        </Button>

        <Button className="w-[196px] h-[35px] top-[431px] left-[38px] bg-[url(https://c.animaapp.com/mf4hrtqcQ1OTcH/img/rectangle-19.svg)] absolute bg-[100%_100%] border-0 rounded-none p-0 hover:opacity-80 transition-opacity translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:600ms] h-auto">
          <div className="top-1 left-5 absolute [font-family:'Inter',Helvetica] font-black text-white text-xl tracking-[0] leading-[normal] whitespace-nowrap">
            Deseja vender?
          </div>
        </Button>
      </div>
    </div>
  );
};
