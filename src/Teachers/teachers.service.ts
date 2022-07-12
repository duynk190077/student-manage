import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from 'src/base/base.service';
import { ClassroomsService } from 'src/Classrooms/classrooms.service';
import { StudentsService } from 'src/Students/students.service';
import { StudentMarksService } from 'src/Student_marks/student_marks.service';
import { TeachingService } from 'src/Teachings/teaching.service';
import { User } from 'src/Users/user.model';
import { UsersService } from 'src/Users/users.service';
import { Teacher, TeacherDocument } from './teacher.model';

@Injectable()
export class TeachersService extends BaseService<Teacher> {
  constructor(
    @InjectModel('Teacher') private teacherModel: Model<TeacherDocument>,
    @Inject(forwardRef(() => UsersService)) private userService: UsersService,
    @Inject(forwardRef(() => StudentMarksService))
    private studenMarkService: StudentMarksService,
    @Inject(forwardRef(() => ClassroomsService))
    private classroomService: ClassroomsService,
    private teachingService: TeachingService,
    @Inject(forwardRef(() => StudentsService))
    private studentService: StudentsService,
  ) {
    super(teacherModel);
  }

  async updateImg(userId: string, imageUrl: string): Promise<any> {
    try {
      const result = await this.teacherModel.findOneAndUpdate(
        { user: userId },
        { image: imageUrl },
        { new: true },
      );
      return imageUrl;
    } catch (error) {
      return false;
    }
  }

  async createTeacher(entity: Teacher): Promise<any> {
    try {
      const newUser: User = {
        username: entity.phoneNumber,
        password: entity.phoneNumber,
        roles: 'Teacher',
      };
      const id = await this.userService.create(newUser);
      const newTeacher = {
        ...entity,
        user: id,
      };
      const result = await this.create(newTeacher);
      return result;
    } catch (err) {
      return false;
    }
  }

  async findOneByUserId(userId: string): Promise<Teacher> {
    return this.teacherRespone(
      await this.teacherModel.findOne({ user: userId }),
    );
  }

  async findManyBySubject(subject: string): Promise<any> {
    const teachers = await this.teacherModel.find({ subject: subject });
    return Promise.all(
      teachers.map((teacher) => {
        const { _id, ...result } = JSON.parse(JSON.stringify(teacher));
        return {
          id: _id,
          ...result,
        };
      }),
    );
  }

  async findMarks(semester: string, id: string): Promise<any> {
    const teachings = await this.teachingService.teachingofTeacher(id);
    const result = Promise.all(
      teachings.map(async (p) => {
        const classroom = await this.classroomService.findClassByName(p.class);
        const students = await this.studentService.findManyByClass(
          classroom.id,
        );
        const studentmarks = await Promise.all(
          students.map(async (student) => {
            const studentmark = await this.studenMarkService.findByStudentId(
              semester,
              student.id,
              p.subject,
            );
            const { _id, factor1, factor2, factor3, ...other } = JSON.parse(
              JSON.stringify(studentmark),
            );
            return {
              student: student.id,
              fullName: `${student.firstName} ${student.lastName}`,
              id: _id,
              semester: semester,
              factor1: factor1,
              factor2: factor2,
              factor3: factor3,
            };
          }),
        );
        return {
          class: p.class,
          studentmarks: studentmarks,
        };
      }),
    );
    return result;
  }

  private async teacherRespone(teacher: Teacher): Promise<any> {
    return {
      id: teacher.id,
      firstName: teacher.firstName,
      lastName: teacher.lastName,
      gender: teacher.gender,
      dateofBirth: teacher.dateofBirth,
      phoneNumber: teacher.phoneNumber,
      email: teacher.email,
      subject: teacher.subject,
      image: teacher.image,
    };
  }
}
