db.createUser({
    user: 'bloguser',
    pwd: 'blogpass',
    roles: [
      {
        role: 'readWrite',
        db: 'blog'
      }
    ]
  });
  
  db.createCollection('posts');