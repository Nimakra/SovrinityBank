import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Int "mo:base/Int";
import Blob "mo:base/Blob";
import List "mo:base/List";

module {

    public type Role = {
        #owner;
        #admin;
        #authorized;
    };

    public type Permission = {
        #assign_role;
        #lowest;
    };

    public type User = {
        id : Principal;
        username : Text;
        handle : Text;
        created : Text;
        account : Account;
    };

    public type Account = {
        balance : Int;
        transactions : [Transaction];
    };

    public type Transaction = {
        id : Text;
        name : Text;
        amount : Int;
        sender : Principal;
        recipient : Principal;
        timestamp : Text;
    };

    public type Bank = {
        id : Principal;
        name : Text;
        users : [User];
        accounts : [Account];
        transactions : [Transaction];
    };

};
