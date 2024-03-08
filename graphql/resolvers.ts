import User from '../models/User';
import Icon from '../models/Icon';
import { FilterQuery } from 'mongoose';
import Marker from '../models/Marker';

// Create UserData Interface 
interface UserData {
    id: string; // Assuming ObjectId is converted to string
    name: string;
    age: number;
    bio?: string;
    createdAt: Date;
}

interface IconData {
    id: string; // Assuming ObjectId is converted to string
    name: string;
    path: string;
    createdAt: Date;
}

interface MarkerData {
    id: string; // Assuming ObjectId is converted to string
    title: string;
    lat: number;
    long: number;
    rotation: number;
    color: string;
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
        },
        async getIcons(_:void,):Promise<Icon[]>{
            return await Icon.find();
        },
        async icon(_:void, {ID}:{ID:string}): Promise<Icon|null> {
            return await Icon.findById(ID)
        },
        async getMarkers(_:void,):Promise<Marker[]>{
            return await Marker.find();
        },
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
        },
        async createIcon(_:void,{iconInput: {name}}:{iconInput:{name:string}}):Promise<IconData>{
            const createdIcon = new Icon({
                name:name,
                path:"xxx"
            });

            const res = await createdIcon.save();//saving to mongodb
            
            return {
                id: res.id,
                ...res.toObject()// Use toObject to get plain JavaScript object representation
            }
        },
        async editIcon(_:void, {ID, iconInput: {name}}:{ID:string, iconInput: Icon}):Promise<number>{
            const wasEdited = (await Icon.updateOne({_id: ID},{name:name})).modifiedCount;
            return wasEdited; //1 if icon has been edited and , 0 if nothing has been edited!
        },
        // deleting icon
        async deleteIcon(_:void, {ID}:{ID:string}):Promise<number>{
            const wasDeleted = (await Icon.deleteOne({_id: ID})).deletedCount;
            return wasDeleted;//1 if marker has been deleted and, 0 if nothing has been deleted!
        },
        async createMarker(_:void,{markerInput: {title,lat,long,rotation,color}}:{markerInput:MarkerData}):Promise<MarkerData>{
            const createdMarker = new Marker({
                title,
                lat,
                long,
                rotation,
                color
            });

            const res = await createdMarker.save();//saving to mongodb
            
            return {
                id: res.id,
                ...res.toObject()// Use toObject to get plain JavaScript object representation
            }
        },
        async editMarker(_:void, {ID, markerInput: {title,lat,long,rotation,color}}:{ID:string, markerInput: Marker}):Promise<number>{
            const wasEdited = (await Marker.updateOne({_id: ID},{title:title,lat:lat,long:long,rotation:rotation,color:color})).modifiedCount;
            return wasEdited; //1 if user has been edited and , 0 if nothing has been edited!
        },
        async deleteMarker(_:void, {ID}:{ID:string}):Promise<number>{
            const wasDeleted = (await Marker.deleteOne({_id: ID})).deletedCount;
            return wasDeleted;//1 if marker has been deleted and, 0 if nothing has been deleted!
        },
    }
}

export default resolvers;