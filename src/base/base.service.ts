import { Model, Document } from 'mongoose';

export class BaseService<Entity> {
  constructor(private entityModel: Model<Entity & Document>) {}

  async create(entity: Entity): Promise<any> {
    try {
      const newEntity = new this.entityModel(entity);
      const result = await newEntity.save();
      return result.id;
    } catch (err) {
      return false;
    }
  }

  async findOne(id: string): Promise<Entity> {
    return this.responeFormat(await this.entityModel.findById(id));
  }

  async findAll(): Promise<Entity[]> {
    const entities = await this.entityModel.find();
    return Promise.all(entities.map(async (entity) => await this.responeFormat(entity)));
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.entityModel.deleteOne({ _id: id });
      return true;
    } catch (err) {
      return false;
    }
  }

  async updateOne(id: string, entity: Entity): Promise<boolean> {
    try {
      const res = await this.entityModel.findByIdAndUpdate(id, entity, { new: true });
      return true;  
    } catch (err) {
      return false;
    }
  }

  private async responeFormat(entity: Entity): Promise<any> {
    const {_id, ...result} = JSON.parse(JSON.stringify(entity));
    return {
      id: _id,
      ...result
    }
  }
}
