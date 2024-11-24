import { UserModel } from "src/app/user/user.model";

export class GetUser{
    static readonly type = '[ User] Get';
}

export class AddUser{
    static readonly type = '[ User] Add'; // it is a unique identifier of our action and 
                                        //we can track our action through this unique identifier
    constructor(public payload:UserModel){}
}
export class DeleteUser{
    static readonly type = '[ User] Delete'; // it is a unique identifier of our action and 
                                         //we can track our action through this unique identifier
    constructor(public payload:UserModel){}                                  
}

export class UpdateUser{
        static readonly type = '[ User] Update'; // it is a unique identifier of our action and 
                                             //we can track our action through this unique identifier
        constructor(public payload:UserModel){}                                     
}