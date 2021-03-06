import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseService } from 'src/base/base.service';
import { ClassroomsService } from 'src/Classrooms/classrooms.service';
import { ParentsService } from 'src/Parents/parents.service';
import { User } from 'src/Users/user.model';
import { UsersService } from 'src/Users/users.service';
import { Student, StudentDocument } from './student.model';

@Injectable()
export class StudentsService extends BaseService<Student> {
  constructor(
    @InjectModel('Student') private studentModel: Model<StudentDocument>,
    private classroomService: ClassroomsService,
    private parentService: ParentsService,
    @Inject(forwardRef(() => UsersService)) private userService: UsersService,
  ) {
    super(studentModel);
  }

  async create(entity: Student | any): Promise<any> {
    try {
      const newUser: User = {
        username: entity.phoneNumber,
        password: entity.phoneNumber,
        roles: 'Student',
      };
      const { father, mother, ...student } = entity;
      const id = await this.userService.create(newUser);
      const fatherId = await this.parentService.create(entity.father);
      const motherId = await this.parentService.create(entity.mother);
      const { _id, ...classroom } = JSON.parse(
        JSON.stringify(
          await this.classroomService.findClassByName(entity.class),
        ),
      );
      const newStudent = new this.studentModel({
        ...student,
        parents: [fatherId, motherId],
        user: id,
        class: _id,
      });
      const result = await newStudent.save();
      return result.id;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async findAll(): Promise<Student[]> {
    const students = await this.studentModel.find({ status: 'Học' });
    return Promise.all(
      students.map((student) => {
        const { _id, ...result } = JSON.parse(JSON.stringify(student));
        return {
          id: _id,
          ...result,
        };
      }),
    );
  }

  async updateImg(userId: string, imageUrl: string): Promise<any> {
    try {
      const result = await this.studentModel.findOneAndUpdate(
        { user: userId },
        { image: imageUrl },
        { new: true },
      );
      return imageUrl;
    } catch (error) {
      return false;
    }
  }

  async findOneByUserId(userId: string): Promise<Student> {
    return this.studentRes(await this.studentModel.findOne({ user: userId }));
  }

  async findOneById(id: string): Promise<Student> {
    return this.studentRes(await this.findOne(id));
  }

  async findAllStudent(): Promise<any[]> {
    const students = await this.findAll();
    return Promise.all(students.map(async (p) => await this.studentRes(p)));
  }

  async updateMany(): Promise<boolean> {
    try {
      const students = await this.findAll();
      for (let i = 0; i < students.length; i++) {
        await this.updateClass(students[i]);
      }
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async countDocumentByClass(classId: string): Promise<Number> {
    return await this.studentModel.countDocuments({ class: classId });
  }

  async countDocumentAnalytic(): Promise<any> {
    const totalStudent = await this.studentModel.countDocuments({
      status: 'Học',
    });
    const totalStudentMale = await this.studentModel.countDocuments({
      status: 'Học',
      gender: 'Nam',
    });
    const totalStudentFemale = await this.studentModel.countDocuments({
      status: 'Học',
      gender: 'Nữ',
    });
    return {
      totalStudent,
      totalStudentMale,
      totalStudentFemale,
    };
  }

  async findManyByClass(classId: string): Promise<Student[]> {
    const students = await this.studentModel.find({ class: classId });
    return students.map((p) => {
      const { _id, ...result } = JSON.parse(JSON.stringify(p));
      return {
        id: _id,
        ...result,
      };
    });
  }

  async updateClass(student: Student): Promise<boolean> {
    try {
      const studentAny: any = student;
      let newStudent: Student = student;
      const classroom = await this.classroomService.findOneClassroom(
        studentAny.class,
      );
      let numClass = +classroom.name.substr(0, 2);
      let subClass = classroom.name.substr(2, 2);
      if (numClass === 12) newStudent = { ...newStudent, status: 'Tốt nghiệp' };
      else {
        numClass += 1;
        const newClass = numClass.toString() + subClass;
        const { _id, ...newClassroom } = JSON.parse(
          JSON.stringify(await this.classroomService.findClassByName(newClass)),
        );
        newStudent = {
          ...newStudent,
          class: _id,
        };
      }
      return await this.updateOne(newStudent.id, newStudent);
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  private async studentRes(student: Student): Promise<any> {
    const result = JSON.parse(JSON.stringify(student));
    const parents = await Promise.all(
      result.parents.map(async (p) => await this.parentService.findOne(p)),
    );
    const classroom = await this.classroomService.findOneClassroom(
      result.class,
    );
    return {
      ...result,
      parents: parents,
      class: classroom,
    };
  }
}
