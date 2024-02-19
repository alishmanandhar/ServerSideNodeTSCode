import User from '../models/User';
import { FilterQuery } from 'mongoose';

// Create UserData Interface 
interface UserData {
    id: string; // Assuming ObjectId is converted to string
    name: string;
    age: number;
    bio?: string;
    createdAt: Date;
}

interface FilterParameters{
    pageNumber:number,
    number:number,
    name:string,
    sort:string
}

const resolvers = {
    Query: {
        async user(_:void, {ID}:{ID:string}): Promise<User|null> {
            return await User.findById(ID)
        },
        // getUsers is used to get users, search users and sort users
        async getUsers(_:void,{pageNumber,number,name,sort}:FilterParameters):Promise<User[]>{
            let filter:FilterQuery<User> = {}

            // where number is number of data we want in pagination and skip is number of data to skip
            const skip = (pageNumber - 1) * number;
            
            // If name is provided, add it to the filter
            if (name) {
                filter.name = { $regex: name, $options: "i" }; // Case-insensitive search
            }

            return await User.find(filter)
                .sort({createdAt:sort=="asc"?1:-1})
                .skip(skip)
                .limit(number)
        }
    },
    Mutation: {
        // create new user
        async createUser(_:void,{userInput: {name,age,bio}}:{userInput:User}):Promise<UserData>{
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
        async deleteUser(_:void, {ID}:{ID:string}):Promise<number>{
            const wasDeleted = (await User.deleteOne({_id: ID})).deletedCount;
            return wasDeleted;//1 if user has been deleted and, 0 if nothing has been deleted!
        },
        //updating user
        async editUser(_:void, {ID, userInput: {name, age, bio, createdAt}}:{ID:string, userInput: User}):Promise<number>{
            const wasEdited = (await User.updateOne({_id: ID},{name:name, age:age, bio:bio, createdAt:createdAt})).modifiedCount;
            return wasEdited; //1 if user has been edited and , 0 if nothing has been edited!
        }
    }
}

export default resolvers;