import { Component } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import { UserModel } from './user.model';
import { ApiService } from '../shared/api.service';
import { GetUser } from '../store/actions/user.action';
import { Store } from '@ngxs/store';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  user:any= FormGroup;
  usermodelobj: UserModel = new UserModel();
  Userdata!: any;
  submitted = false;
  showAdd !: boolean;
  showUpdate !: boolean;
  constructor(private formbuilder: FormBuilder,
    private api: ApiService,
    private store: Store){}

  ngOnInit(): void{
    this.user = this.formbuilder.group({
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      emailid: ['',[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      mobile: ['',Validators.required]
    })
    this.getAllUser();  
  }

  postUserDetails(){
    this.submitted = true;
    if (this.user.invalid) {
      return; // Make sure this 'return' statement is inside the onSubmit() method.
    }

    this.usermodelobj.firstName = this.user.value.firstName;
    this.usermodelobj.lastName = this.user.value.lastName;
    this.usermodelobj.emailid = this.user.value.emailid;
    this.usermodelobj.mobile = this.user.value.mobile;

    this.api.postUser(this.usermodelobj).subscribe(res=>{
      console.log(res);
      alert("user added successfully");
      // let ref= document.getElementById('cancel');
      // // ref?.click();
      // this.user.reset();
      // this.getAllUser();
     
    },
    err=>{
      alert("Something went wrong");
    })
    
  }
  clickAddUser(){
    this.user.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
getAllUser(){
  this.store.dispatch(new GetUser()); 
  // console.log(this.Userdata);
  // this.api.getUser().subscribe(res=>{
  //   this.Userdata = res;
  // })
}

deleteUser(data:any){
  // console.log(data);
  this.api.deleteUser(data.id).subscribe(res=>{
    alert('Data has been deleted');
    this.getAllUser();
  })
}

onEdit(data:any){
  this.showAdd = false;
  this.showUpdate = true;

  this.usermodelobj.id = data.id;
  this.user.controls['firstName'].setValue(data.firstName);
  this.user.controls['lastName'].setValue(data.lastName);
  this.user.controls['emailid'].setValue(data.emailid);
  this.user.controls['mobile'].setValue(data.mobile);
 
}

updateUserDetails(){
  
  this.usermodelobj.firstName = this.user.value.firstName;
  this.usermodelobj.lastName = this.user.value.lastName;
  this.usermodelobj.emailid = this.user.value.emailid;
  this.usermodelobj.mobile = this.user.value.mobile;
  this.api.updateUser(this.usermodelobj,this.usermodelobj.id)
  .subscribe(res=>{
    alert('Update successfully');
    let ref= document.getElementById('cancel');
    // ref?.click();
    this.user.reset();
    this.getAllUser();
  }) 
  }


}
