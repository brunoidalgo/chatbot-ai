"use client"

import { useChat } from 'ai/react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { ScrollArea } from '@/components/ui/scroll-area';
import ReactMarkdown from 'react-markdown';

export function Chat() {

    const { messages, input, handleInputChange, handleSubmit } = useChat({
        api: '/api/chat',
        // key: process.env.OPEN_AI_KEY
    });

    return (
        <Card className="w-[440px] max-sm:w-full max-sm:m-6">
            <CardHeader className="text-slate-900">
                <CardTitle>SMAR AI</CardTitle>
                <CardDescription>Estamos aqui para lhe ajudar a entender mais sobre o nosso sistema</CardDescription>
            </CardHeader>
            <CardContent>
                <ScrollArea className='h-[600px] w-full pr-4'>
                    {messages.map(message => {
                        return (
                            <div className="flex gap-3 text-slate-600 text-sm mb-4" key={message.id}>
                                {message.role === 'user' && (
                                    <Avatar>
                                        <AvatarFallback>DF</AvatarFallback>
                                        <AvatarImage src="https://github.com/brunoidalgo.png" className="max-w-[50px] rounded-full" />
                                    </Avatar>
                                )}
                                {message.role === 'assistant' && (
                                    <Avatar>
                                        <AvatarFallback>RS</AvatarFallback>
                                        <AvatarImage src="https://www.smarapd.com.br/assets/core/publica/imagens/logo.png" className="max-w-[50px] rounded-full" />
                                    </Avatar>
                                )}
                                <div className="leading-relaxed">
                                    <span className="block font-bold text-slate-800">{message.role === 'user' ? 'Usuário' : 'SMAR AI'}: </span>
                                    <ReactMarkdown>{message.content}</ReactMarkdown>
                                </div>
                            </div>
                        )
                    })}
                </ScrollArea>
            </CardContent>
            <CardFooter>
                <form className="w-full flex gap-2" onSubmit={handleSubmit}>
                    <Input placeholder="Como posso te ajudar hoje ?" value={input} onChange={handleInputChange} />
                    <Button className='bg-[#14a984] hover:bg-[#77c3aa]' type="submit">Enviar</Button>
                </form>
            </CardFooter>
        </Card>
    )
}