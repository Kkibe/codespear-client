/*
# Fix handle_new_user trigger to use username metadata

## Overview
The auth trigger that auto-creates a profile row on signup reads the
user metadata key to populate the display name. The frontend signUp
passes `username` (matching the profiles.username column), so the
trigger must read that key.

## Changes
1. Recreate `handle_new_user()` to read `raw_user_meta_data->>'username'`,
   falling back to the local part of the email when omitted.
2. Drop and recreate the `on_auth_user_created` trigger.
*/
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, username)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1))
  )
  ON CONFLICT (id) DO UPDATE
    SET username = COALESCE(public.profiles.username, EXCLUDED.username);
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
