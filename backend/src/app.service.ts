import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getProjects() {
    return [
	{id:1, name: '倉庫管理Webアプリ', status: 'In Progress'},
	{id:2, name: '配送管理Webアプリ', status: 'Completed'},
	{id:3, name: '部品物流ポータル', status: 'Planned'},
	];
  }
}
