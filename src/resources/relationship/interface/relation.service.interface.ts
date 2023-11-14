
import { User } from "@/resources/auth/dtos/user.dto";
import { InviteFriend, InviteFriendDTO } from "../dto/invite.dto";
import { ListFriendDTO } from "../dto/friends.dto";

export interface RelationServiceBehavior {
    deleteInvite(iduser: number, idInvite: number): Promise<boolean>;
    deleteMySentInvite(iduser: number, idInvite: number): Promise<boolean>;
    acceptInviteFriend(iduser: number, idInvite: number): Promise<boolean>;
    unFriend(iduser: number, iduserUnFriend: number): Promise<boolean>;
    getAllInvite(iduser: number, cursor : number, limit : number): Promise<InviteFriendDTO>
    inviteToBecomeFriend(iduser: number, idReceiver: number): Promise<any>;
    getAllFriend(iduser: number, cursor : number, limit : number): Promise<ListFriendDTO>;
}