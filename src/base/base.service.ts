import { Model, Document } from 'mongoose';

export class BaseService<Entity> {
  constructor(private entityModel: Model<Entity & Document>) {}

  async create(entity: Entity): Promise<Entity> {
    const newEntity = new this.entityModel(entity);
    const result = await newEntity.save();
    return result;
  }

  async findOne(id: string): Promise<Entity> {
    return await this.entityModel.findById(id);
  }

  async findAll(): Promise<Entity[]> {
    return await this.entityModel.find();
  }

  async delete(id: string): Promise<any> {
    return await this.entityModel.deleteOne({ _id: id });
  }

  async updateOne(id: string, entity: Entity): Promise<Entity> {
    return await this.entityModel.findByIdAndUpdate(id, entity, { new: true });
  }
}
