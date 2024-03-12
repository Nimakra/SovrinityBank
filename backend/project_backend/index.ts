/*import {
  Canister,
  ic,
  Err,
  nat64,
  Ok,
  Opt,
  Principal,
  query,
  Record,
  Result,
  StableBTreeMap,
  text,
  update,
  Variant,
  Vec,
  blob
} from 'azle';

import { v4 as uuidv4 } from "uuid";

const UserData = Record({
id: Principal,
username: text
});

type UserData = typeof UserData;

const Blog = Record({
id: Principal,
title: text,
introduction: text,
body: text,
image: text,
date: text,
author: text,
});

type Blog = typeof Blog;

const Community = Record({
id: Principal,
name: text,
description: text,
members: Vec(UserData),
});

type Community = typeof Community;

const Course = Record({
id: Principal,
title: text,
author: text,
plan: text,
level: text,
url: text,
});

type Course = typeof Course;


let userDataStorage = StableBTreeMap(Principal, UserData, 0);

let blogStorage = StableBTreeMap(Principal, Blog, 1);

let communityStorage = StableBTreeMap(Principal, Community, 2);

let courseStorage = StableBTreeMap(Principal, Course, 3);



export default Canister({

  //Register a user
  registerUser: update([text], Result(UserData, text), (username) => {
    // Validate input parameters
    if (!username) {
      return Result.Err('Username cannot be blank. Please enter a username.');
    }

    //generate error if username already exists
    const userPrincipalOpt = userDataStorage.values().find((user: { username: string; }) => user.username === username);
    if (userPrincipalOpt) {
      return Result.Err('Username already exists. Please enter a different username.');
    }
    
    // Generate a unique ID for the user
   const id = Principal.fromHex(uuidv4().replace(/-/g, ''));

    // Create a UserData
    const userData: UserData = {
      id,
      username
    };

    // Insert the user into the storage
    userDataStorage.insert(id, userData);

    // Return the user data
    return Result.Ok(userData);
  }),

  

  createBlog: update([text, text, text, text, text, text], Result(Blog, text), (title, introduction, body, image, date, author) => {

    if (!title || !body || !introduction || !date || !author) {
        return Result.Err('Please provide all required information.');
    }

    // Generate a unique ID for the blog article
    const id = Principal.fromHex(uuidv4().replace(/-/g, ''));
    const blog: Blog = { id, title, introduction, body, image, date, author };

    blogStorage.insert(id, blog);

    return Result.Ok(blog);
}),

getBlog: query([Principal], Variant({ Ok: Blog, Err: text }),(blogId) => {

    if (!blogId) {
        return { Err: 'Please provide title and date.' };
    }

    const blogOpt = blogStorage.get(blogId);

    if ('Some' in blogOpt) {
      const blog = blogOpt.Some;
        return { Ok: blog };
    } else {
        return { Err: 'blog not found.' };
    }
}),

listBlogs: query([], Vec(Blog), () => {
  // Get all blog articles
  return blogStorage.values();
}),

updateBlog: update([Principal, text, text, text, text, text, text], Result(Blog, text), (blogId, title, introduction, body, image, date, author) => {
  if (!title || !body || !image || !date || !author) {
      return Result.Err('Invalid input parameters. Please provide all required information.');
  }

  const blogOpt = blogStorage.get(blogId);

  if ('Some' in blogOpt) {
      const updatedBlog: Blog = { ...blogOpt.Some, title, introduction, body, image, author };

      // Update the blog article
      blogStorage.insert(blogId, updatedBlog);

      return Result.Ok(updatedBlog);
  } else {
      return Result.Err('blog not found.');
  }
}),

deleteBlog: update([Principal], Result(Blog, text), (blogId) => {
  if (!blogId) {
      return Result.Err('Please provide title and date.');
  }
  
  const blogOpt = blogStorage.get(blogId);

  if ('Some' in blogOpt) {
      // Remove the blog article
      blogStorage.remove(blogId);

      return Result.Ok(blogOpt.Some);
  } else {
      return Result.Err('blog not found.');
  }
}),

 // Create a new community
 createCommunity: update([text, text, Vec(UserData)], Result(Community, text), (name, description, members) => {
  if (!name || !description || !members) {
      return Result.Err('Invalid input parameters. Please provide all required information.');
  }

  // Generate a unique ID for the community
  const id = Principal.fromHex(uuidv4().replace(/-/g, ''));
  const community: Community = { id, name, description, members };

  // Initialize community data
  communityStorage.insert(id, community);

  return Result.Ok(community);
}),

// Get community details by ID
getCommunityByID: query([Principal], Variant({ Ok: Community, Err: text }), (communityId) => {
    if (!communityId) {
      return { Err: 'Please provide a community ID.' };
    }
  
    const communityOpt = communityStorage.get(communityId);
  
    if ('Some' in communityOpt) {
      return { Ok: communityOpt.Some };
    } else {
      return { Err: 'Community not found.' };
    }
  }),
  
 
// Join a community
joinCommunity: update([Principal, text, Principal], Result(Community, text), (communityId, username, userId) => {

    if (!communityId || !username || !userId) {
        return Result.Err('Invalid input parameters. Please provide all required information.');
    }

    // Get the community by ID
    const communityOpt = communityStorage.get(communityId);

    if ('Some' in communityOpt) {
        const community = communityOpt.Some;

        // Add the member to the community
        const updatedMembers = community.members.concat({ id: userId, username: username });

        // Update the community
        communityStorage.insert(communityId, { ...community, members: updatedMembers });

        return Result.Ok({ ...community, members: updatedMembers });
    } else {
        return Result.Err('Community not found.');
    }
}),

// Leave a community
leaveCommunity: update([Principal, Principal], Result(Community, text), (communityId, memberPrincipal) => {

    if (!communityId || !memberPrincipal) {
        return Result.Err('Please provide all required information.');
    }

    // Get the community by ID
    const communityOpt = communityStorage.get(communityId);

    if ('Some' in communityOpt) {
        const community = communityOpt.Some;

        // Remove the member from the community
        const updatedMembers = community.members.filter((member: { id: Principal; }) => member.id !== memberPrincipal);

        // Update the community
        communityStorage.insert(communityId, { ...community, members: updatedMembers });

        return Result.Ok({ ...community, members: updatedMembers });
    } else {
        return Result.Err('Community not found.');
    }
}),

// Get a list of members in a community
getCommunityMembers: query([Principal], Variant({ Ok: Vec(UserData), Err: text }), (communityId) => {
    // Check for valid ID
    if (!communityId) {
      return Result.Err('Please provide a community ID.');
    }
  
    // Get the community data
    const communityOpt = communityStorage.get(communityId);
  
    // Check if community exists
    
    if ('Some' in communityOpt) {
      const communityData = communityOpt.Some;

      // Return the emissions records
      return {Ok:communityData.members };
    } else {
             return { Err: `Community with id=${communityId} not found.` };
    }

  }),
  

createCourse: update([text, text, text, text, text], Result(Course, text), (title, author, plan, level, url) => {
  if (!title || !author || !url) {
      return Result.Err('Invalid input parameters. Please provide all required information.');
  }

  // Generate ID for the course
  const id = Principal.fromHex(uuidv4().replace(/-/g, ''));
  const course: Course = { id, title, author, plan, level, url };

  // Initialize course data
  courseStorage.insert(id, course);

  return Result.Ok(course);
}),

getCourseById: query([Principal], Variant({ Ok: Course, Err: text }), (courseId) => {
  if (!courseId) {
      return { Err: 'Please provide the course ID.' };
  }

  const courseOpt = courseStorage.get(courseId);

  if ('Some' in courseOpt) {
      return { Ok: courseOpt.Some };
  } else {
      return { Err: 'Course not found.' };
  }
}),

//get course by name
getCourseByName: query([text], Variant({ Ok: Course, Err: text }), (courseName) => {
  if (!courseName) {
      return { Err: 'Please provide the course name.' };
  }

  const courseOpt = courseStorage.values().find((course: { title: string; }) => course.title === courseName);

  if (courseOpt) {
      return { Ok: courseOpt };
  } else {
      return { Err: 'Course not found.' };
  }
}),

listCourses: query([], Vec(Course), () => {
  // Get all courses
  return courseStorage.values();

}),

updateCourse: update([Principal, text], Result(Course, text), (courseId, newAuthor) => {
  if (!courseId || !newAuthor) {
      return Result.Err('Invalid input parameters. Please provide all required information.');
  }

  const courseOpt = courseStorage.get(courseId);

  if ('Some' in courseOpt) {
      const course = courseOpt.Some;

      const updatedCourse: Course = { ...course, author: newAuthor };

      courseStorage.insert(courseId, updatedCourse);

      return Result.Ok(updatedCourse);
  } else {
      return Result.Err('Course not found.');
  }
}),

// Delete a course
deleteCourse: update([Principal], Result(Course, text), (courseId) => {
  if (!courseId) {
      return Result.Err('Invalid input parameters. Please provide the course ID.');
  }

  const courseOpt = courseStorage.get(courseId);

  if ('Some' in courseOpt) {
  
      courseStorage.remove(courseId);

      return Result.Ok(courseOpt.Some);
  } else {
      return Result.Err('Course not found.');
  }
}),


});


globalThis.crypto = {
// @ts-ignore
getRandomValues: () => {
   let array = new Uint8Array(32)

   for (let i = 0; i < array.length; i++) {
       array[i] = Math.floor(Math.random() * 256)
   }

   return array
}
}


*/