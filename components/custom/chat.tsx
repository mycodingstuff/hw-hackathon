'use client';

import { Attachment, Message } from 'ai';
import { useChat } from 'ai/react';
import { isEmpty } from 'lodash';
import { Session } from 'next-auth';
import { use, useEffect, useState } from 'react';
import useSWR from 'swr';

import { ExtendedSession } from '@/app/(auth)/auth';
import { ChatHeader } from '@/components/custom/chat-header';
import { Message as PreviewMessage } from '@/components/custom/message';
import { useScrollToBottom } from '@/components/custom/use-scroll-to-bottom';
import { HealthData } from '@/db/schema';
import { Model } from '@/lib/model';
import { fetcher } from '@/lib/utils';

import { MultimodalInput } from './multimodal-input';
import { Overview } from './overview';

export function Chat({
  id,
  initialMessages,
  selectedModelName,
  session,
}: {
  id: string;
  initialMessages: Array<Message>;
  selectedModelName: Model['name'];
  session: ExtendedSession;
}) {
  const { data: healthdata, isLoading: isHealthDataLoading } =
    useSWR<HealthData>(`/api/profile`, fetcher, {
      fallbackData: undefined,
      revalidateOnFocus: false,
    });

  useEffect(() => {
    if (!isEmpty(healthdata) && !isHealthDataLoading) {
      console.log(healthdata);
    }
  }, [healthdata, isHealthDataLoading]);

  

  const { messages, handleSubmit, input, setInput, append, isLoading, stop } =
    useChat({
      initialInput: `Act like a nutritionist, like you were a medical professional.
        Please try to analyze the picture and tell me:
        
        Always star with this title: "Should I eat this?" very important always try put the name of the meal first in a title and then answer with a yes or no with a brief description of the why based on my profile data i should or not eat it based on the current time and my meal schedules. 

        Then be extensive and detailed providing information about the possible ingredients of the meal, the macronutrients in a table using grams as unit always include: calories, carbohydrates, proteins, fats, fiber, and sugar. 
        possible healthier alternatives for the meal in the picture or other possible dishes profile data and goals.
        
        Don't tell you can help me analyzing the picture, just provide me the information. Use this data in 
        JSON format as context to help you understand my profile: ${JSON.stringify(healthdata ?? {})}
        
        Put the title using a bolder and bigger font than the rest.
        For the recomendations use a bullet list including: Portion Control, Balanced Diet, Best schedule to eat, Frequency and other possible recomendations with a concise explanation.
        `,
      body: { id, model: selectedModelName },
      initialMessages,
      onFinish: () => {
        window.history.replaceState({}, '', `/chat/${id}`);
      },
      onError: (error) => {
        console.error(error);
      },
    });
    console.log(messages);

  const [messagesContainerRef, messagesEndRef] =
    useScrollToBottom<HTMLDivElement>();

  const [attachments, setAttachments] = useState<Array<Attachment>>([]);

  return (
    <div className="flex flex-col min-w-0 h-dvh bg-background">
      <ChatHeader selectedModelName={selectedModelName} />
      <div
        ref={messagesContainerRef}
        className="flex flex-col min-w-0 gap-6 flex-1 overflow-y-scroll"
      >
        {messages.length === 0 && <Overview session={session} />}

        {messages
          .filter((t) => !t.content.startsWith('Act like a nutritionist'))
          .map((message) => (
            <PreviewMessage
              key={message.id}
              role={message.role}
              content={message.content}
              attachments={message.experimental_attachments}
              toolInvocations={message.toolInvocations}
            />
          ))}

        <div
          ref={messagesEndRef}
          className="shrink-0 min-w-[24px] min-h-[24px]"
        />
      </div>
      <form className="flex mx-auto px-4 bg-background pb-4 md:pb-6 gap-2 w-full md:max-w-3xl">
        <MultimodalInput
          input={input}
          setInput={setInput}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          stop={stop}
          attachments={attachments}
          setAttachments={setAttachments}
          messages={messages}
          append={append}
        />
      </form>
    </div>
  );
}
