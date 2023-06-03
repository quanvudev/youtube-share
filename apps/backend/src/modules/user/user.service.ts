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
}
