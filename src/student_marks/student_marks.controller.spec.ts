import { Test, TestingModule } from '@nestjs/testing';
import { StudentMarksController } from './student_marks.controller';

describe('StudentMarksController', () => {
  let controller: StudentMarksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentMarksController],
    }).compile();

    controller = module.get<StudentMarksController>(StudentMarksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
