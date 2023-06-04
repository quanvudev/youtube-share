import { Injectable } from '@nestjs/common';
import { DbService } from '../../core/db/db.service';

@Injectable()
export class UserService {
  public constructor(private readonly dbService: DbService) {
    //
  }
  findOne(id: number) {
    return this.dbService.user.findUnique({ where: { id } }).then((r) => {
      if (!r) return null;
      delete r.password;
      return r;
    });
  }

  findByEmail(email: string) {
    return this.dbService.user.findUnique({ where: { email } });
  }

  addSocketId(id: number, socketId: string) {
    return this.dbService.user.update({
      where: { id },
      data: { socketId },
    });
  }

  removeSocketId(socketId: string) {
    return this.dbService.user.updateMany({
      where: { socketId },
      data: { socketId: null },
    });
  }
}
