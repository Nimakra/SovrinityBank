export const idlFactory = ({ IDL }) => {
  const Transaction = IDL.Record({
    'id' : IDL.Text,
    'name' : IDL.Text,
    'recipient' : IDL.Principal,
    'sender' : IDL.Principal,
    'timestamp' : IDL.Text,
    'amount' : IDL.Int,
  });
  const Account__1 = IDL.Record({
    'balance' : IDL.Int,
    'transactions' : IDL.Vec(Transaction),
  });
  const User = IDL.Record({
    'id' : IDL.Principal,
    'created' : IDL.Text,
    'username' : IDL.Text,
    'account' : Account__1,
    'handle' : IDL.Text,
  });
  const Role = IDL.Variant({
    'admin' : IDL.Null,
    'owner' : IDL.Null,
    'authorized' : IDL.Null,
  });
  const User__1 = IDL.Record({
    'id' : IDL.Principal,
    'created' : IDL.Text,
    'username' : IDL.Text,
    'account' : Account__1,
    'handle' : IDL.Text,
  });
  const Bank = IDL.Record({
    'id' : IDL.Principal,
    'name' : IDL.Text,
    'accounts' : IDL.Vec(Account__1),
    'users' : IDL.Vec(User__1),
    'transactions' : IDL.Vec(Transaction),
  });
  const Account = IDL.Record({
    'balance' : IDL.Int,
    'transactions' : IDL.Vec(Transaction),
  });
  const Result = IDL.Variant({ 'ok' : Account, 'err' : IDL.Text });
  const Transaction__1 = IDL.Record({
    'id' : IDL.Text,
    'name' : IDL.Text,
    'recipient' : IDL.Principal,
    'sender' : IDL.Principal,
    'timestamp' : IDL.Text,
    'amount' : IDL.Int,
  });
  const Result_2 = IDL.Variant({ 'ok' : User, 'err' : IDL.Text });
  const Result_1 = IDL.Variant({ 'ok' : IDL.Text, 'err' : IDL.Text });
  const anon_class_20_1 = IDL.Service({
    'addUser' : IDL.Func([User], [], []),
    'assign_role' : IDL.Func([IDL.Principal, IDL.Opt(Role)], [], []),
    'callerPrincipal' : IDL.Func([], [IDL.Principal], ['query']),
    'createAccount' : IDL.Func([IDL.Int], [], []),
    'createBank' : IDL.Func([Bank], [IDL.Text], []),
    'deposit' : IDL.Func([IDL.Int, IDL.Text, IDL.Text], [Result], []),
    'getAccountBalance' : IDL.Func([], [IDL.Int], ['query']),
    'getAllTransactions' : IDL.Func([], [IDL.Vec(Transaction__1)], ['query']),
    'getAllUsers' : IDL.Func([], [IDL.Vec(User)], ['query']),
    'getBankTransactions' : IDL.Func([], [IDL.Vec(Transaction__1)], ['query']),
    'getMyTransactions' : IDL.Func([], [IDL.Vec(Transaction__1)], ['query']),
    'getTransaction' : IDL.Func(
        [IDL.Text],
        [IDL.Opt(Transaction__1)],
        ['query'],
      ),
    'getUser' : IDL.Func([], [Result_2], ['query']),
    'my_role' : IDL.Func([], [IDL.Text], ['query']),
    'transfer' : IDL.Func(
        [IDL.Principal, IDL.Int, IDL.Text, IDL.Text],
        [Result_1],
        [],
      ),
    'updateUser' : IDL.Func([User], [], []),
    'withdraw' : IDL.Func([IDL.Int, IDL.Text, IDL.Text], [Result], []),
  });
  return anon_class_20_1;
};
export const init = ({ IDL }) => { return []; };
