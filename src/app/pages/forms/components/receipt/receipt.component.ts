import {Component} from '@angular/core';
import { NgUploaderOptions } from 'ngx-uploader';

@Component({
  selector: 'receipt',
  styles: [],
  templateUrl: './receipt.html',
})
export class Receipt {

  public defaultPicture = 'assets/img/theme/no-photo.png';
  public profile:any = {
    picture: 'assets/img/app/profile/Nasta.png'
  };
  public uploaderOptions:NgUploaderOptions = {
    // url: 'http://website.com/upload'
    url: '',
  };

  constructor() {
  }

  ngOnInit() {
  }
}
