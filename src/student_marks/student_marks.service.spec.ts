import { Test, TestingModule } from '@nestjs/testing';
import { StudentMarksService } from './student_marks.service';

describe('StudentMarksService', () => {
  let service: StudentMarksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentMarksService],
    }).compile();

    service = module.get<StudentMarksService>(StudentMarksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
