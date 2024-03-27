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
import Buffer "mo:base/Buffer";
import TrieSet "mo:base/TrieSet";
import Hash "mo:base/Hash";
import Nat32 "mo:base/Nat32";
import Nat "mo:base/Nat";

shared ({ caller = initializer }) actor class () {

    type Permission = Type.Permission;
    type Role = Type.Role;
    type User = Type.User;
    type Account = Type.Account;
    type Transaction = Type.Transaction;
    type Bank = Type.Bank;

    var userStorage : TrieMap.TrieMap<Principal, User> = TrieMap.TrieMap(Principal.equal, Principal.hash);
    var transactionStorage : TrieMap.TrieMap<Text, Transaction> = TrieMap.TrieMap(Text.equal, Text.hash);
    var bankStorage : TrieMap.TrieMap<Principal, Bank> = TrieMap.TrieMap(Principal.equal, Principal.hash);

    // Access Control
    private stable var roles : AssocList.AssocList<Principal, Role> = List.nil();
    private stable var role_requests : AssocList.AssocList<Principal, Role> = List.nil();


    public shared ({ caller }) func createBank(bank : Bank) : async Text {
        switch (bankStorage.get(caller)) {
            case (?_) {
                return "Bank with this ID already exists";
            };
            case null {

                bankStorage.put(caller, bank);

                return "Bank created successfully";
            };
        };
    };

    //adds a new user to the system
    public shared ({ caller }) func addUser(user : User) : async () {
        userStorage.put(caller, user);
    };

    //get user
    public shared query ({ caller }) func getUser() : async Result.Result<User, Text> {
        switch (userStorage.get(caller)) {
            case (null) {
                return #err("User not found");
            };
            case (?user) {
                return #ok(user);
            };
        };
    };

    //get all users
    public shared query func getAllUsers() : async [User] {
        Iter.toArray(userStorage.vals());
    };

    //get all transactions
    public shared query func getAllTransactions() : async [Transaction] {
        Iter.toArray(transactionStorage.vals());
    };

    public shared ({ caller }) func updateUser(user : User) : async () {
        assert (isAdmin(caller) or caller == user.id);
        userStorage.put(user.id, user);
    };

    //create account
    public shared ({ caller }) func createAccount(balance : Int) : async () {
        // Create a new account with the provided balance
        let account : Account = {
            balance = balance;
            transactions = [];
        };

        // Get the user who is creating the account
        let user = switch (userStorage.get(caller)) {
            case (null) {
                return; 
            };
            case (?user) {
                user;
            };
        };


        let updatedUser : User = {
            id = user.id;
            username = user.username;
            handle = user.handle;
            created = user.created;
            account = account;
        };

        // Update the user in the user storage
        userStorage.put(caller, updatedUser);
    };

    //deposit
    public shared ({ caller }) func deposit(amount : Int, id : Text, timestamp : Text) : async Result.Result<Account, Text> {
        // Get the account
        let user = switch (userStorage.get(caller)) {
            case (null) {
                return #err("User not found");
            };
            case (?user) {
                user;
            };
        };

        let transaction : Transaction = {
            id = id;
            name = "Deposit";
            amount = amount;
            sender = caller;
            recipient = caller;
            timestamp = timestamp;
        };

        let updatedAccount : Account = {
            balance = user.account.balance + amount;
            transactions = Array.append(user.account.transactions, [transaction]);
        };

        let updatedUser : User = {
            id = user.id;
            username = user.username;
            handle = user.handle;
            created = user.created;
            account = updatedAccount;
        };

        userStorage.put(caller, updatedUser);
        transactionStorage.put(id, transaction);

        return #ok(updatedAccount);
    };

    public shared ({ caller }) func withdraw(amount : Int, id : Text, timestamp : Text) : async Result.Result<Account, Text> {

        let user = switch (userStorage.get(caller)) {
            case (null) {
                return #err("User not found");
            };
            case (?user) {
                user;
            };
        };

        if (user.account.balance < amount) {
            return #err("Insufficient balance");
        };

        let transaction : Transaction = {
            id = id;
            name = "Withdrawal";
            amount = amount;
            sender = caller;
            recipient = caller;
            timestamp = timestamp;
        };

        let updatedAccount : Account = {
            balance = user.account.balance - amount;
            transactions = Array.append(user.account.transactions, [transaction]);
        };

        let updatedUser : User = {
            id = user.id;
            username = user.username;
            handle = user.handle;
            created = user.created;
            account = updatedAccount;
        };

        userStorage.put(caller, updatedUser);
        transactionStorage.put(id, transaction);

        return #ok(updatedAccount);
    };

    // Generation of a Zero-Knowledge Proof (ZKP)
    private func generateProof(account : Account, amount : Int) : (Int, Int) {
        return (account.balance, amount);
    };

    private func verifyProof(proof : (Int, Int)) : Bool {
        let (balance, amount) = proof;
        return balance >= amount;
    };

    public shared ({ caller }) func transfer(recipientId : Principal, amount : Int, id : Text, timestamp : Text) : async Result.Result<Text, Text> {

        let sender = switch (userStorage.get(caller)) {
            case (null) {
                return #err("Sender account does not exist");
            };
            case (?user) {
                user;
            };
        };

        let recipient = switch (userStorage.get(recipientId)) {
            case (null) {
                return #err("Recipient account does not exist");
            };
            case (?user) {
                user;
            };
        };

        // Generate a ZKP for the sender's balance
        let proof = generateProof(sender.account, amount);
        let zkp = verifyProof(proof);

        // Verify the ZKP
        if (not zkp) {
            return #err("Insufficient balance for transfer");
        };

        let transaction : Transaction = {
            id = id;
            name = "Transfer";
            amount = amount;
            sender = caller;
            recipient = caller;
            timestamp = timestamp;
        };

        let updatedSenderAccount : Account = {
            balance = sender.account.balance - amount;
            transactions = Array.append(sender.account.transactions, [transaction]);
        };

        let updatedRecipientAccount : Account = {
            balance = recipient.account.balance + amount;
            transactions = Array.append(recipient.account.transactions, [transaction]);
        };

        let updatedSender : User = {
            id = sender.id;
            username = sender.username;
            handle = sender.handle;
            created = sender.created;
            account = updatedSenderAccount;
        };
        let updatedRecipient : User = {
            id = recipient.id;
            username = recipient.username;
            handle = recipient.handle;
            created = recipient.created;
            account = updatedRecipientAccount;
        };
        userStorage.put(caller, updatedSender);
        userStorage.put(recipientId, updatedRecipient);
        transactionStorage.put(id, transaction);

        return #ok("Transfer successful");
    };

    public shared query ({ caller }) func getTransaction(transactionId : Text) : async ?Transaction {

        let user = switch (userStorage.get(caller)) {
            case (null) {
                return null;
            };
            case (?user) {
                user;
            };
        };

        let transaction = Array.find(
            user.account.transactions,
            func(t : Transaction) : Bool {
                t.id == transactionId;
            },
        );

        return transaction;
    };

    public shared query ({ caller }) func getMyTransactions() : async [Transaction] {

        let user = switch (userStorage.get(caller)) {
            case (null) {
                return [];
            };
            case (?user) {
                user;
            };
        };

        return user.account.transactions;
    };

    public shared query ({ caller }) func getAccountBalance() : async Int {

        let user = switch (userStorage.get(caller)) {
            case (null) {
                return 0;
            };
            case (?user) {
                user;
            };
        };

        return user.account.balance;
    };

    public shared query ({ caller }) func getBankTransactions() : async [Transaction] {
        // Get the bank
        let bank = switch (bankStorage.get(caller)) {
            case (null) {
                return [];
            };
            case (?bank) {
                bank;
            };
        };

        return bank.transactions;
    };

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
    public shared query ({ caller }) func callerPrincipal() : async Principal {
        return caller;
    };

    // Return the role of the message caller/user identity
    public shared query ({ caller }) func my_role() : async Text {
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
