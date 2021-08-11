import { Injectable } from '@nestjs/common';
import { HttpService } from "@nestjs/axios";
import { AxiosResponse } from 'axios'
import { Observable } from 'rxjs'


@Injectable()
export class GlobalService {
    constructor(private httpService: HttpService) {
    }

    async login() {
        const result = await this.httpService.request<Observable<AxiosResponse<any>>>({
            url: 'https://xxx',
            method: 'POST',
            params: {
               
            }
        })
        const value = await result.toPromise()
        console.log(value, '登录')

    }

    uploadOrder() {

    }


}
