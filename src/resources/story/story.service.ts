import StoryRepository from "./story.repository";
import iStoryServiceBehavior from "./interfaces/story.service.interface";
import MyException from "@/utils/exceptions/my.exception";
import TransformStory from "@/utils/transform/story.transform";
import { ServiceDrive } from "../../component/cloud/drive.service";
import { HttpStatus } from "@/utils/extension/httpstatus.exception";
export default class StoryService implements iStoryServiceBehavior {
    private storyRepository: iStoryServiceBehavior;
    constructor() {
        this.storyRepository = new StoryRepository();
    }
    async getViewedStory(iduser: number): Promise<any> {
        return await this.getViewedStory(iduser)
    }
    async uploadStory(file: any, iduser : number): Promise<any> {
        if (!file.mimetype.includes('image') && !file.mimetype.includes('video')) {
            throw new MyException("File không hợp lệ").withExceptionCode(HttpStatus.BAD_REQUEST)
        }
        return TransformStory.rawToModel(await this.storyRepository.uploadStory(file, iduser), async (id : string) => {
            return await ServiceDrive.gI().getUrlFile(id);
        })
    }

    async getAllStoryFromFriends(iduser: number): Promise<any> {
        return TransformStory.rawsToModels(await this.storyRepository.getAllStoryFromFriends(iduser), async (id : string) => {
            return await ServiceDrive.gI().getUrlFile(id);
        })
    }
    async deleteStory(idstory: number): Promise<any> {
        return await this.storyRepository.deleteStory(idstory)
    }
    async seeStory(idstory : number, iduser : number): Promise<any> {
        return await this.seeStory(idstory, iduser)
    }
}