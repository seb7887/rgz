export function addPermission(older, newer) {
  let olderPermissions = older.replace(/[{}]/g, '').split(',');
  olderPermissions.push(newer);
  return '{' + olderPermissions.join() + '}';
}

export function removePermission(older, permissionToRemove) {
  let olderPermissions = older.replace(/[{}]/g, '').split(',');
  const newerPermissions = olderPermissions.filter(permission => permission !== permissionToRemove);
  return '{' + newerPermissions.join() + '}';
}