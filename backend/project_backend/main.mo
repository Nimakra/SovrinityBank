import Type "types";
import Text "mo:base/Text";
import HashMap "mo:base/HashMap";
import TrieMap "mo:base/TrieMap";
import Trie "mo:base/Trie";
import Result "mo:base/Result";
import Iter "mo:base/Iter";
import Principal "mo:base/Principal";
import Bool "mo:base/Bool";
import List "mo:base/List";
import Array "mo:base/Array";
import AssocList "mo:base/AssocList";
import Error "mo:base/Error";
import Types "types";
import Buffer "mo:base/Buffer";

shared ({ caller = initializer }) actor class () {

    /* public type UserData = {
        id: Principal;
        username: Text;
        created: Int;
    };

    public type Blog = {
        id: Text;
        title: Text;
        introduction: Text;
        body: Text;
        image: [Text];
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
    }; */

    type Permission = Type.Permission;
    type Role = Type.Role;
    type UserData = Type.UserData;
    type Blog = Type.Blog;
    type Course = Type.Course;

    var userData : TrieMap.TrieMap<Principal, UserData> = TrieMap.TrieMap(Principal.equal, Principal.hash);
    var blogStorage : TrieMap.TrieMap<Text, Blog> = TrieMap.TrieMap(Text.equal, Text.hash);
    var courseStorage : TrieMap.TrieMap<Text, Course> = TrieMap.TrieMap(Text.equal, Text.hash);
    var userBlogs : TrieMap.TrieMap<Principal, List.List<Blog>> = TrieMap.TrieMap(Principal.equal, Principal.hash);

    // Access Control
    private stable var roles : AssocList.AssocList<Principal, Role> = List.nil();
    private stable var role_requests : AssocList.AssocList<Principal, Role> = List.nil();

    // Canister State
    private stable var userDataState : [(Principal, UserData)] = [];
    private stable var blogState : [(Text, Blog)] = [];
    private stable var courseState : [(Text, Course)] = [];
    private stable var userBlogsState : [(Principal, List.List<Blog>)] = [];

    system func preupgrade() {
        userDataState := Iter.toArray(userData.entries());
        blogState := Iter.toArray(blogStorage.entries());
        courseState := Iter.toArray(courseStorage.entries());
        userBlogsState := Iter.toArray(userBlogs.entries());
    };

    system func postupgrade() {
        userData := TrieMap.fromEntries(userDataState.vals(), Principal.equal, Principal.hash);
        blogStorage := TrieMap.fromEntries(blogState.vals(), Text.equal, Text.hash);
        courseStorage := TrieMap.fromEntries(courseState.vals(), Text.equal, Text.hash);
        userBlogs := TrieMap.fromEntries(userBlogsState.vals(), Principal.equal, Principal.hash);
    };

    func key(x : Text) : Trie.Key<Text> { { key = x; hash = Text.hash(x) } };

    //adds a new user to the system
    public shared ({ caller }) func addUser(user : UserData) : async () {
        userData.put(caller, user);
    };

    //get user
    public shared query ({ caller }) func getUser() : async Result.Result<UserData, Text> {
        switch (userData.get(caller)) {
            case (null) {
                return #err("User not found");
            };
            case (?user) {
                return #ok(user);
            };
        };
    };

    //get all users
    public shared query func getAllUsers() : async [UserData] {
        Iter.toArray(userData.vals());
    };

    public shared ({ caller }) func updateUser(user : UserData) : async () {
        assert (isAdmin(caller) or caller == user.id);
        userData.put(user.id, user);
    };

    //create blog
    public shared ({ caller }) func createBlog(blog : Blog) : async () {
        blogStorage.put(blog.id, blog);
        let userBlog = switch (userBlogs.get(caller)) {
            case (null) { List.nil<Blog>() };
            case (?blogs) { blogs };
        };
        let updatedUserBlogs = List.push<Blog>(blog, userBlog); // append the new blog to the list
        userBlogs.put(caller, updatedUserBlogs); // update the userBlogs with the new list
    };

    //get Blog
    /*public shared query func getBlog(id : Text) : async Result.Result<Blog, Text> {
        switch (blogStorage.get(id)) {
            case (null) {
                return #err("Blog not found");
            };
            case (?blog) {
                return #ok(blog);
            };
        };
    }; */

    // get my blogs
    public shared query ({ caller }) func getMyBlogs() : async [Blog] {
        switch (userBlogs.get(caller)) {
            case (null) {
                return [];
            };
            case (?blogs) {
                return List.toArray(blogs);
            };
        };
    };

    //get all blogs
    public shared query func getAllBlogs() : async [Blog] {
        Iter.toArray(blogStorage.vals());
    };

    //edit blog
    public shared ({ caller }) func editMyBlog(blog : Blog) : async () {
        let userBlog = switch (userBlogs.get(caller)) {
            case (null) { List.nil<Blog>() };
            case (?blogs) { blogs };
        };
        let updatedUserBlogs = List.map<Blog, Blog>(userBlog, func(b : Blog) : Blog = if (b.id == blog.id) { blog } else { b });
        userBlogs.put(caller, updatedUserBlogs);
        blogStorage.put(blog.id, blog);
    };

    //delete blog
    public shared ({ caller }) func deleteBlog(id : Text) : async () {
        if (isAdmin(caller)) {
            blogStorage.delete(id);
        } else {
            let userBlog = switch (userBlogs.get(caller)) {
                case (null) { List.nil<Blog>() };
                case (?blogs) { blogs };
            };
            let updatedUserBlogs = List.filter<Blog>(userBlog, func(b : Blog) : Bool = b.id != id);
            userBlogs.put(caller, updatedUserBlogs);
            blogStorage.delete(id);
        };
    };

    //create course
    public shared ({ caller }) func createCourse(course : Course) : async () {
        courseStorage.put(course.id, course);
    };

    //get all courses
    public shared query func getAllCourses() : async [Course] {
        Iter.toArray(courseStorage.vals());
    };

    //edit course
    public shared ({ caller }) func editCourse(course : Course) : async () {
        courseStorage.put(course.id, course);
    };

    //delete course
    public shared ({ caller }) func deleteCourse(id : Text) : async () {
    if (isAdmin(caller)) {
        courseStorage.delete(id);
    } else {
        throw Error.reject("Permission denied");
    }
};

    /*public shared query func getSuppliersDocuments(id : Principal) : async [DocumentInfo] {
    let docsIds : List.List<docId> = switch (supplierDocs.get(id)) {
      case (null) {
        List.nil();
      };
      case (?result) { result };
    };

    let docs = Buffer.Buffer<DocumentInfo>(0);

    let items = List.toArray(docsIds);

    for (doc in items.vals()) {
      switch (documents.get(doc)) {
        case (null) {};
        case (?result) { docs.add(result) };
      };
    };
    return Buffer.toArray(docs);
  };
};


 public shared query ({ caller }) func getSupplierByName(name : Text) : async [User] {
  let suppliers = TrieMap.mapFilter<Principal, User, User>(
    users,
    Principal.equal,
    Principal.hash,
    func(key, user) = if (user.isSupplier and user.companyName == name and (isAdmin(caller) or user.isVisible)) {
      ?user;
    } else {
      null;
    },
  );
  Iter.toArray(suppliers.vals());
};

public shared query ({ caller }) func getFashionHouseSuppliers(id : Principal) : async [User] {
  let suppliersList : List.List<Principal> = switch (fashionHouseSuppliersMap.get(id)) {
    case (null) {
      List.nil();
    };
    case (?result) { result };
  };
  let suppliers = Buffer.Buffer<User>(0);
  let items = List.toArray(suppliersList);

  for (supplierId in items.vals()) {
    switch (users.get(supplierId)) {
      case (null) {};
      case (?result) {
        if (isAdmin(caller) or result.isVisible) {
          suppliers.add(result);
        }
      };
    };
  };
  return Buffer.toArray(suppliers);
};

*/

    // Access Control
    func principal_eq(a : Principal, b : Principal) : Bool {
        return a == b;
    };

    func get_role(pal : Principal) : ?Role {
        if (pal == initializer) {
            ? #owner;
        } else {
            AssocList.find<Principal, Role>(roles, pal, principal_eq);
        };
    };

    // Determine if a principal has a role with permissions
    func has_permission(pal : Principal, perm : Permission) : Bool {
        let role = get_role(pal);
        switch (role, perm) {
            case (? #owner or ? #admin, _) true;
            case (? #authorized, #lowest) true;
            case (_, _) false;
        };
    };

    func isAdmin(pal : Principal) : Bool {
        let role = get_role(pal);
        switch (role) {
            case (? #owner or ? #admin) true;
            case (_) false;
        };
    };

    // Reject unauthorized user identities
    func require_permission(pal : Principal, perm : Permission) : async () {
        if (has_permission(pal, perm) == false) {
            throw Error.reject("unauthorized");
        };
    };

    // Assign a new role to a principal
    public shared ({ caller }) func assign_role(assignee : Principal, new_role : ?Role) : async () {
        await require_permission(caller, #assign_role);

        switch new_role {
            case (? #owner) {
                throw Error.reject("Cannot assign anyone to be the owner");
            };
            case (_) {};
        };
        if (assignee == initializer) {
            throw Error.reject("Cannot assign a role to the canister owner");
        };
        roles := AssocList.replace<Principal, Role>(roles, assignee, principal_eq, new_role).0;
        role_requests := AssocList.replace<Principal, Role>(role_requests, assignee, principal_eq, null).0;
    };

    // Return the principal of the message caller/user identity
    public shared ({ caller }) func callerPrincipal() : async Principal {
        return caller;
    };

    // Return the role of the message caller/user identity
    public shared ({ caller }) func my_role() : async Text {
        let role = get_role(caller);
        switch (role) {
            case (null) {
                return "unauthorized";
            };
            case (? #owner) {
                return "owner";
            };
            case (? #admin) {
                return "admin";
            };
            case (? #authorized) {
                return "authorized";
            };
        };
    };

};
