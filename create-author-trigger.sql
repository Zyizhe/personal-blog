-- 创建自动创建 author 记录的触发器
-- 当新用户注册时，自动在 authors 表中创建对应记录

-- 创建触发器函数
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.authors (id, name, avatar, bio)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    'https://api.dicebear.com/7.x/avataaars/svg?seed=' || NEW.id,
    '这个人很懒，什么都没写'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 创建触发器
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 为现有用户创建 author 记录（如果还没有）
INSERT INTO public.authors (id, name, avatar, bio)
SELECT 
  u.id,
  COALESCE(u.raw_user_meta_data->>'name', split_part(u.email, '@', 1)),
  'https://api.dicebear.com/7.x/avataaars/svg?seed=' || u.id,
  '这个人很懒，什么都没写'
FROM auth.users u
WHERE NOT EXISTS (
  SELECT 1 FROM public.authors a WHERE a.id = u.id
);
