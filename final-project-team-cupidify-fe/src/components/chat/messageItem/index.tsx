import { Image } from 'antd';
import React, { useEffect, useRef } from 'react';
import { TypeMessage } from '../../../types/enum';
import styles from './message-item.module.scss';

interface IMessageApi {
    type: TypeMessage;
    content: string;
}

interface IProps {
    message: IMessageApi;
    isMe: boolean;
    isScrollToBottom: boolean;
}

interface ITextContainer {
    message: IMessageApi;
    index: string;
    isMe?: boolean;
}

interface Props {
    children: React.ReactNode;
    isScrollToBottom: boolean;
}

const ScrollToBottom = ({ children, isScrollToBottom }: Props) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        const images = messagesEndRef.current?.parentElement?.querySelectorAll('img');

        const handleImageLoad = (): void => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        images?.forEach((img) => {
            if (!img.complete) {
                img.addEventListener('load', handleImageLoad);
            }
        });

        return () => {
            images?.forEach((img) => {
                img.removeEventListener('load', handleImageLoad);
            });
        };
    }, [children]);

    return (
        <section>
            {children}
            {isScrollToBottom && <div ref={messagesEndRef} />}
        </section>
    );
};

const TextContainer = ({ message, index, isMe }: ITextContainer) => {
    return (
        <div className={isMe ? styles.textContainer : styles.textContainer__notMe} key={index}>
            <p className={isMe ? styles.textContainer__title : styles.textContainer__notMe__title}>{message.content}</p>
        </div>
    );
};

const ImageContainer = ({ message, index, isMe }: ITextContainer) => {
    return (
        <div className={`${isMe ? styles.imageContainer : styles.imageContainer__notMe}`} key={index}>
            <Image src={message.content} className="border-image-chat" alt="img" key={index} />
        </div>
    );
};

const MessageItem = ({ message, isMe, isScrollToBottom }: IProps) => {
    const isText: boolean = message.type === TypeMessage.TEXT;
    return (
        <ScrollToBottom isScrollToBottom={isScrollToBottom}>
            {isText ? (
                <TextContainer message={message} isMe={isMe} index={message.content} />
            ) : (
                <ImageContainer message={message} isMe={isMe} index={message.content} />
            )}
        </ScrollToBottom>
    );
};

export default MessageItem;
