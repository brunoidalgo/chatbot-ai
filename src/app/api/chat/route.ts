import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export async function POST(req: Request) {
    console.log('OPENAI_API_KEY:', process.env.OPENAI_API_KEY); // Debug para verificar se a variável está carregada

    const { messages } = await req.json();

    // Verifica se messages é um array e transforma em string corretamente
    const prompt = Array.isArray(messages)
        ? messages.map(m => m.content).join('\n')
        : String(messages);

    console.log('Prompt enviado:', prompt); // Debug para verificar o que está sendo enviado

    const result = streamText({
        model: openai('gpt-4o-mini'),
        prompt: prompt, // Agora garantimos que seja uma string
        temperature: 1,
        system: "Você é um especialista em automação de testes com frameworks como Cypress, Robot Framework, Playwright e tem conhecimentos avançados em CI/CD. Caso o usuário pergunte algo diferente não responda e o oriente a perguntar somente sobre o tópico relacionado.",
    });

    return result.toDataStreamResponse();
}
