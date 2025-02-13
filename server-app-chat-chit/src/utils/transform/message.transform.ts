import Message from "@/models/message.model";

import { MessageType } from "@/resources/messaging/enum/message.type.enum";
import { RawDataMysql } from "@/models/raw.data";
import { HttpStatus, MyException } from "@/lib/common";

export class TransformMessage {
    static async fromRawsData(raws: RawDataMysql[], callback?: (id: string) => Promise<string | null | undefined>): Promise<Message[]> {
        let arrMessage: Array<Message> = [];
        for (let raw of raws) {
            const { content,
                createAt,
                groupId,
                messageId,
                userId,
                replyMessageId,
                status,
                type,
                memberId } = raw
            let value = new Message(
                content,
                createAt,
                groupId,
                messageId,
                userId,
                replyMessageId,
                status,
                type,
                memberId
            );
            if (value.type == MessageType.IMAGE || value.type == MessageType.VIDEO) {
                let url = await callback!(value.content)
                if (url) {
                    value.content = url
                } else throw new MyException("Lỗi xử lí url ảnh").withExceptionCode(HttpStatus.INTERNAL_SERVER_ERROR)
            }
            arrMessage.push(value)
        }
        return arrMessage
    }
    static async fromRawData(object: any, callback? : (id: string) => Promise<string | null | undefined>): Promise<Message> {
        const { content,
            createAt,
            groupId,
            messageId,
            userId,
            replyMessageId,
            status,
            type,
            memberId } = object;
        let value = new Message(
            content,
            createAt,
            groupId,
            messageId,
            userId,
            replyMessageId,
            status,
            type,
            memberId
        );
        if (value.type == MessageType.IMAGE || value.type == MessageType.VIDEO) {
            let url = await callback!(value.content)
            if (url) {
                value.content = url
            } else throw new MyException("Lỗi xử lí url ảnh").withExceptionCode(HttpStatus.INTERNAL_SERVER_ERROR)
        }

        return value
    }
}