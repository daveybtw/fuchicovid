import { Injectable } from '@nestjs/common';
import { RegistrantesService } from 'src/registrantes/registrantes.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly funcionarioService: RegistrantesService
    ){}

    public async validateUser(username, pass): Promise<any>{
        var userFind = await this.funcionarioService.findUsernameAndPassword(username, pass);
        console.log(userFind);
        if(userFind.length != 0){
            return userFind;
        } else {
            return null;
        }
        
    }
}
