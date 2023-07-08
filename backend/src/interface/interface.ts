import mongoose from "mongoose";
import { ObjectId } from "bson";
import { Request } from "express";


export interface IRequest extends Request {
  files?: any;
}


//user
export interface IUser {
  _id: ObjectId;
  email: string;
  password:string;
}

//todo
export interface ITodos{
  _id:ObjectId;
  userId:ObjectId;
  text:string;
  status:boolean
}