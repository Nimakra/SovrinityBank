export const idlFactory = ({ IDL }) => {
  const UserData = IDL.Record({
    'id' : IDL.Principal,
    'created' : IDL.Int,
    'username' : IDL.Text,
  });
  const Role = IDL.Variant({
    'admin' : IDL.Null,
    'owner' : IDL.Null,
    'authorized' : IDL.Null,
  });
  const Blog = IDL.Record({
    'id' : IDL.Text,
    'title' : IDL.Text,
    'body' : IDL.Text,
    'date' : IDL.Text,
    'author' : IDL.Text,
    'introduction' : IDL.Text,
    'image' : IDL.Vec(IDL.Text),
  });
  const Course = IDL.Record({
    'id' : IDL.Text,
    'url' : IDL.Text,
    'title' : IDL.Text,
    'plan' : IDL.Text,
    'level' : IDL.Text,
    'author' : IDL.Text,
  });
  const Result = IDL.Variant({ 'ok' : UserData, 'err' : IDL.Text });
  const anon_class_17_1 = IDL.Service({
    'addUser' : IDL.Func([UserData], [], []),
    'assign_role' : IDL.Func([IDL.Principal, IDL.Opt(Role)], [], []),
    'callerPrincipal' : IDL.Func([], [IDL.Principal], []),
    'createBlog' : IDL.Func([Blog], [], []),
    'createCourse' : IDL.Func([Course], [], []),
    'deleteBlog' : IDL.Func([IDL.Text], [], []),
    'deleteCourse' : IDL.Func([IDL.Text], [], []),
    'editCourse' : IDL.Func([Course], [], []),
    'editMyBlog' : IDL.Func([Blog], [], []),
    'getAllBlogs' : IDL.Func([], [IDL.Vec(Blog)], ['query']),
    'getAllCourses' : IDL.Func([], [IDL.Vec(Course)], ['query']),
    'getAllUsers' : IDL.Func([], [IDL.Vec(UserData)], ['query']),
    'getMyBlogs' : IDL.Func([], [IDL.Vec(Blog)], ['query']),
    'getUser' : IDL.Func([], [Result], ['query']),
    'my_role' : IDL.Func([], [IDL.Text], []),
    'updateUser' : IDL.Func([UserData], [], []),
  });
  return anon_class_17_1;
};
export const init = ({ IDL }) => { return []; };
