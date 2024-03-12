import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Int "mo:base/Int";
import Blob "mo:base/Blob";

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

    public type UserData = {
        id: Principal;
        username: Text;
        created: Int;
    };

    public type Blog = {
        id: Text;
        title: Text;
        introduction: Text;
        body: Text;
        images : [Text];
        date: Text;
        author: Text;
    };

    public type Course = {
        id: Text;
        title: Text;
        author: Text;
        plan: Text;
        level: Text;
        url: Text;
    };

};