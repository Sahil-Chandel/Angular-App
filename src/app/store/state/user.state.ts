import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { UserModel } from "src/app/user/user.model";
import { GetUser } from "../actions/user.action";


export class UserStateModel{
    user: UserModel[] | undefined;
}

@State<UserStateModel>({
    name:'anup',
    defaults: {
        user:[],
        
    }
  })
@Injectable()
  export class UserState{
//selector has logic to get state data 
// get user list from state
    @Selector()
    static getUserList(state:UserStateModel){
        return state.user
    }

    @Action(GetUser)
    getAllUser({getState, setState}: StateContext<UserStateModel>){
        console.log('State Action');
    }
    
  }