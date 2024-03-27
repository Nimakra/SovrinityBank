import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Account {
  'balance' : bigint,
  'transactions' : Array<Transaction>,
}
export interface Account__1 {
  'balance' : bigint,
  'transactions' : Array<Transaction>,
}
export interface Bank {
  'id' : Principal,
  'name' : string,
  'accounts' : Array<Account__1>,
  'users' : Array<User__1>,
  'transactions' : Array<Transaction>,
}
export type Result = { 'ok' : Account } |
  { 'err' : string };
export type Result_1 = { 'ok' : string } |
  { 'err' : string };
export type Result_2 = { 'ok' : User } |
  { 'err' : string };
export type Role = { 'admin' : null } |
  { 'owner' : null } |
  { 'authorized' : null };
export interface Transaction {
  'id' : string,
  'name' : string,
  'recipient' : Principal,
  'sender' : Principal,
  'timestamp' : string,
  'amount' : bigint,
}
export interface Transaction__1 {
  'id' : string,
  'name' : string,
  'recipient' : Principal,
  'sender' : Principal,
  'timestamp' : string,
  'amount' : bigint,
}
export interface User {
  'id' : Principal,
  'created' : string,
  'username' : string,
  'account' : Account__1,
  'handle' : string,
}
export interface User__1 {
  'id' : Principal,
  'created' : string,
  'username' : string,
  'account' : Account__1,
  'handle' : string,
}
export interface anon_class_20_1 {
  'addUser' : ActorMethod<[User], undefined>,
  'assign_role' : ActorMethod<[Principal, [] | [Role]], undefined>,
  'callerPrincipal' : ActorMethod<[], Principal>,
  'createAccount' : ActorMethod<[bigint], undefined>,
  'createBank' : ActorMethod<[Bank], string>,
  'deposit' : ActorMethod<[bigint, string, string], Result>,
  'getAccountBalance' : ActorMethod<[], bigint>,
  'getAllTransactions' : ActorMethod<[], Array<Transaction__1>>,
  'getAllUsers' : ActorMethod<[], Array<User>>,
  'getBankTransactions' : ActorMethod<[], Array<Transaction__1>>,
  'getMyTransactions' : ActorMethod<[], Array<Transaction__1>>,
  'getTransaction' : ActorMethod<[string], [] | [Transaction__1]>,
  'getUser' : ActorMethod<[], Result_2>,
  'my_role' : ActorMethod<[], string>,
  'transfer' : ActorMethod<[Principal, bigint, string, string], Result_1>,
  'updateUser' : ActorMethod<[User], undefined>,
  'withdraw' : ActorMethod<[bigint, string, string], Result>,
}
export interface _SERVICE extends anon_class_20_1 {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: ({ IDL }: { IDL: IDL }) => IDL.Type[];
