import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Blog {
  'id' : string,
  'title' : string,
  'body' : string,
  'date' : string,
  'author' : string,
  'introduction' : string,
  'image' : Array<string>,
}
export interface Course {
  'id' : string,
  'url' : string,
  'title' : string,
  'plan' : string,
  'level' : string,
  'author' : string,
}
export type Result = { 'ok' : UserData } |
  { 'err' : string };
export type Role = { 'admin' : null } |
  { 'owner' : null } |
  { 'authorized' : null };
export interface UserData {
  'id' : Principal,
  'created' : bigint,
  'username' : string,
}
export interface anon_class_17_1 {
  'addUser' : ActorMethod<[UserData], undefined>,
  'assign_role' : ActorMethod<[Principal, [] | [Role]], undefined>,
  'callerPrincipal' : ActorMethod<[], Principal>,
  'createBlog' : ActorMethod<[Blog], undefined>,
  'createCourse' : ActorMethod<[Course], undefined>,
  'deleteBlog' : ActorMethod<[string], undefined>,
  'deleteCourse' : ActorMethod<[string], undefined>,
  'editCourse' : ActorMethod<[Course], undefined>,
  'editMyBlog' : ActorMethod<[Blog], undefined>,
  'getAllBlogs' : ActorMethod<[], Array<Blog>>,
  'getAllCourses' : ActorMethod<[], Array<Course>>,
  'getAllUsers' : ActorMethod<[], Array<UserData>>,
  'getMyBlogs' : ActorMethod<[], Array<Blog>>,
  'getUser' : ActorMethod<[], Result>,
  'my_role' : ActorMethod<[], string>,
  'updateUser' : ActorMethod<[UserData], undefined>,
}
export interface _SERVICE extends anon_class_17_1 {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: ({ IDL }: { IDL: IDL }) => IDL.Type[];
