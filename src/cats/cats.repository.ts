import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Cat } from "./cats.schema";
import { Model } from "mongoose";
import { CatsRequestDto } from "./dto/cats.request.dto";

@Injectable()
export class CatsRepository {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {
  }

  async findCatByIdWithoutPassword(catId: string): Promise<Cat | null> {
    const cat = await this.catModel.findById(catId).select('-password');
    return cat;
  }

  async findCatByEmail(email: string) {
    const cat = await this.catModel.findOne({ email });
    return cat;
  }

  async existsByEmail(email: string) {
    try {
      const result = await this.catModel.exists({ email });
      return result;
    } catch (e) {
      throw new HttpException('db error', 400);
    }
  }

  async create(cat: CatsRequestDto) {
    return await this.catModel.create(cat);
  }
}