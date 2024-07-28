import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { APIresponse, Customer, Login } from './model/train';
import { FormsModule } from '@angular/forms';
import { TrainService } from './service/train.service';
import { FooterComponent } from './pages/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule,FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  trainServ = inject(TrainService);

  registerdObj: Customer = new Customer();

  loginObject: Login = new Login();

  loggedUser: Customer = new Customer();

  constructor(){
    const localData = localStorage.getItem('irctcApp');
    if(localData != null){
      this.loggedUser = JSON.parse(localData);
    }
  }

  @ViewChild('registerModel') registerElmRef? : ElementRef;
  @ViewChild('loginModel') loginElmRef? : ElementRef;
  openRegister(){ 

    if(this.registerElmRef){
      this.registerElmRef.nativeElement.style.display= 'block';
    }
  }
  closeRegister(){
    if(this.registerElmRef){
      this.registerElmRef.nativeElement.style.display = 'none';
    }
  }
  onRegister(){
    this.trainServ.createNewCustomer(this.registerdObj).subscribe((res:APIresponse)=>{
       if(res.result){
          alert("Registration Success");
          this.closeRegister();
       }else{
        alert(res.message);
       }
    })
  }
  openLogin(){
    if(this.loginElmRef){
      this.loginElmRef.nativeElement.style.display = 'block'
    }
  }
  
  closeLogin(){
    if(this.loginElmRef){
      this.loginElmRef.nativeElement.style.display = 'none'
    }
  }

  onLogin(){
    this.trainServ.loginCustomer(this.loginObject).subscribe((res:APIresponse)=>{
      if(res.result){
        alert("Login Success");
        localStorage.setItem('irctcApp', JSON.stringify(res.data));
        this.loggedUser = res.data;
        this.closeLogin();
      }else{
        alert(res.message);
      }
    })
  }

  onLogOff(){
    this.loggedUser = new Customer();
    localStorage.removeItem('irctcApp');
  }
}
