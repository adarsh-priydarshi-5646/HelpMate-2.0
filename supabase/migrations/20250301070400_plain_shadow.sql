/*
  # Fix chat functionality issues
  
  1. Ensure chats table exists
    - This migration checks if the chats table exists and creates it if not
    - Adds all necessary policies for row level security
  
  2. Security
    - Enable RLS on chats table
    - Add policies for authenticated users to manage their own chats
*/

-- Check if chats table exists, if not create it
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'chats') THEN
    CREATE TABLE chats (
      id uuid PRIMARY KEY,
      user_id uuid REFERENCES auth.users NOT NULL,
      title text NOT NULL,
      messages jsonb NOT NULL DEFAULT '[]'::jsonb,
      context jsonb,
      created_at timestamptz NOT NULL DEFAULT now(),
      updated_at timestamptz NOT NULL DEFAULT now()
    );

    -- Enable RLS
    ALTER TABLE chats ENABLE ROW LEVEL SECURITY;

    -- Create policies
    CREATE POLICY "Users can read their own chats"
      ON chats
      FOR SELECT
      TO authenticated
      USING (auth.uid() = user_id);

    CREATE POLICY "Users can insert their own chats"
      ON chats
      FOR INSERT
      TO authenticated
      WITH CHECK (auth.uid() = user_id);

    CREATE POLICY "Users can update their own chats"
      ON chats
      FOR UPDATE
      TO authenticated
      USING (auth.uid() = user_id);

    CREATE POLICY "Users can delete their own chats"
      ON chats
      FOR DELETE
      TO authenticated
      USING (auth.uid() = user_id);

    -- Create index for faster user_id lookups
    CREATE INDEX IF NOT EXISTS chats_user_id_idx ON chats (user_id);
  END IF;
END $$;