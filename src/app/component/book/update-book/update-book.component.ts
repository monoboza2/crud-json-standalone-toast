import { Component ,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl,FormGroup, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { BookService } from '../service/book.service';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from '../../toast/service/toast.service';
import { HttpClientModule } from '@angular/common/http';
import { ToastsContainer } from '../../toast/toast.component';
@Component({
  selector: 'app-update-book',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,HttpClientModule],
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.scss'],
  providers:[BookService]
})

export class UpdateBookComponent implements OnInit {
  FormData!:FormGroup;
  isloading!:boolean;
  book$!:any;
  id!:any

  constructor(private builder:FormBuilder,
    private book:BookService,
    private route:ActivatedRoute,
    private toastService:ToastService){}

    ngOnInit(){
      this.route.paramMap.subscribe((params)=>{
        this.id=params.get('id');
        this.book.getBookId(this.id).subscribe((res)=>{
          this.book$=res
          this.FormData.patchValue(this.updateFormValue())
        })
      })
      this.FormData=this.builder.group({
        author:new FormControl(''),
        country:new FormControl(''),
        title:new FormControl(''),
        year:new FormControl(''),
        pages:new FormControl(''),
        language:new FormControl('')
      })
    }

    onSubmit(FormData:any){
      this.book.updateBook(this.id,FormData).subscribe((res)=>{
        this.showToaster("updated","Updated Successfully");
        setTimeout(() => {
          location.href = "/";
        }, 2500);
      })
    }
    
    updateFormValue(){
      return {
        author:this.book$.author,
        country:this.book$.country,
        title:this.book$.title,
        year:this.book$.year,
        pages:this.book$.pages,
        language:this.book$.language
      }
    }

    showToaster(title: string, message: string) {
      this.toastService.show(title, message, {
        classname: 'bg-success text-light',
        delay: 2000,
        autohide: true,
      });
    }

}
