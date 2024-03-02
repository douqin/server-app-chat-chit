import { Transform, Type } from "class-transformer";
import { IsBoolean } from "class-validator";

export class LoveStoryDTO {
    @IsBoolean()
    @Type(() => Boolean)
    isLove: boolean
}