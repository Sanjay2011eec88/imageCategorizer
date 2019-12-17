import { Component, OnInit } from '@angular/core';
import {ImageService} from "../_services/image.service";
import {AlertService} from "../_services/alert.service";
import {Router} from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-admin',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  model: any = {};
  loading = false;
  imagesList = [];
  items = null;
  tagList = [];
  constructor(private imageService: ImageService,
              private alertService: AlertService,
              private spinner: NgxSpinnerService,
              private router: Router) { }

  ngOnInit() {
    this.spinner.show();
    this.getTagList();
    this.gettingListOfImages();
  }

  index = 0;
  avatars = '12345'.split('').map((x, i) => {
    const num = i;
    // const num = Math.floor(Math.random() * 1000);
    return {
      url: `https://picsum.photos/600/400/?${num}`,
      title: `${num}`
    };
  });



  gettingListOfImages(){
    this.imageService.getListOfImagesBasedOnTags(this.tagList)
      .subscribe(data =>{
        console.log(data)
        this.imagesList=data;
      })
  }

  onClick(item){
    let index = this.tagList.indexOf(item);
    if(index === -1){
      this.tagList.push(item)
    }else{
      this.tagList.splice(index, 1)
    }
    this.gettingListOfImages();
  }

  isEnable(item){
    console.log(this.tagList);
    if(this.tagList.indexOf(item) > -1){
      return true;
    }else{
      return false;
    }
  }

  getTagList(){
    this.imageService.getTags()
      .subscribe(data=>{
        this.spinner.hide();
        this.items = data.tagList;
      })
  }
}
