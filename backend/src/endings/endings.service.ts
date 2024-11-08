import { Injectable } from '@nestjs/common';
import { CreateEndingDto } from './dto/create-ending.dto';
import { UpdateEndingDto } from './dto/update-ending.dto';

@Injectable()
export class EndingsService {
  create(createEndingDto: CreateEndingDto) {
    return 'This action adds a new ending';
  }

  findAll() {
    return `This action returns all endings`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ending`;
  }

  update(id: number, updateEndingDto: UpdateEndingDto) {
    return `This action updates a #${id} ending`;
  }

  remove(id: number) {
    return `This action removes a #${id} ending`;
  }
}
