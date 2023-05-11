import { useAppDispatch, useAppSelector } from '@/app/store';
import SimpleLoader from '@/components/loading/simpleLoader';
import { messageClusterTimeThreshold } from '@/constant/value';
import { resetMessagePage, selectMessagePage, selectTotalPages } from '@/reducers/chatSlice';
import { getListMessage } from '@/reducers/messageAction';
import { selectUser } from '@/reducers/userSlice';
import { formatDateTime } from '@/utils/date';
import { NextRouter, useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import MessageItem from '../messageItem';
import styles from './list-message.module.scss';

interface IProps {
    listMessage: IMessageApi[];
    className?: string;
}

interface IMessageCluster {
    time: Date;
    messages: IMessageApi[];
}

const groupMessagesIntoClusters = (messages: IMessageApi[]): IMessageCluster[] => {
    const clusters: IMessageCluster[] = [];

    for (let i = 0; i < messages.length; i++) {
        const currMessage = messages[i];
        const currTime = new Date(currMessage.createdAt);
        const currCluster = clusters[clusters.length - 1];

        if (!currCluster || currTime.getTime() - currCluster.time.getTime() > messageClusterTimeThreshold) {
            clusters.push({
                time: currTime,
                messages: [currMessage],
            });
        } else {
            currCluster.messages.push(currMessage);
        }
    }

    return clusters;
};

const RerenderTimeLine = ({ cluster }: { cluster: IMessageCluster }) => {
    return <p style={{ textAlign: 'center' }}>{formatDateTime(cluster.time)}</p>;
};

export default function ListMessage({ listMessage, className }: IProps) {
    const [isScrollToBottom, setIsScrollToBottom] = useState<boolean>(true);
    const [isLoadingMoreMessages, setIsLoadingMoreMessages] = useState<boolean>(false);

    const sUser = useAppSelector(selectUser);
    const messageClusters = groupMessagesIntoClusters(listMessage);
    const totalPages = useAppSelector(selectTotalPages);
    const messagePage = useAppSelector(selectMessagePage);
    const router: NextRouter = useRouter();
    const { id } = router.query;
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(resetMessagePage());
    }, []);

    const handleScroll = async (event: React.UIEvent<HTMLDivElement>) => {
        const scrollTop = event.currentTarget.scrollTop;
        if (messagePage < totalPages && scrollTop === 0) {
            setIsScrollToBottom(false);
            setIsLoadingMoreMessages(true);

            await dispatch(
                getListMessage({
                    conversationId: id as string,
                    lastMessageId: listMessage[0].id,
                }),
            );
            setIsLoadingMoreMessages(false);
        }
    };

    return (
        <div
            style={{
                height: className,
            }}
            className={styles.container}
            onScroll={handleScroll}
        >
            {isLoadingMoreMessages && <SimpleLoader />}
            {messageClusters.length ? (
                <>
                    {messageClusters.map((cluster: IMessageCluster, index: number) => (
                        <div key={index}>
                            <RerenderTimeLine cluster={cluster} />
                            {cluster.messages.map((message: IMessageApi, index: number) => (
                                <div key={index}>
                                    <MessageItem
                                        isMe={message.senderId === sUser.userId}
                                        message={message}
                                        isScrollToBottom={isScrollToBottom}
                                    />
                                </div>
                            ))}
                        </div>
                    ))}
                </>
            ) : (
                <div>Chưa có tin nhắn</div>
            )}
        </div>
    );
}
