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
