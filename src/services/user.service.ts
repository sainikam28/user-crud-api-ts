import { ApiError } from '../errors/apiError';
import User from '../models/user.model';

export const getUsersList = async (
  page = 1,
  limit = 10,
  role?: string
) => {
  console.log('[getUsersList] Starting with params:', { page, limit, role });

  const skip = (page - 1) * limit;

  const filter: any = {};
  if (role) {
    filter.role = role;
  }
  console.log('[getUsersList] Filter applied:', filter);

  console.log('[getUsersList] Executing query with skip:', skip, 'limit:', limit);
  const users = await User.find(filter)
    .skip(skip)
    .limit(limit)
    .select('-password');

  const total = await User.countDocuments(filter);
  const pages = Math.ceil(total / limit);

  console.log('[getUsersList] Query successful - fetched:', users.length, 'users, total:', total, 'pages:', pages);

  return {
    total,
    page,
    limit,
    pages,
    users
  };
};

export const createUser = async (
  name: string,
  email: string,
  password: string,
  role: 'USER' | 'ADMIN' = 'USER'
) => {
  const existing = await User.findOne({ email });
  if (existing) {
    throw new ApiError(409, 'User already exists');
  }

  const user = new User({
    name,
    email,
    password,
    role
  });

  await user.save();

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role
  };
};

export const getUserById = async (
  userId: string,
  requester: { id: string; role: 'USER' | 'ADMIN' }
) => {
  if (requester.role !== 'ADMIN' && requester.id !== userId) {
    throw new ApiError(403, 'Forbidden');
  }

  const user = await User.findById(userId).select('-password');
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  return user;
};

export const updateUser = async (
  userId: string,
  data: Partial<{ name: string; password: string }>,
  requester: { id: string; role: 'USER' | 'ADMIN' }
) => {
  if (requester.role !== 'ADMIN' && requester.id !== userId) {
    throw new ApiError(403, 'Forbidden');
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  if (data.name) user.name = data.name;
  if (data.password) user.password = data.password;

  await user.save();

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role
  };
};

export const deleteUser = async (userId: string) => {
  const user = await User.findByIdAndDelete(userId);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  return true;
};


