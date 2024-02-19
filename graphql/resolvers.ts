import User from '../models/User';
import { FilterQuery } from 'mongoose';

// we need to first define filter object
interface UserInput {
    name: {$regix: string; $options: string};
    age: number;
    bio: string;
    createdAt?: Date; // Assuming createdAt is optional
}

const resolvers = {
    Query: {
        async user(_:any, {ID}:{ID:string}): Promise<any> {
            return await User.findById(ID)
        },
        // getUsers is used to get users, search users and sort users
        async getUsers(_:any,{number,name,sort}:{number:number,name:string,sort:string}):Promise<any>{
            let filter:FilterQuery<UserInput> = {}
            
            // If name is provided, add it to the filter
            if (name) {
                filter.name = { $regex: name, $options: "i" }; // Case-insensitive search
            }

            return await User.find(filter).sort({createdAt:sort=="asc"?1:-1}).limit(number)
        }
    },
    Mutation: {
        // create new user
        async createUser(_:any,{userInput: {name,age,bio}}:{userInput:UserInput}):Promise<any>{
            const createdUser = new User({
                name:name,
                age:age,
                bio:bio
            })

            const res = await createdUser.save();//saving to mongodb
            
            return {
                id: res.id,
                ...res.toObject()// Use toObject to get plain JavaScript object representation
            }
        },
        // deleting user
        async deleteUser(_:any, {ID}:{ID:string}):Promise<any>{
            const wasDeleted = (await User.deleteOne({_id: ID})).deletedCount;
            return wasDeleted;//1 if user has been deleted and, 0 if nothing has been deleted!
        },
        //updating user
        async editUser(_:any, {ID, userInput: {name, age, bio, createdAt}}:{ID:string, userInput: UserInput}):Promise<any>{
            const wasEdited = (await User.updateOne({_id: ID},{name:name, age:age, bio:bio, createdAt:createdAt})).modifiedCount;
            return wasEdited; //1 if user has been edited and , 0 if nothing has been edited!
        }
    }
}

export default resolvers;